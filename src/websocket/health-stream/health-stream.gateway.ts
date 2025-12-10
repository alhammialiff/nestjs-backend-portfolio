import { TimestampService } from './../../util/timestamp/timestamp.service';
import { Logger } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' }})
export class HealthStreamGateway {

  constructor(private timestampService: TimestampService){}

  logger: Logger = new Logger();
  clientName: string | null = null;

  @WebSocketServer() server: Server;

  @SubscribeMessage('connect')
  handleOnConnection(
    client: any, 
    payload: { id: string, deviceName: string, timestamp: string}
  ) {
  
  
  };

  @SubscribeMessage('client-info')
  handleReceiptOfClientInfo(
    client: any, 
    payload: { id: string, deviceName: string, timestamp: string}
  ) {
    
    this.logger.log(`[WS | Health Stream | Client ID] ${client?.id} connected`);
    this.logger.log(`[WS | Health Stream | More Client Info]`, payload);
    client.emit('client-info:ack','request info received');

    this.clientName = payload.deviceName;

  };

  @SubscribeMessage('health-poll-request')
  handleMessage(client: any, payload: any) {

    this.logger.log(`[WS | Health Stream | Data To] ${this.clientName}`);
    this.server.emit('health-poll-response', payload);
  
  };

}
