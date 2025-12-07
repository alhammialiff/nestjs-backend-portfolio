/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, HttpException, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserDTO } from 'src/model/user.model';
import { ErrorService } from 'src/error/error.service';

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService,
        private errorService: ErrorService
    ){}

    @Get(':id')
    async getUserById(
        @Param('id') userId: string
    ): Promise<UserDTO | null | HttpException>{
        
        // Invoke userService's getUserById
        const user: UserDTO | null | HttpException = await this.userService.getUserById(userId);
        
        // [Response] Should return a response later
        return user;

    }

}
