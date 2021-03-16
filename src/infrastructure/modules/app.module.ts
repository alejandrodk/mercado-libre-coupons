import { Module } from '@nestjs/common';
import { AppController } from '../../application/controllers';

@Module({
  imports: [],
  providers: [],
  controllers: [AppController],
})
export class AppModule {}
