import { Injectable } from '@nestjs/common'
import { WritersRepository } from '../infra/writers.repository'

@Injectable()
export class GetWriter {
  constructor(private writersRepository: WritersRepository) {}

  async run(id: string) {
    const writer = await this.writersRepository.findFirst({ id })

    return writer
  }
}
