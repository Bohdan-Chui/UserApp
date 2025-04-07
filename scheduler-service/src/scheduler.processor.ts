import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Processor('pushQueue')
export class SchedulerProcessor {
  private readonly logger = new Logger(SchedulerProcessor.name);

  constructor(
    @Inject('NOTIFY_SERVICE') private client: ClientProxy,
  ) {}

  @Process('sendPush')
  async handleSendPush(job: Job) {
    this.logger.log(`Time to send push to ${job.data.name}`);

    this.client.emit({ cmd: 'send.push' }, job.data);
  }
}