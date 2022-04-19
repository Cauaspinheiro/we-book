import { Controller } from '@nestjs/common'
import { EventPattern, Payload } from '@nestjs/microservices'
import { NEW_POST_PATTERN } from './constants/rmq.patterns'
import { CreatePostDTO } from './domain/create-post.dto'
import { CreatePost } from './use-cases/create-post'

@Controller()
export class PostsEvents {
  constructor(private createPost: CreatePost) {}

  @EventPattern(NEW_POST_PATTERN)
  async onPostPublished(@Payload() data: CreatePostDTO) {
    await this.createPost.run(data)
  }
}
