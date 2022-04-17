import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { RequestWithWriter } from 'src/@types/request'
import { WriterGuard } from './infra/guards/writer.guard'

@Controller()
export class WritersController {
  @UseGuards(WriterGuard)
  @Get('writers/me')
  async getWriterEndpoint(@Req() req: RequestWithWriter) {
    return req.writer
  }
}
