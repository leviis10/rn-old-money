import type GetBudgetResponse from "../models/budgets/response/GetBudgetResponse";
import type SuccessResponse from "../models/global/response/SuccessResponse";
import handleHttpClientError from "../utils/handleHttpClientError";
import httpClient from "../utils/httpClient";

class BudgetService {
    static #baseUrl = "/api/v1/budgets";

    static async findAll() {
        return await handleHttpClientError<SuccessResponse<GetBudgetResponse[]>>(async () => {
            const { data } = await httpClient({
                url: this.#baseUrl,
                method: "GET",
            });
            return data;
        });
    }
}

export default BudgetService;
