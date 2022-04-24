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
export class RemoveWriterFromDraft {
  constructor(
    private writersRepository: WritersRepository,
    private draftsRepository: DraftsRepository,
  ) {}

  async run(
    writer: Writer,
    data: { removedWriterId: string; draftId: string },
  ) {
    const removedWriter = await this.writersRepository.findFirst({
      id: data.removedWriterId,
    })

    if (!removedWriter) {
      throw new NotFoundException('Not found writer to be added')
    }

    const draft = await this.draftsRepository.findFirst({
      id: data.draftId,
      contributors: { some: { writerId: writer.id } },
    })

    if (!draft) {
      throw new NotFoundException('Draft not found')
    }

    const { creator } = draft

    if (creator.id !== writer.id) {
      throw new ForbiddenException('Only the creator can remove writers')
    }

    if (!draft.contributors.find((w) => w.writer.id === data.removedWriterId)) {
      throw new ConflictException('Writer not found in this draft')
    }

    const updatedDraft = await this.draftsRepository.update(data.draftId, {
      contributors: {
        deleteMany: {
          draftId: data.draftId,
          writerId: data.removedWriterId,
        },
      },
    })

    return {
      ...updatedDraft,
      contributors: updatedDraft.contributors.map(({ writer }) => writer),
    }
  }
}
