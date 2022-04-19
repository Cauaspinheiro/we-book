import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { RequestWithWriter } from 'src/@types/request'
import { WriterGuard } from './infra/guards/writer.guard'

@Controller('writers')
export class WritersController {
  @UseGuards(WriterGuard)
  @Get('me')
  async getWriterEndpoint(@Req() req: RequestWithWriter) {
    return req.writer
  }
}
