import {
  Body,
  Controller,
  Delete,
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
import { UpdateDraftValidator } from './infra/validation/update-draft.validator'
import { AddWriterToDraft } from './use-cases/add-writer-to-draft'
import { CreateDraft } from './use-cases/create-draft'
import { DeleteDraft } from './use-cases/delete-draft'
import { FindDraft } from './use-cases/find-draft'
import { GetDrafts } from './use-cases/get-drafts'
import { PublishDraft } from './use-cases/publish-draft'
import { RemoveWriterFromDraft } from './use-cases/remove-writer-from-draft'
import { UpdateDraft } from './use-cases/update-draft'

@Controller('drafts')
@UseGuards(WriterGuard)
export class DraftsController {
  constructor(
    private createDraft: CreateDraft,
    private addWriterToDraft: AddWriterToDraft,
    private getDrafts: GetDrafts,
    private removeWriterFromDraft: RemoveWriterFromDraft,
    private updateDraft: UpdateDraft,
    private deleteDraft: DeleteDraft,
    private publishDraft: PublishDraft,
    private findDraft: FindDraft,
  ) {}

  @Post()
  async create(
    @UseWriter() writer: Writer,
    @Body() createDraftDTO: CreateDraftValidator,
  ) {
    return await this.createDraft.run(createDraftDTO, writer)
  }

  @Post('/:draftId/writers/add')
  async addWriter(
    @UseWriter() writer: Writer,
    @Param('draftId') draftId: string,
    @Body('email') email: string,
  ) {
    return await this.addWriterToDraft.run(writer, {
      addedWriterEmail: email,
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

  @Put('/:id')
  async update(
    @UseWriter() writer: Writer,
    @Param('id') id: string,
    @Body() data: UpdateDraftValidator,
  ) {
    return await this.updateDraft.run(writer, id, data)
  }

  @Delete('/:id')
  async delete(@UseWriter() writer: Writer, @Param('id') id: string) {
    return await this.deleteDraft.run(writer, id)
  }

  @Post('/:id/publish')
  async publish(@UseWriter() writer: Writer, @Param('id') id: string) {
    return await this.publishDraft.run(writer, id)
  }

  @Get('/:id')
  async find(@UseWriter() writer: Writer, @Param('id') id: string) {
    return await this.findDraft.run(writer, id)
  }
}
