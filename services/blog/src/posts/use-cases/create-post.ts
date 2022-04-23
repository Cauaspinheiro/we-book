import { Injectable } from '@nestjs/common'
import { CreatePostDTO } from '../domain/create-post.dto'
import { OnPostPublishedDTO } from '../domain/on-post-published.dto'
import { PostsRepository } from '../infra/posts.repository'
import { GeneratePostUrlPath } from './generate-post-url-path'

@Injectable()
export class CreatePost {
  constructor(
    private postsRepository: PostsRepository,
    private generatePostUrlPath: GeneratePostUrlPath,
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
      ogCover: data.ogCover,
      title: data.title,
      urlPath,
      publisher: { connect: { id: data.publisherId } },
      contributors: {
        createMany: {
          data: newContributors.map((id) => ({ contributorId: id })),
        },
      },
    })

    return { id: post.id, urlPath }
  }
}
