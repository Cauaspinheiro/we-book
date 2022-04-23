import { Controller } from '@nestjs/common'
import { EventPattern, Payload } from '@nestjs/microservices'
import {
  DRAFT_DELETED_PATTERN,
  NEW_POST_PATTERN,
} from './constants/rmq.patterns'
import { CreatePostDTO } from './domain/create-post.dto'
import { OnDraftDeletedDTO } from './domain/on-draft-deleted.dto'
import { CreatePost } from './use-cases/create-post'
import { RemoveDraftFromPost } from './use-cases/remove-draft-from-post'

@Controller()
export class PostsEvents {
  constructor(
    private createPost: CreatePost,
    private removeDraftFromPost: RemoveDraftFromPost,
  ) {}

  @EventPattern(NEW_POST_PATTERN)
  async onPostPublished(@Payload() data: CreatePostDTO) {
    await this.createPost.run(data)
  }

  @EventPattern(DRAFT_DELETED_PATTERN)
  async onDraftDeleted(@Payload() data: OnDraftDeletedDTO) {
    await this.removeDraftFromPost.run(data.id)
  }
}
