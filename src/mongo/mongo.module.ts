import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceData, DeviceDataSchema } from 'mongodb/deviceData.schema';
import { DeviceDataMongoRepository } from 'src/repositories/deviceData/device-data-mongo.repository';

/**
 * Consolidate all MongoDB related scripts into a module for separation of concerns
 */
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: DeviceData.name, schema: DeviceDataSchema }
        ])
    ],
    providers: [DeviceDataMongoRepository],
    controllers: [],
    exports: [
        MongooseModule, 
        DeviceDataMongoRepository
    ]
})
export class MongoModule {}
