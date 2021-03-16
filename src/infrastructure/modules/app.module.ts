import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '../../application/controllers';
import { configuration } from '../config';
import { validate } from '../config/env.validation';
import { CouponsModule } from './coupons.module';
import { ProductsModule } from './products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validate,
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    CouponsModule,
    ProductsModule,
  ],
  providers: [],
  controllers: [AppController],
})
export class AppModule {}
