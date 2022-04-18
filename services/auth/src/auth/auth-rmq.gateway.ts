import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { BLOG_QUEUE_KEY } from 'src/shared/queues/blog.queue'
import { EDITORIAL_ROOM_QUEUE_KEY } from 'src/shared/queues/editorial-room.queue'
import { User as SupertokensUser } from 'supertokens-node/recipe/emailpassword'

import {
  BLOG_NEW_USER_PATTERN,
  EDITORIAL_ROOM_NEW_WRITER_PATTERN,
} from './constants/rmq.patterns'

@Injectable()
export class AuthRMQGateway {
  constructor(
    @Inject(EDITORIAL_ROOM_QUEUE_KEY) private editorialRoomQueue: ClientProxy,
    @Inject(BLOG_QUEUE_KEY) private blogQueue: ClientProxy,
  ) {}

  onSignup(payload: SupertokensUser) {
    this.editorialRoomQueue.emit(EDITORIAL_ROOM_NEW_WRITER_PATTERN, payload)
    this.blogQueue.emit(BLOG_NEW_USER_PATTERN, payload)
  }
}
