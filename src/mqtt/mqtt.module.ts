import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { MqttController } from './mqtt.controller';
import { MongoModule } from 'src/mongo/mongo.module';
import { ErrorModule } from 'src/error/error.module';

/**
 * Consolidate all MQTT related scripts into a module for separation of concerns
 */
@Module({
    imports: [
        MongoModule,
        ErrorModule
    ],
    controllers: [MqttController],
    providers: [MqttService],
    exports: [MqttService]
})
export class MqttModule {}
