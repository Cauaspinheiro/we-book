import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { EDITORIAL_ROOM_QUEUE_KEY } from 'src/shared/queues/editorial-room.queue'
import { User as SupertokensUser } from 'supertokens-node/recipe/emailpassword'

import { EDITORIAL_ROOM_NEW_WRITER_PATTERN } from './constants/rmq.patterns'

@Injectable()
export class AuthRMQGateway {
  constructor(
    @Inject(EDITORIAL_ROOM_QUEUE_KEY) private editorialRoomQueue: ClientProxy,
  ) {}

  onSignup(payload: SupertokensUser) {
    this.editorialRoomQueue.emit(EDITORIAL_ROOM_NEW_WRITER_PATTERN, payload)
  }
}
