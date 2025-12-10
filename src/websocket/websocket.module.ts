import { Module } from '@nestjs/common';
import { HealthStreamGateway } from './health-stream/health-stream.gateway';
import { TimestampService } from 'src/util/timestamp/timestamp.service';

@Module({
    providers: [ HealthStreamGateway, TimestampService ],
    exports: [ HealthStreamGateway ]
})
export class WebsocketModule {}
