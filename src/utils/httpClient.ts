import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import * as SecureStore from "expo-secure-store";
import ApplicationConstants from "../constants/ApplicationConstants";
import SecureStoreConstants from "../constants/SecureStoreConstants";
import ErrorResponse, { ErrorCode } from "../models/global/response/ErrorResponse";
// import AuthService from "../services/AuthService";
import store from "../store";
import { setToken, unsetToken } from "../store/slices/authReducer";
import handleHttpClientError from "./handleHttpClientError";

const httpClient = axios.create({
    baseURL: ApplicationConstants.API_BASE_URL,
    timeout: ApplicationConstants.API_TIMEOUT,
});

httpClient.interceptors.request.use(
    (config) => {
        const { auth } = store.getState();
        if (auth.accessToken !== null) {
            config.headers.Authorization = `Bearer ${auth.accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

let isRefreshing = false;
let refreshSubscribers: ((accessToken: string | null) => void)[] = [];

httpClient.interceptors.response.use(
    // on success
    (response) => response,

    // on error
    async (error: AxiosError<ErrorResponse>) => {
        try {
            const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

            if (
                error.response?.status === 401 &&
                error.response.data.code === ErrorCode.Expired &&
                !originalRequest.url?.includes("/refresh") &&
                !originalRequest._retry
            ) {
                originalRequest._retry = true;
                if (!isRefreshing) {
                    isRefreshing = true;

                    const refreshToken = await SecureStore.getItemAsync(SecureStoreConstants.REFRESH_TOKEN);
                    if (refreshToken === null) {
                        throw new Error("Refresh Token Not Found");
                    }
                    const response = await handleHttpClientError(async () => {
                        const { data } = await httpClient({
                            method: "POST",
                            url: "/api/v1/auth/refresh",
                            data: { refreshToken },
                        });
                        return data;
                    });

                    await SecureStore.setItemAsync(SecureStoreConstants.ACCESS_TOKEN, response.data.accessToken);
                    await SecureStore.setItemAsync(SecureStoreConstants.REFRESH_TOKEN, response.data.refreshToken);
                    store.dispatch(setToken(response.data));

                    isRefreshing = false;
                    refreshSubscribers.forEach((fn) => {
                        fn(response.data.accessToken);
                    });
                    refreshSubscribers = [];

                    originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
                    return httpClient(originalRequest);
                } else {
                    return new Promise((resolve, reject) => {
                        refreshSubscribers.push((accessToken: string | null) => {
                            if (accessToken === null) {
                                reject(error);
                            } else {
                                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                                resolve(httpClient(originalRequest));
                            }
                        });
                    });
                }
            }

            return Promise.reject(error);
        } catch (err) {
            console.error(err);

            await SecureStore.deleteItemAsync(SecureStoreConstants.ACCESS_TOKEN);
            await SecureStore.deleteItemAsync(SecureStoreConstants.REFRESH_TOKEN);
            store.dispatch(unsetToken());
            refreshSubscribers.forEach((fn) => {
                fn(null);
            });
            refreshSubscribers = [];
            isRefreshing = false;

            return Promise.reject(err);
        }
    }
);

export default httpClient;
