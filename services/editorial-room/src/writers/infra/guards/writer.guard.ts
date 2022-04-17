import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common'
import { RequestWithWriter } from 'src/@types/request'
import { GetWriter } from 'src/writers/use-cases/get-writer'
import { SessionGuard } from './session.guard'

@Injectable()
export class WriterGuard implements CanActivate {
  constructor(
    private getWriter: GetWriter,
    private sessionGuard: SessionGuard,
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

    const writer = await this.getWriter.run(id)

    if (!writer) {
      // TODO: call auth service to get the writer

      throw new NotFoundException('Writer not found')
    }

    req.writer = writer

    return true
  }
}
