import { Injectable } from '@nestjs/common'

import { NewProfileDTO } from '../domain/new-profile.dto'
import { ProfilesRepository } from '../infra/profiles.repository'
import { ProfilesRMQGateway } from '../profiles-rmq.gateway'

@Injectable()
export class CreateProfile {
  constructor(
    private profilesRepository: ProfilesRepository,
    private profilesRMQGateway: ProfilesRMQGateway,
  ) {}

  async run(data: NewProfileDTO) {
    const profile = await this.profilesRepository.create({
      createdAt: new Date(data.timeJoined),
      email: data.email,
      id: data.id,
      name: data.email,
    })

    await this.profilesRMQGateway.onNewProfile(profile)
  }
}
