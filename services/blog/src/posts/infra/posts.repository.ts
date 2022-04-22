import { Injectable } from '@nestjs/common'
import { Prisma } from 'prisma/generated'
import { BaseRepository } from 'src/shared/infra/base.repository'

@Injectable()
export class PostsRepository {
  constructor(private repo: BaseRepository) {}

  async upsert(id: string, data: Prisma.PostCreateInput) {
    const result = await this.repo.post.upsert({
      where: { id },
      create: data,
      update: data,
    })

    return result
  }

  async findFirst(where: Prisma.PostWhereInput) {
    const result = await this.repo.post.findFirst({
      where,
      include: { contributors: true, publisher: true, viewers: true },
    })

    return result
  }

  async findFirstFull(where: Prisma.PostWhereInput) {
    const result = await this.repo.post.findFirst({
      where,
      include: {
        publisher: true,
        contributors: { select: { contributor: true } },
        _count: { select: { viewers: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    if (!result) return null

    return {
      ...result,
      contributors: result.contributors.map(({ contributor }) => contributor),
      viewersCount: result._count.viewers,
      _count: undefined,
    }
  }

  async findMany(where?: Prisma.PostWhereInput) {
    const result = await this.repo.post.findMany({
      where,
      include: {
        publisher: true,
        contributors: { select: { contributor: true } },
        _count: { select: { viewers: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    return result.map((v) => ({
      ...v,
      contributors: v.contributors.map(({ contributor }) => contributor),
      viewersCount: v._count.viewers,
      _count: undefined,
    }))
  }

  async findPaths() {
    const result = await this.repo.post.findMany({
      orderBy: { createdAt: 'desc' },
      select: { urlPath: true },
    })

    return result.map(({ urlPath }) => urlPath)
  }

  async update(id: string, data: Prisma.PostUpdateInput) {
    const result = await this.repo.post.update({ where: { id }, data })

    return result
  }

  async delete(id: string) {
    const result = await this.repo.post.delete({ where: { id } })

    return result
  }
}
