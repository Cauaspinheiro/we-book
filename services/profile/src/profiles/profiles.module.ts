import { Module } from '@nestjs/common'
import { SessionGuard } from './infra/guards/session.guard'
import { ProfilesRepository } from './infra/profiles.repository'
import { CreateProfile } from './use-cases/create-profile'
import { GetProfile } from './use-cases/get-profile'
import { ValidateSession } from './use-cases/validate-session'
import { ProfilesController } from './profiles.controller'
import { ProfilesEvents } from './profiles.events'
import { ProfilesRMQGateway } from './profiles-rmq.gateway'

@Module({
  controllers: [ProfilesEvents, ProfilesController],
  providers: [
    ProfilesRepository,
    CreateProfile,
    ValidateSession,
    GetProfile,
    SessionGuard,
    ProfilesRMQGateway,
  ],
  exports: [ValidateSession, GetProfile, SessionGuard],
})
export class ProfilesModule {}
