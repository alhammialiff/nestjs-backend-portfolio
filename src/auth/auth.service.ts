/* eslint-disable @typescript-eslint/no-unsafe-return */
import { JwtPayload } from './../../node_modules/@types/jsonwebtoken/index.d';
import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private readonly jwt: JwtService){}

    issueJwtToken(payload: JwtPayload): string{

        // [Return] Generate Token
        return this.jwt.sign(payload);

    }

    // Keep it first for manual verification outside Auth Guards
    verifyJwtToken(jwtToken: string){
        
        // [Return] Decoded payload if token has not expired
        //          Throws TokenExpiredError or others if invalid
        return this.jwt.verify(jwtToken);

    }

    
}
