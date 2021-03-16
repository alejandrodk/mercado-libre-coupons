import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '../../application/controllers';
import { configuration } from '../config';
import { validate } from '../config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validate,
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
  ],
  providers: [],
  controllers: [AppController],
})
export class AppModule {}
