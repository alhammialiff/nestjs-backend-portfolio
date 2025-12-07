import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoModule } from './mongo/mongo.module';
import { MqttModule } from './mqtt/mqtt.module';
import { PrismaModule } from './prisma/prisma.module';

//import { PrismaService } from './prisma/prisma.service';
//import { PrismaUserRepository } from './repositories/user/prisma-user.repository';
//import { DeviceDataMongoRepository } from './repositories/deviceData/device-data-mongo.repository';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true}),
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    MongoModule,
    MqttModule,
    PrismaModule
  ],
  controllers: [
    AppController, 
    UserController
  ],
  providers: [
    AppService, 
    UserService
  ],
})
export class AppModule {}
