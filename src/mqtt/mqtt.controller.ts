import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, MqttContext } from '@nestjs/microservices';

import type { MqttResponse } from 'src/model/mqttResponse.model';
import { MqttService } from './mqtt.service';

/**
 * The first layer to receive MQTT subscriptions
 * Controller -> Service -> MQTT subscription queue
 */
@Controller()
export class MqttController {

    constructor(private mqttService: MqttService){}

    /**
     * MQTT_TOPIC_1 (for sake of portfolio): 
     * portfolio-v1/app/company-1/device-e6ed0c99-441c-4374-9cbf-efed2a0fa703/health
     * This is stored away in .env 
     * Really depends on the org's dev standards and practices
     */
    @MessagePattern(process.env.MQTT_TOPIC_1)
    async subscribeDevice1Data(
        @Ctx() context: MqttContext
    ): Promise<MqttResponse>{

        const mqttResponse = this.mqttService.handleMessage(context);
        
        // [Return MQTT Response Object]
        return mqttResponse;

    }



}
