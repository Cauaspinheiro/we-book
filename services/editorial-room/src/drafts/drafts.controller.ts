import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { Writer } from 'prisma/generated'
import { UseWriter } from 'src/writers/infra/decorators/writer.decorator'
import { WriterGuard } from 'src/writers/infra/guards/writer.guard'
import { CreateDraftValidator } from './infra/validation/create-draft.validator'
import { AddPublisherToDraft } from './use-cases/add-writers-to-draft'
import { CreateDraft } from './use-cases/create-draft'
import { GetDrafts } from './use-cases/get-drafts'

@Controller('drafts')
@UseGuards(WriterGuard)
export class DraftsController {
  constructor(
    private createDraft: CreateDraft,
    private addPublisherToDraft: AddPublisherToDraft,
    private getDrafts: GetDrafts,
  ) {}

  @Post()
  async create(
    @UseWriter() writer: Writer,
    @Body() createDraftDTO: CreateDraftValidator,
  ) {
    return await this.createDraft.run(createDraftDTO, writer)
  }

  @Post('/:draftId/writers/add/:writerId')
  async addWriterToDraft(
    @UseWriter() writer: Writer,
    @Param('draftId') draftId: string,
    @Param('writerId') writerId: string,
  ) {
    return await this.addPublisherToDraft.run(writer, {
      addedWriterId: writerId,
      draftId,
    })
  }

  @Get()
  async index(@UseWriter() writer: Writer) {
    return await this.getDrafts.run(writer)
  }
}
