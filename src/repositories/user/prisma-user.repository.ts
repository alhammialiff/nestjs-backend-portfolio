/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import type { User } from 'src/model/user.model';
import { ErrorService } from 'src/error/error.service';


/**
 * Repository layer to communicate with User table DAOs
 * Controller -> Service -> Repository -> DB
 */
@Injectable()
export class PrismaUserRepository {
    
    logger: Logger = new Logger();

    constructor(private prismaService: PrismaService,
        private errorService: ErrorService
    ){}
    
    // Get user by ID from User table 
    async getUserById(userId: string): Promise<User | null>{

        try{

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
        
        }catch(e: unknown){

            // [Log]
            const errorLog = this.errorService.handleErrorForInternalLogging(e);
            this.logger.error(errorLog.errorMessage);

            return null;

        }

    }

    // Get User By Username
    async getUserByUsername(username: string): Promise<User | null> {

        try{

            const user = await this.prismaService.user.findFirst({
                where: {
                    username: username
                }
            });

            // [Early Bail] User not found
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

        }catch(e: unknown){

            // [Log]
            const errorLog = this.errorService.handleErrorForInternalLogging(e);
            this.logger.error(errorLog.errorMessage);

            return null;

        }

    }

}
