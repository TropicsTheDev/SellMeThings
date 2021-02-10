import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { User } from './users.entity';


@Injectable()
export class UsersService extends AbstractService{
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {
    super(usersRepository);
  }
}