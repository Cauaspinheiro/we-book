import { Injectable } from '@nestjs/common'
import { CreatePostDTO } from '../domain/create-post.dto'
import { OnPostPublishedDTO } from '../domain/on-post-published.dto'
import { PostsRepository } from '../infra/posts.repository'
import { PostsRMQGateway } from '../posts-rmq.gateway'
import { GeneratePostUrlPath } from './generate-post-url-path'

@Injectable()
export class CreatePost {
  constructor(
    private postsRepository: PostsRepository,
    private generatePostUrlPath: GeneratePostUrlPath,
    private postsRMQGateway: PostsRMQGateway,
  ) {}

  async run(data: CreatePostDTO): Promise<OnPostPublishedDTO> {
    const existPost = await this.postsRepository.findFirstFull({
      id: data.id,
    })

    let newContributors: string[] = data.contributorsIds

    let urlPath: string = data.urlPath || ''

    // if post exists, filter already linked contributors
    if (existPost) {
      newContributors = data.contributorsIds.filter((id) => {
        if (!existPost.contributors.find((existing) => existing.id === id)) {
          return true
        }

        return false
      })

      if (data.urlPath !== existPost.urlPath) {
        urlPath = await this.generatePostUrlPath.run(data.urlPath || data.title)
      }
    } else {
      urlPath = await this.generatePostUrlPath.run(data.urlPath || data.title)
    }

    const post = await this.postsRepository.upsert(data.id, {
      id: data.id,
      content: data.content,
      description: data.description,
      title: data.title,
      urlPath,
      publisher: { connect: { id: data.publisherId } },
      contributors: {
        createMany: {
          data: newContributors.map((id) => ({ contributorId: id })),
        },
      },
    })

    if (!existPost) {
      this.postsRMQGateway.onNewPost({
        contributorsIds: data.contributorsIds,
        publisherId: post.publisherId,
      })
    }

    return { id: post.id, urlPath }
  }
}
