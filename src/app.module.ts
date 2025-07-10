import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/user/user.module';
import { User, UserSchema } from '@modules/user/user.schema';
import { appConfig } from '@/config/config';

@Module({
  imports: [
    MongooseModule.forRoot(`${appConfig.mongodb.uri}/${appConfig.mongodb.databaseName}`),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
