import RegisterPayload from "../models/auth/request/RegisterPayload";
import RegisterResponse from "../models/auth/response/RegisterResponse";
import SuccessResponse from "../models/response/SuccessResponse";
import handleHttpClientError from "../utils/handleHttpClientError";
import httpClient from "../utils/httpClient";

class AuthService {
    static async register(payload: RegisterPayload): Promise<SuccessResponse<RegisterResponse>> {
        return await handleHttpClientError(async () => {
            const { data } = await httpClient<SuccessResponse<RegisterResponse>>({
                url: "/api/v1/auth/register",
                method: "POST",
                data: payload,
            });
            return data;
        });
    }
}

export default AuthService;
