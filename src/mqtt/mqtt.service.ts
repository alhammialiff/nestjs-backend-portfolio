import { Injectable } from '@nestjs/common';
import { MqttContext } from '@nestjs/microservices';

// Type imports
import type { IPublishPacket } from 'mqtt-packet';
import type { MqttResponse } from 'src/model/mqttResponse.model';
import { DeviceDataMongoRepository } from 'src/repositories/deviceData/device-data-mongo.repository';

@Injectable()
export class MqttService {

    constructor(private deviceDataMongoRepository: DeviceDataMongoRepository){}

    async handleMessage(
        context: MqttContext
    ): Promise<MqttResponse>{

        const packet = context.getPacket();
        
        // Pack mqtt subscription data into MqttResponse object
        const mqttResponse: MqttResponse = {
            ok: true,
            topic: context.getTopic(),
            payload: (packet as IPublishPacket).payload.toString(),
            qos: packet.qos as number
        }

        // [Data Access] Commence storing of Device Data 
        await this.deviceDataMongoRepository.create(mqttResponse);

        // [Debug]
        console.log(mqttResponse);

        // [Return]
        return mqttResponse;

    }

}
