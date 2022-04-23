import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Writer } from 'prisma/generated'
import { DraftsRMQGateway } from '../drafts-rmq.gateway'
import { DraftsRepository } from '../infra/drafts.repository'

@Injectable()
export class DeleteDraft {
  constructor(
    private draftsRepository: DraftsRepository,
    private draftsRMQGateway: DraftsRMQGateway,
  ) {}

  async run(writer: Writer, draftId: string) {
    const draft = await this.draftsRepository.findFirst({
      id: draftId,
    })

    if (!draft) {
      throw new NotFoundException('Draft not found')
    }

    if (!draft.writers.find((w) => w.writer.id === writer.id && w.isCreator)) {
      throw new ForbiddenException(
        'Cannot delete a draft that you are not the creator',
      )
    }

    await this.draftsRepository.delete(draftId)

    await this.draftsRMQGateway.onDraftDeleted(draftId)
  }
}
