import { Injectable } from '@nestjs/common'

import { UsersRepository } from '../infra/users.repository'
import { NewUserPayload } from '../interfaces/rmq.payloads'

@Injectable()
export class CreateUser {
  constructor(private usersRepository: UsersRepository) {}

  async run(data: NewUserPayload) {
    await this.usersRepository.create({
      createdAt: new Date(data.timeJoined),
      email: data.email,
      id: data.id,
    })
  }
}
