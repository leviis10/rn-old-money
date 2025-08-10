interface Meta {
    totalItems: number,
    page: number,
    pageSize: number,
    lastPage: number
}

interface SuccessResponse<T> {
    data: T,
    message: string,
    meta?: Meta
}

export default SuccessResponse;