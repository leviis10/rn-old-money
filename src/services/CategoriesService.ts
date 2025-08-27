import type CreateCategoryRequest from "../models/categories/request/CreateCategoryRequest";
import type UpdateCategoryRequest from "../models/categories/request/UpdateCategoryRequest";
import type CreateCategoryResponse from "../models/categories/response/CreateCategoryResponse";
import type GetCategoryResponse from "../models/categories/response/GetCategoryResponse";
import type UpdateCategoryResponse from "../models/categories/response/UpdateCategoryResponse";
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

    static async updateById(id: number, request: UpdateCategoryRequest) {
        return await handleHttpClientError<SuccessResponse<UpdateCategoryResponse>>(async () => {
            const { data } = await httpClient({
                url: `${this.#baseUrl}/${id}`,
                method: "PUT",
                data: request,
            });
            return data;
        });
    }
}

export default CategoriesService;
