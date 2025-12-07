import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
// import { MqttResponse } from 'src/model/mqttResponse.model';

// Defines the TS model of our MongoDB document test.devicedatas
export type DeviceDataDocument = HydratedDocument<DeviceData>;

/**
 * Create a schema for MongoDB's Device Data
 * This schema follows the MQTT Response model
 */
@Schema({ timestamps: true })
export class DeviceData {
    @Prop({ required: true })
    ok: boolean;
    @Prop()
    topic: string;
    @Prop()
    payload: string;
    @Prop()
    qos: number;
}

// Export Schema for usage with MongooseModule.forFeature
export const DeviceDataSchema = SchemaFactory.createForClass(DeviceData);