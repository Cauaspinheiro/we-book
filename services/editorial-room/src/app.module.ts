import { Module } from '@nestjs/common'
import { SharedModule } from './shared/shared.module'
import { WritersModule } from './writers/writers.module'

@Module({
  imports: [SharedModule, WritersModule],
})
export class AppModule {}
