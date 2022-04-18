import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import { Writer } from 'prisma/generated'
import { UseWriter } from 'src/writers/infra/decorators/writer.decorator'
import { WriterGuard } from 'src/writers/infra/guards/writer.guard'
import { CreateDraftValidator } from './infra/validation/create-draft.validator'
import { AddWriterToDraft } from './use-cases/add-writer-to-draft'
import { CreateDraft } from './use-cases/create-draft'
import { GetDrafts } from './use-cases/get-drafts'
import { RemoveWriterFromDraft } from './use-cases/remove-writer-from-draft'

@Controller('drafts')
@UseGuards(WriterGuard)
export class DraftsController {
  constructor(
    private createDraft: CreateDraft,
    private addWriterToDraft: AddWriterToDraft,
    private getDrafts: GetDrafts,
    private removeWriterFromDraft: RemoveWriterFromDraft,
  ) {}

  @Post()
  async create(
    @UseWriter() writer: Writer,
    @Body() createDraftDTO: CreateDraftValidator,
  ) {
    return await this.createDraft.run(createDraftDTO, writer)
  }

  @Post('/:draftId/writers/add/:writerId')
  async addWriter(
    @UseWriter() writer: Writer,
    @Param('draftId') draftId: string,
    @Param('writerId') writerId: string,
  ) {
    return await this.addWriterToDraft.run(writer, {
      addedWriterId: writerId,
      draftId,
    })
  }

  @Put('/:draftId/writers/remove/:writerId')
  async removeWriter(
    @UseWriter() writer: Writer,
    @Param('draftId') draftId: string,
    @Param('writerId') writerId: string,
  ) {
    return await this.removeWriterFromDraft.run(writer, {
      removedWriterId: writerId,
      draftId,
    })
  }

  @Get()
  async index(@UseWriter() writer: Writer) {
    return await this.getDrafts.run(writer)
  }
}