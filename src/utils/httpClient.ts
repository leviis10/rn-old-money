import axios from "axios";
import ApplicationConstants from "../constants/ApplicationConstants";

const httpClient = axios.create({
    baseURL: ApplicationConstants.API_BASE_URL,
    timeout: ApplicationConstants.API_TIMEOUT
});

export default httpClient;