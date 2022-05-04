import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common'
import { RequestWithWriter } from 'src/@types/request'
import { GetWriter } from 'src/writers/use-cases/get-writer'
import { RecoverProfile } from '../../use-cases/recover-profile'
import { SessionGuard } from './session.guard'

@Injectable()
export class WriterGuard implements CanActivate {
  constructor(
    private getWriter: GetWriter,
    private sessionGuard: SessionGuard,
    private recoverProfile: RecoverProfile,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req: RequestWithWriter = context.switchToHttp().getRequest()

    let id: string

    if (!req.id) {
      id = await this.sessionGuard.canActivate(context)

      if (!id) {
        throw new UnauthorizedException('Missing id in protected route')
      }
    } else {
      id = req.id
    }

    let writer = await this.getWriter.run(id)

    if (!writer) {
      writer = await this.recoverProfile.run(id)

      if (!writer) {
        throw new InternalServerErrorException('Writer not found')
      }
    }

    req.writer = writer

    return true
  }
}
