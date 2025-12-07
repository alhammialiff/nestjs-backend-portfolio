import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PrismaService } from './prisma/prisma.service';
import { MqttController } from './mqtt/mqtt.controller';
import { PrismaUserRepository } from './repositories/user/prisma-user.repository';
import { MqttService } from './mqtt/mqtt.service';

@Module({
  imports: [],
  controllers: [AppController, UserController, MqttController],
  providers: [AppService, UserService, PrismaService, PrismaUserRepository, MqttService],
})
export class AppModule {}
