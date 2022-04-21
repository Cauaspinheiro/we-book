import { Injectable } from '@nestjs/common'
import { PostsRepository } from '../infra/posts.repository'

@Injectable()
export class GetPostPaths {
  constructor(private postsRepository: PostsRepository) {}

  async run() {
    return await this.postsRepository.findPaths()
  }
}
