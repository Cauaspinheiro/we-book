import { Injectable } from '@nestjs/common'
import { PostsRepository } from '../infra/posts.repository'

@Injectable()
export class ListPosts {
  constructor(private postsRepository: PostsRepository) {}

  async run() {
    return this.postsRepository.findMany()
  }
}
