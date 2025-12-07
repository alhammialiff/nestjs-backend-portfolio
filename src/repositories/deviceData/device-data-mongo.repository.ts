import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeviceData, DeviceDataDocument } from 'mongodb/deviceData.schema';
import { Model } from 'mongoose';
import { ErrorService } from 'src/error/error.service';
import { MqttResponse } from 'src/model/mqttResponse.model';

@Injectable()
export class DeviceDataMongoRepository {

    logger = new Logger();

    constructor(
        @InjectModel(DeviceData.name) private readonly deviceData: Model<DeviceDataDocument>,
        private errorService: ErrorService
    ){}

    async create(deviceData: MqttResponse){

        try{
            
            return await this.deviceData.create({
                ...deviceData
            });

        }catch(e: unknown){

            // [Log]
            const errorLog = this.errorService.handleErrorForInternalLogging(e);
            this.logger.error(errorLog);

            return null;

        }


    }

}
