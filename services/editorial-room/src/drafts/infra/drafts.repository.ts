import { Injectable } from '@nestjs/common'
import { Prisma } from '../../../prisma/generated'
import { BaseRepository } from 'src/shared/infra/base.repository'

@Injectable()
export class DraftsRepository {
  constructor(private repo: BaseRepository) {}

  async findFirst(where: Prisma.WriterWhereInput) {
    const result = await this.repo.draft.findFirst({ where })

    return result
  }

  async create(data: Prisma.DraftCreateInput) {
    const result = await this.repo.draft.create({ data })

    return result
  }
}
