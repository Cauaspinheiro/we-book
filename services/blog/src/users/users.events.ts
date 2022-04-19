import { Controller } from '@nestjs/common'
import { EventPattern, Payload } from '@nestjs/microservices'

import { NEW_USER_PATTERN } from './constants/rmq.patterns'
import { NewUserDTO } from './domain/new-user.dto'
import { CreateUser } from './use-cases/create-user'

@Controller()
export class UsersEvents {
  constructor(private createUser: CreateUser) {}

  @EventPattern(NEW_USER_PATTERN)
  async onNewUser(@Payload() payload: NewUserDTO) {
    await this.createUser.run(payload)
  }
}
