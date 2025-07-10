import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConfig } from '@config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(appConfig?.port ?? 3000);
}

void bootstrap();
