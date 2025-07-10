import { NestFactory } from '@nestjs/core';
import { appConfig } from '@config/config';
import { AppExceptionFilter } from '@error/AppExceptionFilter';
import { ResponseInterceptor } from '@/interceptors/response.interceptor';
import { AppModule } from './app.module';
import '@/types/express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AppExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(appConfig?.port ?? 3000);
}

void bootstrap();
