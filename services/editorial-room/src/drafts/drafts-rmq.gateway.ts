import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import { BLOG_QUEUE_KEY } from 'src/shared/queues/blog.queue'
import {
  BLOG_DRAFT_DELETED_PATTERN,
  BLOG_NEW_POST_PATTERN,
} from './constants/rmq.patterns'
import { OnPostPublishedDTO } from './domain/on-post-published.dto'
import { PublishDraftDTO } from './domain/publish-draft.dto'

@Injectable()
export class DraftsRMQGateway {
  constructor(@Inject(BLOG_QUEUE_KEY) private blogQueue: ClientProxy) {}

  async onDraftPublished(data: PublishDraftDTO) {
    const response: OnPostPublishedDTO = await firstValueFrom(
      this.blogQueue.send(BLOG_NEW_POST_PATTERN, data),
    )

    return response
  }

  async onDraftDeleted(id: string) {
    this.blogQueue.emit(BLOG_DRAFT_DELETED_PATTERN, { id })
  }
}
