import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeviceData, DeviceDataDocument } from 'mongodb/deviceData.schema';
import { Model } from 'mongoose';
import { MqttResponse } from 'src/model/mqttResponse.model';

@Injectable()
export class DeviceDataMongoRepository {

    constructor(
        @InjectModel(DeviceData.name) private readonly deviceData: Model<DeviceDataDocument>
    ){}

    async create(deviceData: MqttResponse){

        return this.deviceData.create({
            ...deviceData
        });

    }

}
