import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { GET_PROFILE_PATTERN } from './constants/rmq.patterns'
import {
  GetProfileMessageDTO,
  GetProfileMessageReturnDTO,
} from './domain/get-profile-message.dto'
import { GetProfile } from './use-cases/get-profile'

@Controller()
export class ProfilesMessages {
  constructor(private getProfile: GetProfile) {}

  @MessagePattern(GET_PROFILE_PATTERN)
  async find(
    @Payload() { id }: GetProfileMessageDTO,
  ): Promise<GetProfileMessageReturnDTO | null> {
    const profile = await this.getProfile.run(id)

    if (!profile) return null

    return {
      createdAt: profile.createdAt.toISOString(),
      name: profile.name,
      email: profile.email,
      id: profile.id,
    }
  }
}
