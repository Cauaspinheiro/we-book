import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Writer } from 'prisma/generated'
import { PublishDraftDTO } from '../domain/publish-draft.dto'
import { DraftsRMQGateway } from '../drafts-rmq.gateway'
import { DraftsRepository } from '../infra/drafts.repository'

@Injectable()
export class PublishDraft {
  constructor(
    private draftsRepository: DraftsRepository,
    private draftsRMQGateway: DraftsRMQGateway,
  ) {}

  async run(writer: Writer, draftId: string) {
    const draft = await this.draftsRepository.findFirst({ id: draftId })

    if (!draft) {
      throw new NotFoundException('Draft not found')
    }

    if (draft.creator.id !== writer.id) {
      throw new ForbiddenException(
        'Cannot published a draft that you are not the creator',
      )
    }

    if (!draft.description) {
      throw new BadRequestException('Missing draft description')
    }

    const payload: PublishDraftDTO = {
      content: draft.content,
      id: draft.id,
      publisherId: draft.creator.id,
      description: draft.description,
      title: draft.title,
      urlPath: draft.urlPath,
      contributorsIds: this.getContributorsFromDraft(draft.contributors),
    }

    const { urlPath } = await this.draftsRMQGateway.onDraftPublished(payload)

    await this.draftsRepository.update(draft.id, { urlPath })

    return urlPath
  }

  private getContributorsFromDraft(writers: Array<{ writer: Writer }>) {
    return writers.map(({ writer: { id } }) => id)
  }
}
