import { Injectable } from '@nestjs/common'
import { Prisma } from 'prisma/generated'
import { BaseRepository } from 'src/shared/infra/base.repository'

@Injectable()
export class PostsRepository {
  constructor(private repo: BaseRepository) {}

  async create(data: Prisma.PostCreateInput) {
    const result = await this.repo.post.create({ data })

    return result
  }

  async findFirst(where: Prisma.PostWhereInput) {
    const result = await this.repo.post.findFirst({
      where,
      include: { contributors: true, publisher: true, viewers: true },
    })

    return result
  }

  async findMany() {
    const result = await this.repo.post.findMany({
      include: {
        publisher: true,
        contributors: { select: { contributor: true } },
        _count: { select: { viewers: true } },
      },
    })

    return result.map((v) => ({
      ...v,
      contributors: v.contributors.map(({ contributor }) => contributor),
      viewersCount: v._count.viewers,
      _count: undefined,
    }))
  }

  async update(id: string, data: Prisma.PostUpdateInput) {
    const result = await this.repo.post.update({ where: { id }, data })

    return result
  }
}
