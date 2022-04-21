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
import { GenerateUrlPathFromTitle } from './generate-url-path-from-title'

@Injectable()
export class PublishDraft {
  constructor(
    private draftsRepository: DraftsRepository,
    private draftsRMQGateway: DraftsRMQGateway,
    private generateUrlPathFromTitle: GenerateUrlPathFromTitle,
  ) {}

  async run(writer: Writer, draftId: string) {
    const draft = await this.draftsRepository.findFirst({ id: draftId })

    if (!draft) {
      throw new NotFoundException('Draft not found')
    }

    if (!draft.writers.find((w) => w.writer.id === writer.id && w.isCreator)) {
      throw new ForbiddenException(
        'Cannot published a draft that you are not the creator',
      )
    }

    if (!draft.description || !draft.ogCover) {
      throw new BadRequestException('Missing draft information')
    }

    const payload: PublishDraftDTO = {
      content: draft.content,
      id: draft.id,
      publisherId: writer.id,
      description: draft.description,
      ogCover: draft.ogCover,
      title: draft.title,
      urlPath:
        draft.urlPath || (await this.generateUrlPathFromTitle.run(draft)),
      contributorsIds: this.getContributorsFromDraft(draft.writers),
    }

    this.draftsRMQGateway.onDraftPublished(payload)
  }

  private getContributorsFromDraft(
    writers: Array<{ writer: Writer; isCreator: boolean }>,
  ) {
    return writers
      .filter(({ isCreator }) => !isCreator)
      .map(({ writer: { id } }) => id)
  }
}
