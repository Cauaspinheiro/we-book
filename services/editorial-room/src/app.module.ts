import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SharedModule } from './shared/shared.module'
import { WritersModule } from './writers/writers.module'

@Module({
  imports: [SharedModule, WritersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
