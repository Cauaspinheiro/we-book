import { Module } from '@nestjs/common'
import { PostsRepository } from './infra/posts.repository'
import { PostsEvents } from './posts.events'
import { CreatePost } from './use-cases/create-post'

@Module({
  providers: [PostsRepository, CreatePost],
  controllers: [PostsEvents],
})
export class PostsModule {}
