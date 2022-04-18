import { Injectable } from '@nestjs/common'
import { Prisma } from 'prisma/generated'
import { BaseRepository } from 'src/shared/infra/base.repository'

@Injectable()
export class UsersRepository {
  constructor(private repo: BaseRepository) {}

  async create(data: Prisma.UserCreateInput) {
    const result = await this.repo.user.create({ data })

    return result
  }
}
