import { Controller } from '@nestjs/common'
import { EventPattern, Payload } from '@nestjs/microservices'

import {
  NEW_POST_PATTERN,
  NEW_POST_VIEW_PATTERN,
  NEW_PROFILE_PATTERN,
} from './constants/rmq.patterns'
import { NewPostViewDTO } from './domain/new-post-view.dto'
import { NewPostDTO } from './domain/new-post.dto'
import { NewProfileDTO } from './domain/new-profile.dto'
import { AddNewPostCount } from './use-cases/add-new-post-count'
import { AddNewPostViewCount } from './use-cases/add-new-post-view-count'
import { CreateProfile } from './use-cases/create-profile'

@Controller()
export class ProfilesEvents {
  constructor(
    private createProfile: CreateProfile,
    private addNewPostCount: AddNewPostCount,
    private addNewPostViewCount: AddNewPostViewCount,
  ) {}

  @EventPattern(NEW_PROFILE_PATTERN)
  async onNewProfile(@Payload() payload: NewProfileDTO) {
    await this.createProfile.run(payload)
  }

  @EventPattern(NEW_POST_PATTERN)
  async onNewPost(@Payload() payload: NewPostDTO) {
    await this.addNewPostCount.run(payload)
  }

  @EventPattern(NEW_POST_VIEW_PATTERN)
  async onNewPostView(@Payload() payload: NewPostViewDTO) {
    await this.addNewPostViewCount.run(payload)
  }
}
