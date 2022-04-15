import { Controller } from '@nestjs/common'
import { EventPattern } from '@nestjs/microservices'
import { NEW_WRITER_PATTERN } from './constants/rmq.patterns'
import { NewWriterPayload } from './interfaces/writers.payloads'
import { CreateWriter } from './use-cases/create-writer'

@Controller()
export class WritersEvents {
  constructor(private createWriter: CreateWriter) {}

  @EventPattern(NEW_WRITER_PATTERN)
  async onNewUser(payload: NewWriterPayload) {
    await this.createWriter.run(payload)
  }
}
