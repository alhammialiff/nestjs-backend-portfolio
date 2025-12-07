/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { HttpException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ErrorService } from 'src/error/error.service';
import { User, UserDTO } from 'src/model/user.model';
import { PrismaUserRepository } from 'src/repositories/user/prisma-user.repository';


/**
 * Service layer to communicate with User Repository layer for User table data access 
 * Controller -> Service -> Repository -> DB
 */
@Injectable()
export class UserService {

    constructor(
        private userPrismaRepository: PrismaUserRepository,
        private errorService: ErrorService
    ){}

    logger: Logger = new Logger();

    /**
    * Get User By Id (prototype only) 
    * Returns internal User object, not to be mistaken with UserDTO(WIP)
    */
    async getUserById(userId: string): Promise<UserDTO | null | HttpException>{
        
        try{

            // Invoke repository to there after call DB
            const user: User | null = await this.userPrismaRepository.getUserById(userId);
            
            // [Early Bail]
            if(!user){

                throw new NotFoundException('User Not Found');
                
            }
    
            // Hydrate UserDTO 
            const userDTO: UserDTO = {
                id: user.id,
                userName: user.userName,
                fullName: user.fullName,
            };
    
            // [Return] User
            return userDTO;

        }catch(e: unknown){

            const errorMessage = e instanceof HttpException? e.message: String(e);
            const errorStatus = e instanceof HttpException? e.getStatus(): 500;

            // [Log]
            const errorLog = this.errorService.handleErrorForInternalLogging(e);
            this.logger.error(errorLog);
            
            // [Return] 
            throw new HttpException(
                errorMessage,
                errorStatus
            );

        }

    }

}
