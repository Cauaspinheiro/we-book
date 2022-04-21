import { Controller } from '@nestjs/common'
import { EventPattern, Payload } from '@nestjs/microservices'

import { NEW_PROFILE_PATTERN } from './constants/rmq.patterns'
import { NewProfileDTO } from './domain/new-profile.dto'
import { CreateProfile } from './use-cases/create-profile'

@Controller()
export class ProfilesEvents {
  constructor(private createProfile: CreateProfile) {}

  @EventPattern(NEW_PROFILE_PATTERN)
  async onNewProfile(@Payload() payload: NewProfileDTO) {
    await this.createProfile.run(payload)
  }
}
