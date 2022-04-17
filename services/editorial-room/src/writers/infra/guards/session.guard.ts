import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { ValidateSession } from '../../use-cases/validate-session'

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private validateSession: ValidateSession) {}

  async canActivate(context: ExecutionContext) {
    const http = context.switchToHttp()
    const req = http.getRequest()

    const { cookies } = req

    if (!cookies && !cookies['sAccessToken']) {
      throw new UnauthorizedException()
    }

    const id = await this.validateSession.run(req)

    req.id = id

    return id
  }
}
