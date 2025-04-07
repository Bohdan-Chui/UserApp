import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PushService {
  private readonly logger = new Logger(PushService.name);

  async sendFakePush(data: any) {
    this.logger.log(`Sending notification to ${data.name}...`);

    try {
      const res = await axios.post(process.env.WEBHOOK_URL, {
        userId: data.id,
        message: `Hello, ${data.name}, this is your scheduled notification!`,
      });

      this.logger.log(`Push sent! Status: ${res.status}`);

      return { status: 'success' };
    } catch (error) {
      this.logger.error(`Push failed: ${error.message}`);

      return { status: 'error' };
    }
  }
}
