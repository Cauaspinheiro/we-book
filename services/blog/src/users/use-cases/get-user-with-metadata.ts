import { Injectable } from '@nestjs/common'
import { UsersRepository } from '../infra/users.repository'

@Injectable()
export class GetUserWithMetadata {
  constructor(private usersRepository: UsersRepository) {}

  async run(id: string) {
    const user = await this.usersRepository.findFirstFull({ id })

    return user
  }
}
