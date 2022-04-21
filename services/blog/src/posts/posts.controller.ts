import {
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common'
import { User } from 'prisma/generated'
import { ApiSecretGuard } from 'src/shared/infra/guards/api-secret.guard'
import { UseUser } from 'src/users/infra/decorators/user.decorator'
import { SessionGuard } from 'src/users/infra/guards/session.guard'
import { UserGuard } from 'src/users/infra/guards/user.guard'
import { GetPostBySlug } from './use-cases/get-post-by-slug'
import { GetPostPaths } from './use-cases/get-post-paths'
import { ListPosts } from './use-cases/list-posts'
import { ViewPost } from './use-cases/view-post'

@Controller('posts')
export class PostsController {
  constructor(
    private listPosts: ListPosts,
    private viewPost: ViewPost,
    private getPostPaths: GetPostPaths,
    private getPostBySlug: GetPostBySlug,
  ) {}

  @Get()
  async index() {
    return await this.listPosts.run()
  }

  @Get('/paths')
  @UseGuards(ApiSecretGuard)
  async pathIndex() {
    return await this.getPostPaths.run()
  }

  @Get('/:slug')
  async find(@Param('slug') slug: string) {
    return await this.getPostBySlug.run(slug)
  }

  @Post('/:id/view')
  @UseGuards(SessionGuard, UserGuard)
  @HttpCode(204)
  async update(@Param('id') id: string, @UseUser() user: User) {
    await this.viewPost.run(user, id)
  }
}
