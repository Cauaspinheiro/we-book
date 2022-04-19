import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiSecretGuard } from 'src/shared/infra/api-secret.guard'
import { SessionContainer } from 'supertokens-node/recipe/session'
import { AuthGuard } from './infra/auth.guard'
import { Session } from './infra/session.decorator'

@Controller('auth')
export class AuthController {
  @Get('/secret/validate-session')
  @UseGuards(ApiSecretGuard, AuthGuard)
  async validateSessionBySecret(@Session() session: SessionContainer) {
    return session.getUserId()
  }
}
