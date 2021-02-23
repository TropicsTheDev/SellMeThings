import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { UserType } from "./userTypes.entity";

import { UsersService } from './users.service';
import { UserTypesService } from './userTypes.service';
import { Address } from "./addresses.entity";
import { AddressesService } from './addresses.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserType, Address])],
  controllers: [UsersController],
  providers: [UsersService, UserTypesService, AddressesService],
  exports: [UsersService, UserTypesService],
})
export class UsersModule {}
