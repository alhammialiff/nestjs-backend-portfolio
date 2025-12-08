export interface HttpOkResponse<T>{
    ok: true,
    data: T,
    message: string | null;
}