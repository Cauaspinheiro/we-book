import { Injectable, NotFoundException } from '@nestjs/common'
import { PostsRepository } from '../infra/posts.repository'

@Injectable()
export class GetPostBySlug {
  constructor(private postsRepository: PostsRepository) {}

  async run(slug: string) {
    const post = await this.postsRepository.findFirstFull({ urlPath: slug })

    if (!post) throw new NotFoundException('Post not found')

    return post
  }
}
