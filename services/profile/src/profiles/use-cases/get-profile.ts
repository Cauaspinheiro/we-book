import { Injectable } from '@nestjs/common'
import { ProfilesRepository } from '../infra/profiles.repository'

@Injectable()
export class GetProfile {
  constructor(private profilesRepository: ProfilesRepository) {}

  async run(id: string) {
    const profile = await this.profilesRepository.findFirst({ id })

    return profile
  }
}
