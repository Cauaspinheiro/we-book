import { Module } from '@nestjs/common'
import { UsersModule } from 'src/users/users.module'
import { PostsRepository } from './infra/posts.repository'
import { PostsController } from './posts.controller'
import { PostsEvents } from './posts.events'
import { CreatePost } from './use-cases/create-post'
import { ListPosts } from './use-cases/list-posts'
import { ViewPost } from './use-cases/view-post'

@Module({
  providers: [PostsRepository, CreatePost, ListPosts, ViewPost],
  controllers: [PostsEvents, PostsController],
  imports: [UsersModule],
})
export class PostsModule {}
