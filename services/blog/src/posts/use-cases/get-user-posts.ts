import { Injectable } from '@nestjs/common'
import { User } from 'prisma/generated'
import { PostsRepository } from '../infra/posts.repository'

@Injectable()
export class GetUserPosts {
  constructor(private postsRepository: PostsRepository) {}

  async run(user: User) {
    const posts = await this.postsRepository.findMany({
      OR: [
        { publisherId: user.id },
        { contributors: { some: { contributorId: user.id } } },
      ],
    })

    return posts.map((v) => ({
      ...v,
      isPublisher: v.publisherId === user.id,
      publisherId: undefined,
    }))
  }
}
