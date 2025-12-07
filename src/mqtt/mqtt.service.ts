import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { MqttContext } from '@nestjs/microservices';
import * as mqtt from 'mqtt';

// Type imports
import type { IPublishPacket } from 'mqtt-packet';
import { ErrorService } from 'src/error/error.service';
import type { MqttResponse } from 'src/model/mqttResponse.model';
import { DeviceDataMongoRepository } from 'src/repositories/deviceData/device-data-mongo.repository';

@Injectable()
export class MqttService {

    private readonly logger = new Logger();

    // Instantiate MQTT Publisher 
    private pubClient = mqtt.connect(process.env.MQTT_URL!, {
        username: process.env.MQTT_CLIENT_USERNAME,
        password: process.env.MQTT_CLIENT_KEY,
        clientId: `nestjs-${Math.random().toString(16).slice(2)}`
    });

    constructor(
        private deviceDataMongoRepository: DeviceDataMongoRepository,
        private errorService: ErrorService,
    ){}

    async handleMessage(
        context: MqttContext
    ): Promise<MqttResponse | HttpException>{

        try{

            const packet = context.getPacket();

            if(packet.cmd !== 'publish'){
                
                // [Log]
                this.logger.debug({
                    ok: false,
                    topic: context.getTopic(),
                    payload: null,
                    qos: null
                });
                
                // [Return]
                return {
                    ok: false,
                    topic: context.getTopic(),
                    payload: null,
                    qos: null
                }

            }
            
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

        }catch(e: unknown){

            // [Log]
            const errorLog = this.errorService.handleErrorForInternalLogging(e);
            this.logger.error(errorLog);

            // [Return] Create an error response for client
            throw new HttpException(
                'Internal Server Error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );

        }

    }
    
    /**
     * Relay hydrated MQTT message to potential subscribers
     */
    publishMessage(
        mqttTopic: string,
        hydratedMqttMessage: MqttResponse
    ){

        try{

            this.pubClient.publish(mqttTopic, JSON.stringify(hydratedMqttMessage), { qos: 0 });
        
            // [Log]
            this.logger.log(`[MQTT Publisher] Commence publishing at ${mqttTopic}`);
        
        }catch(e: unknown){

            // [Log]
            const errorLog = this.errorService.handleErrorForInternalLogging(e);
            this.logger.error(errorLog);

            // [Return] 
            throw new HttpException(
                { ok: false, status: HttpStatus.INTERNAL_SERVER_ERROR, errorMessage: 'Internal Server Error' },
                HttpStatus.INTERNAL_SERVER_ERROR
            );

        }

    }
}
