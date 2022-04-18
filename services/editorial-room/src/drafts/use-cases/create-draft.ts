import { Injectable } from '@nestjs/common'

import { Writer } from 'prisma/generated'
import { CreateDraftDTO } from '../domain/create-draft.dto'
import { DraftsRepository } from '../infra/drafts.repository'

@Injectable()
export class CreateDraft {
  constructor(private draftsRepository: DraftsRepository) {}

  async run(createDraftDTO: CreateDraftDTO, writer: Writer) {
    const result = await this.draftsRepository.create({
      content: createDraftDTO.content,
      writers: {
        create: { writer: { connect: { id: writer.id } }, isCreator: true },
      },
    })

    return result
  }
}
