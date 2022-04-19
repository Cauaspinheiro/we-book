import { Injectable } from '@nestjs/common'
import { UsersRepository } from '../infra/users.repository'

@Injectable()
export class GetUser {
  constructor(private usersRepository: UsersRepository) {}

  async run(id: string) {
    const user = await this.usersRepository.findFirst({ id })

    return user
  }
}
