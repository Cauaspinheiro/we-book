import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
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

  async run(writer: Writer, data: { addedWriterId: string; draftId: string }) {
    const addedWriter = await this.writersRepository.findFirst({
      id: data.addedWriterId,
    })

    if (!addedWriter) {
      throw new NotFoundException('Not found writer to be added')
    }

    const draft = await this.draftsRepository.findFirst({
      id: data.draftId,
      writers: { some: { writerId: writer.id } },
    })

    if (!draft) {
      throw new NotFoundException('Draft not found')
    }

    const creator = draft.writers.find((w) => w.isCreator)

    if (!creator) {
      throw new InternalServerErrorException('Not found creator to this draft')
    }

    if (creator.writer.id !== writer.id) {
      throw new ForbiddenException('Only the creator can add writers')
    }

    if (draft.writers.find((w) => w.writer.id === data.addedWriterId)) {
      throw new ConflictException('Writer already added to this draft')
    }

    const updatedDraft = await this.draftsRepository.update(data.draftId, {
      writers: { create: { writerId: data.addedWriterId } },
    })

    return {
      ...updatedDraft,
      writers: updatedDraft.writers.map(({ writer, isCreator }) => ({
        ...writer,
        isCreator,
      })),
    }
  }
}
