import { Module } from '@nestjs/common'
import { WritersModule } from 'src/writers/writers.module'
import { DraftsRMQGateway } from './drafts-rmq.gateway'
import { DraftsController } from './drafts.controller'
import { DraftsRepository } from './infra/drafts.repository'
import { AddWriterToDraft } from './use-cases/add-writer-to-draft'
import { CreateDraft } from './use-cases/create-draft'
import { DeleteDraft } from './use-cases/delete-draft'
import { GenerateUrlPathFromTitle } from './use-cases/generate-url-path-from-title'
import { GetDrafts } from './use-cases/get-drafts'
import { PublishDraft } from './use-cases/publish-draft'
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
    DeleteDraft,
    PublishDraft,
    DraftsRMQGateway,
    GenerateUrlPathFromTitle,
  ],
  imports: [WritersModule],
  controllers: [DraftsController],
})
export class DraftsModule {}
