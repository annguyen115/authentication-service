import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '@modules/user/user.module';
import { LogModule } from '@modules/log/log.module';

@Module({
  imports: [UserModule, LogModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
