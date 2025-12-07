/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import type { User } from 'src/model/user.model';


/**
 * Repository layer to communicate with User table DAOs
 * Controller -> Service -> Repository -> DB
 */
@Injectable()
export class PrismaUserRepository {

    constructor(private prismaService: PrismaService){}
    
    // Get user by ID from User table 
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
        } as User;

    }

}
