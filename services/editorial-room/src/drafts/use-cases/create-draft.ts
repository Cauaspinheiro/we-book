import { Injectable } from '@nestjs/common'

import { Writer } from 'prisma/generated'
import { DraftsRepository } from '../infra/drafts.repository'

@Injectable()
export class CreateDraft {
  constructor(private draftsRepository: DraftsRepository) {}

  async run(content: string, writer: Writer) {
    const result = await this.draftsRepository.create({
      content,
      writers: { create: { writer: { connect: { id: writer.id } } } },
    })

    return result
  }
}
