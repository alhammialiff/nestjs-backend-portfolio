/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/model/user.model';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    @Get(':id')
    async getUserById(
        @Param('id') userId: string
    ): Promise<User | null>{
        
        // Invoke userService's getUserById
        const user = await this.userService.getUserById(userId);
        
        return user;

    }

}
