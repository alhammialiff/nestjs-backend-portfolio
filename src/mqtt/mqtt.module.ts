import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { MqttController } from './mqtt.controller';
import { MongoModule } from 'src/mongo/mongo.module';

/**
 * Consolidate all MQTT related scripts into a module for separation of concerns
 */
@Module({
    imports: [MongoModule],
    controllers: [MqttController],
    providers: [MqttService],
    exports: [MqttService]
})
export class MqttModule {}
