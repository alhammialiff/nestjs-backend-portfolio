import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

import type { LoginDto } from 'src/model/loginDto.model';
import type { NextFunction } from 'express';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('login')
    login(
        @Body() loginDto: LoginDto,
        next: NextFunction
    ){
        
        next();
        
    }


}
