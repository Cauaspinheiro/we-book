import {
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common'
import { User } from 'prisma/generated'
import { UseUser } from 'src/users/infra/decorators/user.decorator'
import { SessionGuard } from 'src/users/infra/guards/session.guard'
import { UserGuard } from 'src/users/infra/guards/user.guard'
import { ListPosts } from './use-cases/list-posts'
import { ViewPost } from './use-cases/view-post'

@Controller('posts')
export class PostsController {
  constructor(private listPosts: ListPosts, private viewPost: ViewPost) {}

  @Get()
  async index() {
    return await this.listPosts.run()
  }

  @Post('/:id/view')
  @UseGuards(SessionGuard, UserGuard)
  @HttpCode(204)
  async update(@Param('id') id: string, @UseUser() user: User) {
    await this.viewPost.run(user, id)
  }
}
