import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { SchedulerService } from './schedule.service';

@Controller()
export class AppController {
  constructor(private readonly schedulerService: SchedulerService) {}

  @MessagePattern({ cmd: 'user.created' })
  handleMessage(data: any) {
    this.schedulerService.schedulePush(data);

    return data;
  }
}
