import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common'
import { RequestWithUser } from 'src/@types/request'
import { GetUser } from 'src/users/use-cases/get-user'
import { RecoverProfile } from 'src/users/use-cases/recover-profile'
import { SessionGuard } from './session.guard'

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private getUser: GetUser,
    private sessionGuard: SessionGuard,
    private recoverProfile: RecoverProfile,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req: RequestWithUser = context.switchToHttp().getRequest()

    let id: string

    if (!req.id) {
      id = await this.sessionGuard.canActivate(context)

      if (!id) {
        throw new UnauthorizedException('Missing id in protected route')
      }
    } else {
      id = req.id
    }

    let user = await this.getUser.run(id)

    if (!user) {
      user = await this.recoverProfile.run(id)

      if (!user) {
        throw new InternalServerErrorException('User not found')
      }
    }

    req.user = user

    return true
  }
}
