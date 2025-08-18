import handleHttpClientError from "../utils/handleHttpClientError";
import httpClient from "../utils/httpClient";

class UserService {
    static async getSelf() {
        return handleHttpClientError(async () => {
            const { data } = await httpClient({
                method: "GET",
                url: "/api/v1/users/self",
            });

            return data;
        });
    }
}

export default UserService;
