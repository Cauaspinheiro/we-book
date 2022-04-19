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
}
