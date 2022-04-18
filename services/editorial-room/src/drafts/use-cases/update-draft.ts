import {
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

    if (!draft.writers.find((w) => w.writer.id === writer.id)) {
      throw new ForbiddenException(
        'Cannot update a draft that you are not a writer',
      )
    }

    const updatedDraft = await this.draftsRepository.update(draftId, data)

    return {
      ...updatedDraft,
      writers: updatedDraft.writers.map(({ writer, isCreator }) => ({
        ...writer,
        isCreator,
      })),
    }
  }
}
