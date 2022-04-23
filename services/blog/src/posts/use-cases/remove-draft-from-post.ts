import { Injectable } from '@nestjs/common'
import { PostsRepository } from '../infra/posts.repository'

@Injectable()
export class RemoveDraftFromPost {
  constructor(private postsRepository: PostsRepository) {}

  async run(id: string) {
    const post = await this.postsRepository.findFirst({ id })

    if (!post) return

    await this.postsRepository.update(id, { hasDraft: false })
  }
}
