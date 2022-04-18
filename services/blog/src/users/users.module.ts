import { Module } from '@nestjs/common'
import { UsersRepository } from './infra/users.repository'
import { CreateUser } from './use-cases/create-user'
import { UsersEvents } from './users.events'

@Module({
  controllers: [UsersEvents],
  providers: [UsersRepository, CreateUser],
})
export class UsersModule {}
