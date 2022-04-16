import { Controller, Get, Param, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'
import { ValidateSessionByApiSecret } from './use-cases/validate-session-by-api-secret'

@Controller()
export class AuthController {
  constructor(private validateSessionByApiSecret: ValidateSessionByApiSecret) {}

  @Get('/secret/:secret/validate-session')
  async validateSessionBySecret(
    @Param('secret') secret: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const userId = await this.validateSessionByApiSecret.run(req, res, secret)

    return res.status(200).json(userId)
  }
}
