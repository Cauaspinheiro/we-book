import { Injectable } from '@nestjs/common'
import { UsersRMQGateway } from '../users-rmq.gateway'
import { CreateUser } from './create-user'

@Injectable()
export class RecoverProfile {
  constructor(
    private usersRMQGateway: UsersRMQGateway,
    private createUser: CreateUser,
  ) {}

  async run(id: string) {
    const profile = await this.usersRMQGateway.recoverProfile(id)

    if (!profile) return null

    const writer = await this.createUser.run(profile)

    return writer
  }
}
