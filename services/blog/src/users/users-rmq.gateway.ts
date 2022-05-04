import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import { PROFILE_QUEUE_KEY } from 'src/shared/queues/profile.queue'
import { PROFILE_GET_PROFILE_PATTERN } from './constants/rmq.patterns'
import {
  RecoverProfileMessageDTO,
  RecoverProfileMessageReturnDTO,
} from './domain/recover-profile-message.dto'

@Injectable()
export class UsersRMQGateway {
  constructor(@Inject(PROFILE_QUEUE_KEY) private profileQueue: ClientProxy) {}

  async recoverProfile(id: string) {
    const payload: RecoverProfileMessageDTO = { id }

    const profile: RecoverProfileMessageReturnDTO | null = await firstValueFrom(
      this.profileQueue.send(PROFILE_GET_PROFILE_PATTERN, payload),
    )

    return profile
  }
}
