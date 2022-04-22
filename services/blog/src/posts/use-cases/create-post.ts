import { Injectable } from '@nestjs/common'
import { CreatePostDTO } from '../domain/create-post.dto'
import { PostsRepository } from '../infra/posts.repository'

@Injectable()
export class CreatePost {
  constructor(private postsRepository: PostsRepository) {}

  async run(data: CreatePostDTO) {
    const existPost = await this.postsRepository.findFirstFull({
      id: data.id,
    })

    let newContributors: string[] = []

    if (existPost) {
      newContributors = data.contributorsIds.filter((id) => {
        if (!existPost.contributors.find((existing) => existing.id === id)) {
          return true
        }

        return false
      })
    }

    const post = await this.postsRepository.upsert(data.id, {
      id: data.id,
      content: data.content,
      description: data.description,
      ogCover: data.ogCover,
      title: data.title,
      urlPath: data.urlPath,
      publisher: { connect: { id: data.publisherId } },
      contributors: {
        createMany: {
          data: newContributors.map((id) => ({ contributorId: id })),
        },
      },
    })

    return post
  }
}
