import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Writer } from 'prisma/generated'
import { DraftsRepository } from '../infra/drafts.repository'

@Injectable()
export class FindDraft {
  constructor(private draftsRepository: DraftsRepository) {}

  async run(writer: Writer, id: string) {
    const draft = await this.draftsRepository.findFirst({ id })

    if (!draft) throw new NotFoundException('Draft not found')

    const isCreator = draft.creatorId === writer.id

    const isContributor = draft.contributors.find(
      ({ writer: contributor }) => writer.id === contributor.id,
    )

    if (!isContributor && !isCreator) {
      throw new ForbiddenException('Not able to get this draft')
    }

    return draft
  }
}
