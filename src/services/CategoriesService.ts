import type CreateCategoryRequest from "../models/categories/request/CreateCategoryRequest";
import type CreateCategoryResponse from "../models/categories/response/CreateCategoryResponse";
import type GetCategoryResponse from "../models/categories/response/GetCategoryResponse";
import type SuccessResponse from "../models/global/response/SuccessResponse";
import handleHttpClientError from "../utils/handleHttpClientError";
import httpClient from "../utils/httpClient";

class CategoriesService {
    static #baseUrl = "/api/v1/categories";

    static async create(request: CreateCategoryRequest) {
        return await handleHttpClientError<SuccessResponse<CreateCategoryResponse>>(async () => {
            const { data } = await httpClient({
                url: this.#baseUrl,
                method: "POST",
                data: request,
            });
            return data;
        });
    }

    static async findAll() {
        return await handleHttpClientError<SuccessResponse<GetCategoryResponse[]>>(async () => {
            const { data } = await httpClient({
                url: this.#baseUrl,
                method: "GET",
            });
            return data;
        });
    }
}

export default CategoriesService;
