import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { SessionGuard } from './infra/session.guard'
import { GetWriter } from './use-cases/get-writer'

@Controller()
export class WritersController {
  constructor(private getWriter: GetWriter) {}

  @UseGuards(SessionGuard)
  @Get('writers/me')
  async getWriterEndpoint(@Req() req: Request & { id: string }) {
    return await this.getWriter.run(req.id)
  }
}
