import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { MqttController } from './mqtt.controller';
import { MongoModule } from 'src/mongo/mongo.module';
import { ErrorModule } from 'src/error/error.module';
import { WebsocketModule } from 'src/websocket/websocket.module';
import { HealthStreamGateway } from 'src/websocket/health-stream/health-stream.gateway';

/**
 * Consolidate all MQTT related scripts into a module for separation of concerns
 */
@Module({
    imports: [
        MongoModule,
        ErrorModule,
        WebsocketModule 
    ],
    controllers: [MqttController],
    providers: [MqttService],
    exports: [MqttService]
})
export class MqttModule {}
