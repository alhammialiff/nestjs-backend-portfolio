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
     * i.e. portfolio-v1/app/company-1/device-e6ed0c99-441c-4374-9cbf-efed2a0fa703/health
     * This is stored away in .env 
     * Really depends on the org's dev standards and practices
     * 
     * Context:
     * This method gets Device 1 telemetry message through the organisation broker 
     * device name is shown to have uuid just to exemplify data source is still raw
     * 
     * This app then consolidates the message/s, parses it nicely, and re-publishes it 
     * with a more understood topic URI (MQTT_RELAY_TOPIC_1) for subscription
     * i.e. portfolio-v1/app/company-1/pantry-access-point/health
     */
    @MessagePattern(process.env.MQTT_TOPIC_1)
    async subscribeDevice1Data(
        @Ctx() context: MqttContext
    ){

        const mqttResponse = await this.mqttService.handleMessage(context);

        // Only publish if MQTT Response is OK
        if((mqttResponse as MqttResponse).ok){
            
            this.mqttService.publishMessage(
                process.env.MQTT_RELAY_TOPIC_1!, 
                mqttResponse as MqttResponse
            );
        
        }

    }



}
