import { AxiosError } from "axios";
import ErrorResponse from "../models/global/response/ErrorResponse";

async function handleHttpClientError<T>(fn: () => Promise<T>): Promise<T> {
    try {
        return await fn();
    } catch (err) {
        if (err instanceof AxiosError) {
            const axiosError = err as AxiosError<ErrorResponse>;
            if (axiosError.response) {
                throw new ErrorResponse(axiosError.response.data.code, axiosError.response.data.message);
            }
        }

        throw new Error(`Something went wrong: ${err}`);
    }
}

export default handleHttpClientError;
