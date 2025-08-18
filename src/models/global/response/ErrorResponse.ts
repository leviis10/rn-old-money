// export interface ErrorCode {
//     NotFound: "NotFound";
//     Hash: "Hash";
//     EnvironmentVariable: "EnvironmentVariable";
//     Parse: "Parse";
//     Database: "Database";
//     Validation: "Validation";
//     Authentication: "Authentication";
//     Authorization: "Authorization";
//     InvalidFormatter: "InvalidFormatter";
//     Expired: "Expired";
// }

export enum ErrorCode {
    NotFound = "NotFound",
    Hash = "Hash",
    EnvironmentVariable = "EnvironmentVariable",
    Parse = "Parse",
    Database = "Database",
    Validation = "Validation",
    Authentication = "Authentication",
    Authorization = "Authorization",
    InvalidFormatter = "InvalidFormatter",
    Expired = "Expired",
}

class ErrorResponse {
    #code: ErrorCode;
    #message: string;

    constructor(code: ErrorCode, message: string) {
        this.#code = code;
        this.#message = message;
    }

    get code() {
        return this.#code;
    }

    get message() {
        return this.#message;
    }
}

export default ErrorResponse;
