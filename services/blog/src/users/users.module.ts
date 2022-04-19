import { Module } from '@nestjs/common'
import { SessionGuard } from './infra/guards/session.guard'
import { UsersRepository } from './infra/users.repository'
import { CreateUser } from './use-cases/create-user'
import { GetUser } from './use-cases/get-user'
import { GetUserWithMetadata } from './use-cases/get-user-with-metadata'
import { ValidateSession } from './use-cases/validate-session'
import { UsersController } from './users.controller'
import { UsersEvents } from './users.events'

@Module({
  controllers: [UsersEvents, UsersController],
  providers: [
    UsersRepository,
    CreateUser,
    ValidateSession,
    GetUser,
    SessionGuard,
    GetUserWithMetadata,
  ],
  exports: [ValidateSession, GetUser, SessionGuard],
})
export class UsersModule {}
