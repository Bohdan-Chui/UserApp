import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PushService } from './push.service';

@Module({
  controllers: [AppController],
  providers: [PushService],
})
export class AppModule {}