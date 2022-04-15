import { Injectable } from '@nestjs/common'
import { WritersRepository } from '../infra/writers.repository'
import { NewWriterPayload } from '../interfaces/writers.payloads'

@Injectable()
export class CreateWriter {
  constructor(private writersRepository: WritersRepository) {}

  async run(data: NewWriterPayload) {
    await this.writersRepository.create({
      id: data.id,
      email: data.email,
      createdAt: new Date(data.timeJoined),
    })
  }
}
