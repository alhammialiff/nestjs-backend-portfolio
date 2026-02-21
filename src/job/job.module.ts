import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JobController } from './job.controller';

@Module({
    imports: [
        // Register RabbitMQ Client in module
        ClientsModule.register([
            {
                // Token used to inject this client elsewhere (used when we wanna inject it in controller)
                name: 'JOB_QUEUE_CLIENT',

                // Use RabbitMQ as the transport
                transport: Transport.RMQ, 

                options: {
                    // RabbitMQ broker address, falls back to local if env var not set
                    urls: [process.env.RABBITMQ_URL ?? 'amqp://guest:guest@localhost:5672'],

                    // Queue name to publish messages to
                    queue: process.env.RABBITMQ_QUEUE ?? 'jobs',
                    
                    // Queue survives RabbitMQ restarts (persisted to disk)
                    queueOptions: { durable: true }
                }
            }
        ])
    ],
    controllers: [JobController]
})
export class JobModule {}
