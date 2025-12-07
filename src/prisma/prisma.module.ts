import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaUserRepository } from 'src/repositories/user/prisma-user.repository';
import { ErrorModule } from 'src/error/error.module';

@Module({
    imports:[ErrorModule],
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
