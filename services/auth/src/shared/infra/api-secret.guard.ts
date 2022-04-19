import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common'
import { Request } from 'express'

export class ApiSecretGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req: Request = context.switchToHttp().getRequest()

    if (!req.headers['secret']) {
      throw new UnauthorizedException('API secret not found')
    }

    const secret = req.headers['secret']

    if (secret !== process.env.API_SECRET) {
      throw new ForbiddenException('Invalid API secret')
    }

    return true
  }
}
