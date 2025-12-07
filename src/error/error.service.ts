import { Injectable } from '@nestjs/common';
import { InternalErrorResponse as InternalErrorResponse } from 'src/model/errorResponse.model';

@Injectable()
export class ErrorService {

    /**
     * This error handler is supposed to parse error message for internal logging
     */
    handleErrorForInternalLogging(e: unknown): InternalErrorResponse{

        let errorMessage: string | null = null;

        if(e instanceof Error){
            errorMessage = e.message;
        }else{
            errorMessage = String(e);
        }

        // [Return] Internal Error Response for logging
        return {
            ok: false,
            errorMessage: errorMessage,
            stack: e instanceof Error? e.stack: null,
            cause: e instanceof Error? e?.cause: null
        } as InternalErrorResponse;

    }
}
