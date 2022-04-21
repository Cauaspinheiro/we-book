import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { PROFILE_QUEUE_KEY } from 'src/shared/queues/profile.queue'
import { User as SupertokensUser } from 'supertokens-node/recipe/emailpassword'

import { PROFILE_NEW_PROFILE_PATTERN } from './constants/rmq.patterns'

@Injectable()
export class AuthRMQGateway {
  constructor(@Inject(PROFILE_QUEUE_KEY) private profileQueue: ClientProxy) {}

  onSignup(payload: SupertokensUser) {
    this.profileQueue.emit(PROFILE_NEW_PROFILE_PATTERN, payload)
  }
}
