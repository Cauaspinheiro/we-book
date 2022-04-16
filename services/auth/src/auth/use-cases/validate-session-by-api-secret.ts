import {
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { getUserById } from 'supertokens-node/recipe/emailpassword'
import { getSession } from 'supertokens-node/recipe/session'

export class ValidateSessionByApiSecret {
  async run(req: Request, res: Response, secret: string) {
    if (secret !== process.env.API_SECRET) {
      throw new UnauthorizedException('Invalid secret')
    }

    const result = await getSession(req, res)

    const userId = result?.getUserId()

    if (!userId) throw new InternalServerErrorException()

    const user = await getUserById(userId)

    if (!user) throw new NotFoundException()

    return user.id
  }
}
