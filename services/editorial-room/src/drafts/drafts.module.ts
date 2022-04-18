import { Module } from '@nestjs/common'
import { WritersModule } from 'src/writers/writers.module'
import { DraftsController } from './drafts.controller'
import { DraftsRepository } from './infra/drafts.repository'
import { AddWriterToDraft } from './use-cases/add-writer-to-draft'
import { CreateDraft } from './use-cases/create-draft'
import { GetDrafts } from './use-cases/get-drafts'
import { RemoveWriterFromDraft } from './use-cases/remove-writer-from-draft'
import { UpdateDraft } from './use-cases/update-draft'

@Module({
  providers: [
    DraftsRepository,
    CreateDraft,
    AddWriterToDraft,
    GetDrafts,
    RemoveWriterFromDraft,
    UpdateDraft,
  ],
  imports: [WritersModule],
  controllers: [DraftsController],
})
export class DraftsModule {}
