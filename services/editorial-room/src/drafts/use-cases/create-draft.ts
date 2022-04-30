import { ConflictException, Injectable } from '@nestjs/common'

import { Writer } from 'prisma/generated'
import { CreateDraftDTO } from '../domain/create-draft.dto'
import { DraftsRepository } from '../infra/drafts.repository'

@Injectable()
export class CreateDraft {
  constructor(private draftsRepository: DraftsRepository) {}

  async run(createDraftDTO: CreateDraftDTO, writer: Writer) {
    let urlPath = createDraftDTO.urlPath

    if (urlPath) {
      urlPath = urlPath.toLowerCase()

      const sameUrlPath = await this.draftsRepository.findFirst({ urlPath })

      if (sameUrlPath) {
        throw new ConflictException('Draft with this path already created')
      }
    }

    const result = await this.draftsRepository.create({
      content: createDraftDTO.content,
      title: createDraftDTO.title,
      description: createDraftDTO.description,
      urlPath,
      creator: { connect: { id: writer.id } },
    })

    return result
  }
}
