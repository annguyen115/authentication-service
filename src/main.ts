import { NestFactory } from '@nestjs/core';
import { appConfig } from '@config/config';
import { AppExceptionFilter } from '@error/AppExceptionFilter';
import { ResponseInterceptor } from '@/interceptors/response.interceptor';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from '@interceptors/log.interceptor';
import { LogService } from '@modules/log/log.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggingInterceptor(app.get(LogService)));
  app.useGlobalFilters(new AppExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  await app.listen(appConfig?.port ?? 3000);
}

void bootstrap();
