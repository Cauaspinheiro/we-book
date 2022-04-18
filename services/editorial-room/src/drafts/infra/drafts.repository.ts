import { Injectable } from '@nestjs/common'
import { Prisma } from '../../../prisma/generated'
import { BaseRepository } from 'src/shared/infra/base.repository'

@Injectable()
export class DraftsRepository {
  constructor(private repo: BaseRepository) {}

  async findFirst(where: Prisma.DraftWhereInput) {
    const result = await this.repo.draft.findFirst({
      where,
      include: this.INCLUDE_WRITERS_TO_DRAFT,
    })

    return result
  }

  async findMany(where: Prisma.DraftWhereInput) {
    const result = await this.repo.draft.findMany({
      where,
      include: this.INCLUDE_WRITERS_TO_DRAFT,
    })

    return result
  }

  async create(data: Prisma.DraftCreateInput) {
    const result = await this.repo.draft.create({ data })

    return result
  }

  async update(id: string, data: Prisma.DraftUpdateInput) {
    const result = await this.repo.draft.update({
      where: { id },
      data,
      include: this.INCLUDE_WRITERS_TO_DRAFT,
    })

    return result
  }

  private readonly INCLUDE_WRITERS_TO_DRAFT = {
    writers: { select: { writer: true, isCreator: true } },
  }

  async delete(id: string) {
    const result = await this.repo.draft.delete({ where: { id } })

    return result
  }
}
