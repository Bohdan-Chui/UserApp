import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PushService } from './push.service';

@Controller()
export class AppController {
  constructor(private readonly pushService: PushService) {}

  @MessagePattern({ cmd: 'send.push' })
  async handlePush(@Payload() data: any) {
    return this.pushService.sendFakePush(data);
  }
}