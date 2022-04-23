import { Injectable } from '@nestjs/common'
import { PostsRepository } from '../infra/posts.repository'

@Injectable()
export class GeneratePostUrlPath {
  constructor(private postsRepository: PostsRepository) {}

  async run(data: string) {
    let urlPath = this.formatTitleToUrl(data)

    const sameUrlPath = await this.postsRepository.findFirst({ urlPath })

    if (sameUrlPath) {
      urlPath = urlPath + `-${this.generateRandomInt()}`
    }

    return urlPath
  }

  private formatTitleToUrl(title: string) {
    return title
      .trim()
      .toLowerCase()
      .normalize('NFD') // Remove accents from string pt1
      .replace(/[\u0300-\u036f]/g, '') // Remove accents from string pt2
      .replace(/[^a-zA-Z0-9- ]/g, '') // Remove all special characters
      .split(' ')
      .join('-')
  }

  private generateRandomInt() {
    return Math.floor(100 + Math.random() * 900) // 3 digit random number
  }
}
