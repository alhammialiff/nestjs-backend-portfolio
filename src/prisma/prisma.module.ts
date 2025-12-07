import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaUserRepository } from 'src/repositories/user/prisma-user.repository';

@Module({
    imports:[],
    providers: [
        PrismaService,
        PrismaUserRepository
    ],
    exports: [
        PrismaService,
        PrismaUserRepository
    ]

})
export class PrismaModule {}
