import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import morgan from 'morgan';
import helmet from 'helmet';
import { AppModule } from './infrastructure/modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('dev'));
  app.use(helmet());
  app.enableCors();

  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT');

  await app.listen(PORT || 3000, () => Logger.log('HTTP Service is listening', 'App'));
}
bootstrap();
