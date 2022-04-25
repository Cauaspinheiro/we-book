import { Injectable } from '@nestjs/common'
import { BaseRepository } from 'src/shared/infra/base.repository'
import { NewPostViewDTO } from '../domain/new-post-view.dto'
import { ProfilesRepository } from '../infra/profiles.repository'

@Injectable()
export class AddNewPostViewCount {
  constructor(
    private profilesRepository: ProfilesRepository,
    private repo: BaseRepository,
  ) {}

  async run(newPostViewDTO: NewPostViewDTO) {
    await this.repo.$transaction([
      this.addViewerCount(newPostViewDTO),
      this.addWritersViewsCount(newPostViewDTO),
    ])
  }

  private addViewerCount(newPostViewDTO: NewPostViewDTO) {
    return this.profilesRepository.updateQuery(newPostViewDTO.viewerId, {
      totalPostsViewed: { increment: 1 },
    })
  }

  private addWritersViewsCount(newPostViewDTO: NewPostViewDTO) {
    return this.profilesRepository.updateManyQuery(
      {
        OR: newPostViewDTO.postWritersIds.map((id) => ({ id })),
      },
      { totalViews: { increment: 1 } },
    )
  }
}
