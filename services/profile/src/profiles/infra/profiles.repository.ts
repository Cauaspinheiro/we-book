import { Injectable } from '@nestjs/common'
import { Prisma } from 'prisma/generated'
import { BaseRepository } from 'src/shared/infra/base.repository'

@Injectable()
export class ProfilesRepository {
  constructor(private repo: BaseRepository) {}

  async create(data: Prisma.ProfileCreateInput) {
    const result = await this.repo.profile.create({ data })

    return result
  }

  async findFirst(where: Prisma.ProfileWhereInput) {
    const result = await this.repo.profile.findFirst({ where })

    return result
  }

  updateQuery(id: string, data: Prisma.ProfileUpdateInput) {
    return this.repo.profile.update({ where: { id }, data })
  }

  updateManyQuery(
    where: Prisma.ProfileWhereInput,
    data: Prisma.ProfileUpdateInput,
  ) {
    return this.repo.profile.updateMany({ where, data })
  }
}
