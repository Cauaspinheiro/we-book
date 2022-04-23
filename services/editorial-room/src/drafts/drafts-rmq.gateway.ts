import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { BLOG_QUEUE_KEY } from 'src/shared/queues/blog.queue'
import {
  BLOG_DRAFT_DELETED_PATTERN,
  BLOG_NEW_POST_PATTERN,
} from './constants/rmq.patterns'
import { PublishDraftDTO } from './domain/publish-draft.dto'

@Injectable()
export class DraftsRMQGateway {
  constructor(@Inject(BLOG_QUEUE_KEY) private blogQueue: ClientProxy) {}

  async onDraftPublished(data: PublishDraftDTO) {
    this.blogQueue.emit(BLOG_NEW_POST_PATTERN, data)
  }

  async onDraftDeleted(id: string) {
    this.blogQueue.emit(BLOG_DRAFT_DELETED_PATTERN, { id })
  }
}
