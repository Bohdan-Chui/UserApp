import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(
    @InjectQueue('pushQueue') private queue: Queue,
  ) {}

  async schedulePush(user: any) {
    const delay = parseInt(process.env.NOTIFICATION_DELAY || String(1000 * 60 * 24)); // 24h by default

    this.logger.log(`Schedule push for user:${user.id} with delay:${delay / 1000} seconds`);

    await this.queue.add('sendPush', user, { delay });
  }
}