import { Injectable } from '@nestjs/common'
import { CreatePostDTO } from '../domain/create-post.dto'
import { PostsRepository } from '../infra/posts.repository'

@Injectable()
export class CreatePost {
  constructor(private postsRepository: PostsRepository) {}

  async run(data: CreatePostDTO) {
    const post = await this.postsRepository.create({
      id: data.id,
      content: data.content,
      description: data.description,
      ogCover: data.ogCover,
      title: data.title,
      urlPath: data.urlPath,
      publisher: { connect: { id: data.publisherId } },
      contributors: {
        createMany: {
          data: data.contributorsIds.map((id) => ({ contributorId: id })),
        },
      },
    })

    return post
  }
}
