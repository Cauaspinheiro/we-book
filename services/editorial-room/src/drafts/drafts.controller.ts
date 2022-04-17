import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { Writer } from 'prisma/generated'
import { UseWriter } from 'src/writers/infra/decorators/writer.decorator'
import { WriterGuard } from 'src/writers/infra/guards/writer.guard'
import { CreateDraft } from './use-cases/create-draft'

@Controller('drafts')
@UseGuards(WriterGuard)
export class DraftsController {
  constructor(private createDraft: CreateDraft) {}

  @Post()
  async create(@UseWriter() writer: Writer, @Body('content') content = '') {
    return await this.createDraft.run(content, writer)
  }
}
