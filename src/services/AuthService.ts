import LoginPayload from "../models/auth/request/LoginPayload";
import RegisterPayload from "../models/auth/request/RegisterPayload";
import LoginResponse from "../models/auth/response/LoginResponse";
import RegisterResponse from "../models/auth/response/RegisterResponse";
import SuccessResponse from "../models/global/response/SuccessResponse";
import handleHttpClientError from "../utils/handleHttpClientError";
import httpClient from "../utils/httpClient";

class AuthService {
    static async register(payload: RegisterPayload): Promise<SuccessResponse<RegisterResponse>> {
        return handleHttpClientError(async () => {
            const { data } = await httpClient({
                url: "/api/v1/auth/register",
                method: "POST",
                data: payload,
            });
            return data;
        });
    }

    static async login(payload: LoginPayload): Promise<SuccessResponse<LoginResponse>> {
        return await handleHttpClientError(async () => {
            const { data } = await httpClient({
                url: "/api/v1/auth/login",
                method: "POST",
                data: payload,
            });
            return data;
        });
    }
}

export default AuthService;
