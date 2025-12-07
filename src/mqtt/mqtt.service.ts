import { Injectable } from '@nestjs/common';
import { MqttContext } from '@nestjs/microservices';

// Type imports
import type { IPublishPacket } from 'mqtt-packet';
import type { MqttResponse } from 'src/model/mqttResponse.model';

@Injectable()
export class MqttService {

    handleMessage(
        context: MqttContext
    ): MqttResponse{

        const packet = context.getPacket();
        
        // Pack mqtt subscription data into MqttResponse object
        const mqttResponse: MqttResponse = {
            ok: true,
            topic: context.getTopic(),
            payload: (packet as IPublishPacket).payload.toString(),
            qos: packet.qos as number
        }

        // [Debug]
        console.log(mqttResponse);

        // [Return]
        return mqttResponse;

    }

}
