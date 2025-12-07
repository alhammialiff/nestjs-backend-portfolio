/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { User } from 'src/model/user.model';
import { PrismaUserRepository } from 'src/repositories/user/prisma-user.repository';


/**
 * Service layer to communicate with User Repository layer for User table data access 
 * Controller -> Service -> Repository -> DB
 */
@Injectable()
export class UserService {

    constructor(
        private userPrismaRepository: PrismaUserRepository
    ){}

    /**
    * Get User By Id (prototype only) 
    * Returns internal User object, not to be mistaken with UserDTO(WIP)
    */
    async getUserById(userId: string): Promise<User | null>{

        // Invoke repository to there after call DB
        const user: User | null = await this.userPrismaRepository.getUserById(userId);

        // [Return] User
        return user;

    }

}
