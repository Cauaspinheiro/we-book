import { Module } from '@nestjs/common'
import { SessionGuard } from './infra/guards/session.guard'
import { UsersRepository } from './infra/users.repository'
import { CreateUser } from './use-cases/create-user'
import { GetUser } from './use-cases/get-user'
import { ValidateSession } from './use-cases/validate-session'
import { UsersEvents } from './users.events'

@Module({
  controllers: [UsersEvents],
  providers: [
    UsersRepository,
    CreateUser,
    ValidateSession,
    GetUser,
    SessionGuard,
  ],
  exports: [ValidateSession, GetUser, SessionGuard],
})
export class UsersModule {}
