import { Injectable } from '@nestjs/common'

import { NewUserDTO } from '../domain/new-user.dto'
import { UsersRepository } from '../infra/users.repository'

@Injectable()
export class CreateUser {
  constructor(private usersRepository: UsersRepository) {}

  async run(data: NewUserDTO) {
    return await this.usersRepository.create({
      createdAt: new Date(data.createdAt),
      email: data.email,
      id: data.id,
      name: data.name,
    })
  }
}
