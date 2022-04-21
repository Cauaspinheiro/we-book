import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common'
import { RequestWithProfile } from 'src/@types/request'
import { GetProfile } from 'src/profiles/use-cases/get-profile'
import { SessionGuard } from './session.guard'

@Injectable()
export class ProfileGuard implements CanActivate {
  constructor(
    private getProfile: GetProfile,
    private sessionGuard: SessionGuard,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req: RequestWithProfile = context.switchToHttp().getRequest()

    let id: string

    if (!req.id) {
      id = await this.sessionGuard.canActivate(context)

      if (!id) {
        throw new UnauthorizedException('Missing id in protected route')
      }
    } else {
      id = req.id
    }

    const profile = await this.getProfile.run(id)

    if (!profile) {
      throw new NotFoundException('Profile not found')
    }

    req.profile = profile

    return true
  }
}
