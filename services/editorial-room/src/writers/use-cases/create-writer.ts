import { Injectable } from '@nestjs/common'
import { NewWriterDTO } from '../domain/new-writer.dto'
import { WritersRepository } from '../infra/writers.repository'

@Injectable()
export class CreateWriter {
  constructor(private writersRepository: WritersRepository) {}

  async run(data: NewWriterDTO) {
    await this.writersRepository.create({
      id: data.id,
      email: data.email,
      createdAt: new Date(data.createdAt),
      name: data.name,
    })
  }
}
