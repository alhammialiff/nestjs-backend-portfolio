/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoginDto } from 'src/model/loginDto.model';
import { UserService } from 'src/user/user.service';
import { User, UserDto } from 'src/model/user.model';
import { HttpOkResponse } from 'src/model/httpResponse.model';
import * as bcrypt from 'bcrypt';

/**
 * Validates LoginDTO received from client
 */
@Injectable()
export class ValidateLoginDtoMiddleware implements NestMiddleware {

    use(req: Request, res: Response, next: NextFunction){

        const reqBodyIsFragmentedOrEmpty = 
            !req.body || 
            !((req.body as LoginDto).username) || 
            !((req.body as LoginDto).password);

        // If username or password is missing
        if(reqBodyIsFragmentedOrEmpty) {
            return res.status(401).json({
                ok: false,
                errorMessage: 'Unauthorized'
            });
        }

        next();
    }

}

/**
 * Validates User through DB retrieval and basic password check
 * (This sets the foundation to beefier auth methods like JWT) 
 */
@Injectable()
export class ValidateUser implements NestMiddleware{

    constructor(private userService: UserService){}

    async use(req: Request, res: Response){

        // Destructure username and password and commence login process
        const { username, password } = req.body as LoginDto;
        const user: User | null = await this.userService.getUserByUsername(username);

        // [Early Bail] User is null
        if(!user){
            throw new BadRequestException('Authentication Failure');
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);

        // [Early Bail] Password incorrect
        if(!passwordsMatch){
            throw new BadRequestException('Authentication Failure')
        }

        const httpOkResponse: HttpOkResponse<UserDto> = {
            ok: true,
            data: {
                id: user.id,
                userName: user.userName,
                fullName: user.fullName,
            },
            message: 'Authenticated'
        };

        // [Return] Ok
        return res.status(200).json(httpOkResponse);

    }

}