import SuccessResponse from "../models/global/response/SuccessResponse";
import CreateWalletPayload from "../models/wallets/request/CreateWalletPayload";
import FindAllWalletsParams from "../models/wallets/request/FindAllWalletsParams";
import UpdateWalletPayload from "../models/wallets/request/UpdateWalletPayload";
import CreateWalletResponse from "../models/wallets/response/CreateWalletResponse";
import GetWalletResponse from "../models/wallets/response/GetWalletResponse";
import handleHttpClientError from "../utils/handleHttpClientError";
import httpClient from "../utils/httpClient";

class WalletService {
    static #baseUrl = "/api/v1/wallets";

    static async findAll(query: FindAllWalletsParams | null) {
        return await handleHttpClientError(async () => {
            let url = this.#baseUrl;
            if (query !== null) {
                const { maxFetch } = query;
                url += "?";

                if (maxFetch !== null) {
                    url += `max_fetch=${maxFetch}`;
                }
            }

            const { data } = await httpClient<SuccessResponse<GetWalletResponse[]>>({
                method: "GET",
                url,
            });
            return data;
        });
    }

    static async create(payload: CreateWalletPayload) {
        return await handleHttpClientError(async () => {
            const { data } = await httpClient<SuccessResponse<CreateWalletResponse>>({
                method: "POST",
                url: this.#baseUrl,
                data: payload,
            });
            return data;
        });
    }

    static async updateById(id: number, payload: UpdateWalletPayload) {
        return await handleHttpClientError(async () => {
            const { data } = await httpClient({
                method: "PUT",
                url: `${this.#baseUrl}/${id}`,
                data: payload,
            });
            return data;
        });
    }

    static async deleteById(id: number) {
        return await handleHttpClientError(async () => {
            const { data } = await httpClient({
                method: "DELETE",
                url: `${this.#baseUrl}/${id}`,
            });
            return data;
        });
    }
}

export default WalletService;
