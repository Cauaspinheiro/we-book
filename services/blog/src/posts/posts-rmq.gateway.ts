import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { PROFILE_QUEUE_KEY } from 'src/shared/queues/profile.queue'

import {
  PROFILE_NEW_POST_PATTERN,
  PROFILE_NEW_POST_VIEW_PATTERN,
} from './constants/rmq.patterns'
import { ProfileNewPostViewDTO } from './domain/profile-new-post-view.dto'
import { ProfileNewPostDTO } from './domain/profile-new-post.dto'

@Injectable()
export class PostsRMQGateway {
  constructor(@Inject(PROFILE_QUEUE_KEY) private profileQueue: ClientProxy) {}

  onNewPost(payload: ProfileNewPostDTO) {
    this.profileQueue.emit(PROFILE_NEW_POST_PATTERN, payload)
  }

  onNewPostView(payload: ProfileNewPostViewDTO) {
    this.profileQueue.emit(PROFILE_NEW_POST_VIEW_PATTERN, payload)
  }
}
