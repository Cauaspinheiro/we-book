import { Inject, Injectable } from '@nestjs/common'
import { BLOG_QUEUE_KEY } from 'src/shared/queues/blog.queue'
import { ClientProxy } from '@nestjs/microservices'
import { EDITORIAL_ROOM_QUEUE_KEY } from 'src/shared/queues/editorial-room.queue'
import { Profile } from 'prisma/generated'
import {
  BLOG_NEW_USER_PATTERN,
  EDITORIAL_ROOM_NEW_WRITER_PATTERN,
} from './constants/rmq.patterns'

@Injectable()
export class ProfilesRMQGateway {
  constructor(
    @Inject(BLOG_QUEUE_KEY) private blogQueue: ClientProxy,
    @Inject(EDITORIAL_ROOM_QUEUE_KEY) private editorialRoomQueue: ClientProxy,
  ) {}

  async onNewProfile(profile: Profile) {
    const payload = {
      ...profile,
      createdAt: profile.createdAt.toISOString(),
    }

    this.blogQueue.emit(BLOG_NEW_USER_PATTERN, payload)
    this.editorialRoomQueue.emit(EDITORIAL_ROOM_NEW_WRITER_PATTERN, payload)
  }
}
