import { Module } from '@nestjs/common'
import { UsersModule } from 'src/users/users.module'
import { PostsRepository } from './infra/posts.repository'
import { PostsController } from './posts.controller'
import { PostsEvents } from './posts.events'
import { CreatePost } from './use-cases/create-post'
import { DeletePost } from './use-cases/delete-post'
import { GeneratePostUrlPath } from './use-cases/generate-post-url-path'
import { GetPostBySlug } from './use-cases/get-post-by-slug'
import { GetPostPaths } from './use-cases/get-post-paths'
import { GetUserPosts } from './use-cases/get-user-posts'
import { ListPosts } from './use-cases/list-posts'
import { RemoveDraftFromPost } from './use-cases/remove-draft-from-post'
import { ViewPost } from './use-cases/view-post'

@Module({
  providers: [
    PostsRepository,
    CreatePost,
    ListPosts,
    ViewPost,
    GetPostPaths,
    GetPostBySlug,
    GetUserPosts,
    DeletePost,
    RemoveDraftFromPost,
    GeneratePostUrlPath,
  ],
  controllers: [PostsEvents, PostsController],
  imports: [UsersModule],
})
export class PostsModule {}
