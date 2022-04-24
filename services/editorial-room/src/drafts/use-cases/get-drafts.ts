import { Injectable } from '@nestjs/common'
import { Writer } from 'prisma/generated'
import { DraftsRepository } from '../infra/drafts.repository'

@Injectable()
export class GetDrafts {
  constructor(private draftsRepository: DraftsRepository) {}

  async run(writer: Writer) {
    const drafts = await this.draftsRepository.findMany({
      OR: [
        { creatorId: writer.id },
        {
          contributors: { some: { writerId: writer.id } },
        },
      ],
    })

    return drafts.map((draft) => ({
      ...draft,
      contributors: draft.contributors.map(({ writer }) => writer),
    }))
  }
}
