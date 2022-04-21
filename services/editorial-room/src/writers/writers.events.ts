import { Controller } from '@nestjs/common'
import { EventPattern } from '@nestjs/microservices'
import { NEW_WRITER_PATTERN } from './constants/rmq.patterns'
import { NewWriterDTO } from './domain/new-writer.dto'
import { CreateWriter } from './use-cases/create-writer'

@Controller()
export class WritersEvents {
  constructor(private createWriter: CreateWriter) {}

  @EventPattern(NEW_WRITER_PATTERN)
  async onNewUser(payload: NewWriterDTO) {
    await this.createWriter.run(payload)
  }
}
