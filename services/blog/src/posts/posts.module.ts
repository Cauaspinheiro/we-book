import { Module } from '@nestjs/common'
import { PostsRepository } from './infra/posts.repository'
import { PostsController } from './posts.controller'
import { PostsEvents } from './posts.events'
import { CreatePost } from './use-cases/create-post'
import { ListPosts } from './use-cases/list-posts'

@Module({
  providers: [PostsRepository, CreatePost, ListPosts],
  controllers: [PostsEvents, PostsController],
})
export class PostsModule {}
