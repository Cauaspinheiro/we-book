import { Module } from '@nestjs/common'
import { WritersModule } from 'src/writers/writers.module'
import { DraftsController } from './drafts.controller'
import { DraftsRepository } from './infra/drafts.repository'
import { CreateDraft } from './use-cases/create-draft'

@Module({
  providers: [DraftsRepository, CreateDraft],
  imports: [WritersModule],
  controllers: [DraftsController],
})
export class DraftsModule {}
