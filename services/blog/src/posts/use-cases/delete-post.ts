import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { User } from 'prisma/generated'
import { PostsRepository } from '../infra/posts.repository'

@Injectable()
export class DeletePost {
  constructor(private postsRepository: PostsRepository) {}

  async run(user: User, id: string) {
    const post = await this.postsRepository.findFirst({ id })

    if (!post) throw new NotFoundException('Post not found')

    if (post.publisherId !== user.id) {
      throw new ForbiddenException('Only the publisher can delete the post')
    }

    await this.postsRepository.delete(id)
  }
}
