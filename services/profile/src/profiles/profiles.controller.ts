import { Controller, Get, UseGuards } from '@nestjs/common'
import { Profile } from 'prisma/generated'
import { UseProfile } from './infra/decorators/profile.decorator'
import { SessionGuard } from './infra/guards/session.guard'
import { ProfileGuard } from './infra/guards/profile.guard'

@Controller('profile')
export class ProfilesController {
  @Get('me')
  @UseGuards(SessionGuard, ProfileGuard)
  async find(@UseProfile() profile: Profile) {
    return profile
  }
}
