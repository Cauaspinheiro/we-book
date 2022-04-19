import { Module } from '@nestjs/common'
import { PostsModule } from './posts/posts.module'
import { SharedModule } from './shared/shared.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [SharedModule, UsersModule, PostsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
