import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Writer } from 'prisma/generated'
import { WritersRepository } from 'src/writers/infra/writers.repository'
import { DraftsRepository } from '../infra/drafts.repository'

@Injectable()
export class AddWriterToDraft {
  constructor(
    private draftsRepository: DraftsRepository,
    private writersRepository: WritersRepository,
  ) {}

  async run(
    writer: Writer,
    data: { addedWriterEmail: string; draftId: string },
  ) {
    const addedWriter = await this.writersRepository.findFirst({
      email: data.addedWriterEmail,
    })

    if (!addedWriter) {
      throw new NotFoundException('Not found writer to be added')
    }

    const draft = await this.draftsRepository.findFirst({
      id: data.draftId,
    })

    if (!draft) {
      throw new NotFoundException('Draft not found')
    }

    const { creator } = draft

    if (creator.id !== writer.id) {
      throw new ForbiddenException('Only the creator can add writers')
    }

    if (
      draft.contributors.find((w) => w.writer.id === addedWriter.id) ||
      draft.creatorId === addedWriter.id
    ) {
      throw new ConflictException('Writer already added to this draft')
    }

    const updatedDraft = await this.draftsRepository.update(data.draftId, {
      contributors: { create: { writerId: addedWriter.id } },
    })

    return {
      ...updatedDraft,
      contributors: updatedDraft.contributors.map(({ writer }) => writer),
    }
  }
}
