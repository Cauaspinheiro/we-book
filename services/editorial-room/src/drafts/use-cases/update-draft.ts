import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Writer } from 'prisma/generated'
import { UpdateDraftDTO } from '../domain/update-draft.dto'
import { DraftsRepository } from '../infra/drafts.repository'

@Injectable()
export class UpdateDraft {
  constructor(private draftsRepository: DraftsRepository) {}

  async run(writer: Writer, draftId: string, data: UpdateDraftDTO) {
    const draft = await this.draftsRepository.findFirst({
      id: draftId,
    })

    if (!draft) {
      throw new NotFoundException('Draft not found')
    }

    if (
      !draft.contributors.find((w) => w.writer.id === writer.id) &&
      draft.creatorId !== writer.id
    ) {
      throw new ForbiddenException(
        'Cannot update a draft that you are not a writer',
      )
    }

    let urlPath = data.urlPath

    if (urlPath) {
      urlPath = urlPath.toLowerCase()

      const sameUrlPath = await this.draftsRepository.findFirst({ urlPath })

      if (sameUrlPath) {
        throw new ConflictException('Draft with this path already created')
      }
    }

    const updatedDraft = await this.draftsRepository.update(draftId, {
      ...data,
      urlPath,
    })

    return {
      ...updatedDraft,
      contributors: updatedDraft.contributors.map(({ writer }) => writer),
    }
  }
}
