/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, HttpException, Param, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthUser, User, UserDto } from 'src/model/user.model';
import { ErrorService } from 'src/error/error.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService,
        private errorService: ErrorService
    ){}

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async getUserById(
        @Param('id') userId: string,
        @Req() request: Request
    ): Promise<UserDto | null | HttpException>{
        
        // Invoke userService's getUserById
        const user: UserDto | null | HttpException = await this.userService.getUserById(userId);
        
        // [Jwt] Extract req.user created by auto-invoked validation by JwtStrategy (Park it here first)
        const authUser = ((request as any).user as AuthUser);

        // [Response] Should return a response later
        return {
            ...user,
            authUser: authUser
        } as UserDto;

    }

}
