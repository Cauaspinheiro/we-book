import { Injectable } from '@nestjs/common'
import { BaseRepository } from 'src/shared/infra/base.repository'
import { NewPostDTO } from '../domain/new-post.dto'
import { ProfilesRepository } from '../infra/profiles.repository'

@Injectable()
export class AddNewPostCount {
  constructor(
    private profilesRepository: ProfilesRepository,
    private repo: BaseRepository,
  ) {}

  async run(newPostDTO: NewPostDTO) {
    await this.repo.$transaction([
      this.addPublicationCount(newPostDTO),
      this.addContributionsCount(newPostDTO),
    ])
  }

  private addPublicationCount(newPostDTO: NewPostDTO) {
    return this.profilesRepository.updateQuery(newPostDTO.publisherId, {
      totalPublications: { increment: 1 },
    })
  }

  private addContributionsCount(newPostDTO: NewPostDTO) {
    return this.profilesRepository.updateManyQuery(
      {
        OR: newPostDTO.contributorsIds.map((id) => ({ id })),
      },
      { totalContributions: { increment: 1 } },
    )
  }
}
