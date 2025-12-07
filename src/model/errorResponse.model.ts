
/**
 * This error is supposed to be logged internally
 */
export interface InternalErrorResponse {
    ok: false;
    errorMessage: string;
    stack?: string; // For Error class
    cause?: string; // For Error class
}

/**
 * This error is supposed to be for public response back to client
 */
export interface PublicErrorResponse {
    ok: false;
    status: number;
    errorMessage: string;
}