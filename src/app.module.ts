import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/user/user.module';
import { User, UserSchema } from '@modules/user/user.schema';
import { appConfig } from '@/config/config';
import { LoggerModule } from 'nestjs-pino';
import { LogModule } from '@modules/log/log.module';

@Module({
  imports: [
    MongooseModule.forRoot(`${appConfig.mongodb.uri}/${appConfig.mongodb.databaseName}`),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    LoggerModule.forRoot({
      pinoHttp: {
        redact: appConfig.logger.sensitives,
        transport: {
          target: 'pino-pretty',
          options: {
            translateTime: 'SYS:standard',
            colorize: true,
          },
        },
      },
    }),
    AuthModule,
    UserModule,
    LogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
