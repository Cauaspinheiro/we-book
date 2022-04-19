import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { User } from 'prisma/generated'
import { PostsRepository } from '../infra/posts.repository'

@Injectable()
export class ViewPost {
  constructor(private postsRepository: PostsRepository) {}

  async run(user: User, postId: string) {
    const post = await this.postsRepository.findFirst({ id: postId })

    if (!post) {
      throw new NotFoundException('Post not found')
    }

    const isContributor = post.contributors.some(
      (v) => v.contributorId === user.id,
    )

    const isPublisher = post.publisher.id === user.id

    if (isContributor || isPublisher) {
      throw new ConflictException('Only outside users can view')
    }

    if (post.viewers.some((v) => v.viewerId === user.id)) {
      throw new ConflictException('Already viewed this post')
    }

    await this.postsRepository.update(postId, {
      viewers: { create: { viewerId: user.id } },
    })
  }
}
