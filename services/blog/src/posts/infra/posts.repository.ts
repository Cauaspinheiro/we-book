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

  async findMany() {
    const result = await this.repo.post.findMany({
      include: {
        publisher: true,
        contributors: { select: { contributor: true } },
      },
    })

    return result.map((v) => ({
      ...v,
      contributors: v.contributors.map(({ contributor }) => contributor),
    }))
  }
}
