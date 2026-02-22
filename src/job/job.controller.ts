import { IdGeneratorService } from '../util/id/id-generator.service';
import { BadRequestException, Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
// import { randomUUID } from 'crypto';
import { CreateJobRequest } from 'src/model/createJobRequest.model';

@Controller('job')
export class JobController {

    constructor(
        @Inject('JOB_QUEUE_CLIENT')
        private readonly jobQueueClient: ClientProxy,
        private readonly idGeneratorService: IdGeneratorService
    ){}

    /*
    * Like NgOnInit, this automatically establish connection
    * to RabbitMQ Client on module initialization.
    * This ensures RabbitMQ connection is performed once at startup,
    * not on every request.
    */ 
    async onModuleInit(){
        await this.jobQueueClient.connect()
    }

    @Post('create')
    createJob(
        @Body() createJobRequest: Partial<CreateJobRequest>
    ){

        // If requestedBy is null or undefined, return 400
        if(!createJobRequest.requestedBy){
            throw new BadRequestException('User invalid'); 
        }

        const jobId = `JOB-${this.idGeneratorService.generateTimestampIncrementalId()}`

        // Send job to RabbitMQ Job Queue
        // job.create - event name (not queue name)
        this.jobQueueClient.emit('job.create', jobId);

        return {
            message: 'Job queued',
            jobId: jobId
        }

    }

}
