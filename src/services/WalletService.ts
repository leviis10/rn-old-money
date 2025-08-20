import SuccessResponse from "../models/global/response/SuccessResponse";
import CreateWalletPayload from "../models/wallets/request/CreateWalletPayload";
import CreateWalletResponse from "../models/wallets/response/CreateWalletResponse";
import GetWalletResponse from "../models/wallets/response/GetWalletResponse";
import handleHttpClientError from "../utils/handleHttpClientError";
import httpClient from "../utils/httpClient";

class WalletService {
    static async findAll() {
        return await handleHttpClientError(async () => {
            const {data} = await httpClient<SuccessResponse<GetWalletResponse[]>>({
                method: "GET",
                url: "/api/v1/wallets"
            });
            return data;
        });
    }

    static async create(payload: CreateWalletPayload) {
        return await handleHttpClientError(async () => {
            const {data} = await httpClient<SuccessResponse<CreateWalletResponse>>({
                method: "POST",
                url: "/api/v1/wallets",
                data: payload
            });
            return data;
        });
    }
}

export default WalletService;

