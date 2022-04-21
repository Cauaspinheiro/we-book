import { Injectable } from '@nestjs/common'
import { Draft } from 'prisma/generated'
import { DraftsRepository } from '../infra/drafts.repository'

@Injectable()
export class GenerateUrlPathFromTitle {
  constructor(private draftsRepository: DraftsRepository) {}

  async run(draft: Draft) {
    let urlPath = this.formatTitleToUrl(draft.title)

    const sameUrlPath = await this.draftsRepository.findFirst({ urlPath })

    if (sameUrlPath) {
      urlPath = urlPath + `-${this.generateRandomInt()}`
    }

    await this.draftsRepository.update(draft.id, { urlPath })

    return urlPath
  }

  private formatTitleToUrl(title: string) {
    return title
      .trim()
      .toLowerCase()
      .normalize('NFD') // Remove accents from string pt1
      .replace(/[\u0300-\u036f]/g, '') // Remove accents from string pt2
      .replace(/[^a-zA-Z ]/g, '') // Remove all special characters
      .split(' ')
      .join('-')
  }

  private generateRandomInt() {
    return Math.floor(100 + Math.random() * 900) // 3 digit random number
  }
}
