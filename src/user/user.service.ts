/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { User } from 'src/model/user.model';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

    constructor(private prismaService: PrismaService){}

    /**
     * 
     * @param userId 
     * @returns User Object
     */
    async getUserById(userId: string): Promise<User | null>{

        // Invoke prisma and call DB
        const user = await this.prismaService.user.findUnique({
            where:{
                id: userId
            }
        });

        // [Return] Null if no row found
        if(!user){
            return null;
        }

        // [Return] User if found
        return {
            id: user.id,
            userName: user.username,
            fullName: user.fullname,
            password: user.password
        };

    }

}
