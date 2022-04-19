import { Controller, Get } from '@nestjs/common'
import { ListPosts } from './use-cases/list-posts'

@Controller('posts')
export class PostsController {
  constructor(private listPosts: ListPosts) {}

  @Get()
  async index() {
    return await this.listPosts.run()
  }
}
