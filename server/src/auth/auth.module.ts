import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { UsersModule } from 'src/users/users.module';
import { UserTypesService } from 'src/users/userTypes.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [UsersModule, CommonModule],
  controllers: [AuthController],
  providers: [],
})
export class AuthModule {}
