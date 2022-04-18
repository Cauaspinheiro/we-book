import { Module } from '@nestjs/common'
import { WritersModule } from 'src/writers/writers.module'
import { DraftsController } from './drafts.controller'
import { DraftsRepository } from './infra/drafts.repository'
import { AddPublisherToDraft } from './use-cases/add-writers-to-draft'
import { CreateDraft } from './use-cases/create-draft'
import { GetDrafts } from './use-cases/get-drafts'

@Module({
  providers: [DraftsRepository, CreateDraft, AddPublisherToDraft, GetDrafts],
  imports: [WritersModule],
  controllers: [DraftsController],
})
export class DraftsModule {}
