import { Module } from '@nestjs/common'
import { DraftsModule } from './drafts/drafts.module'
import { SharedModule } from './shared/shared.module'
import { WritersModule } from './writers/writers.module'

@Module({
  imports: [SharedModule, WritersModule, DraftsModule],
})
export class AppModule {}
