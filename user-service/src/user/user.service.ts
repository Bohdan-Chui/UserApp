import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
    @Inject('RMQ_SERVICE') private readonly client: ClientProxy
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = this.repo.create({ name: dto.name });
    const savedUser = await this.repo.save(user);

    return this.client.send({ cmd: 'user.created' }, savedUser);
  }
}
