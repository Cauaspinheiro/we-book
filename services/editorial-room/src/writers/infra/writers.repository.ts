import { Injectable } from '@nestjs/common'
import { Prisma } from '../../../prisma/generated'
import { BaseRepository } from 'src/shared/infra/base.repository'

@Injectable()
export class WritersRepository {
  constructor(private repo: BaseRepository) {}

  async findFirst(where: Prisma.WriterWhereInput) {
    const result = await this.repo.writer.findFirst({ where })

    return result
  }

  async create(data: Prisma.WriterCreateInput) {
    const result = await this.repo.writer.create({ data })

    return result
  }
}
