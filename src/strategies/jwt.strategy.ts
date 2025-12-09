/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtTokenPayload } from 'src/model/jwt.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy , 'jwt') {

    constructor(){

        const secret = process.env.JWT_SECRET;

        if(!secret){
            throw new Error('JWT_SECRET is not defined');
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secret
        });
    }

    validate(payload: JwtTokenPayload){

        // [Return] this automatically becomes req.user
        return {
            userId: payload.sub,
        }
    }

}
