import { CacheModule, HttpModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IRedisClientOptions } from '../../domain/interfaces/config.interfaces';
import { ProductsService } from '../../domain/services/products.service';
import { EnvObjects } from '../config';
import { ProductRepository } from '../repositories/products.repository';

@Module({
  imports: [
    HttpModule,
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return configService.get<IRedisClientOptions>(EnvObjects.REDIS_CLIENT);
      },
      inject: [ConfigService],
    }),
  ],
  providers: [ProductsService, ProductRepository],
  exports: [ProductsService],
})
export class ProductsModule {}
