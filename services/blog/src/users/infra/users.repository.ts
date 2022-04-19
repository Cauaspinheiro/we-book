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

  async findFirst(where: Prisma.UserWhereInput) {
    const result = await this.repo.user.findFirst({ where })

    return result
  }

  async findFirstFull(where: Prisma.UserWhereInput) {
    const result = await this.repo.user.findFirst({
      where,
      include: {
        contributions: { select: { post: true } },
        publications: true,
        views: { select: { post: true } },
      },
    })

    if (!result) return result

    return {
      ...result,
      views: result.views.map(({ post }) => post),
      contributions: result.contributions.map(({ post }) => post),
    }
  }
}
