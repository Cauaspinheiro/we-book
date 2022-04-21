import { Module } from '@nestjs/common'
import { UsersModule } from 'src/users/users.module'
import { PostsRepository } from './infra/posts.repository'
import { PostsController } from './posts.controller'
import { PostsEvents } from './posts.events'
import { CreatePost } from './use-cases/create-post'
import { GetPostBySlug } from './use-cases/get-post-by-slug'
import { GetPostPaths } from './use-cases/get-post-paths'
import { ListPosts } from './use-cases/list-posts'
import { ViewPost } from './use-cases/view-post'

@Module({
  providers: [
    PostsRepository,
    CreatePost,
    ListPosts,
    ViewPost,
    GetPostPaths,
    GetPostBySlug,
  ],
  controllers: [PostsEvents, PostsController],
  imports: [UsersModule],
})
export class PostsModule {}
