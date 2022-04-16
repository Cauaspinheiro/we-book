import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Request } from 'express'
import axios from 'axios'

@Injectable()
export class ValidateSession {
  async run(req: Request) {
    if (!req.headers.cookie) {
      throw new UnauthorizedException()
    }

    try {
      const { data } = await axios.get(this.VALIDATE_SESSION_PATH, {
        headers: {
          Cookie: req.headers.cookie,
        },
      })

      return data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new HttpException(error.response.data, error.response.status)
      }

      throw error
    }
  }

  private get VALIDATE_SESSION_PATH() {
    return `${process.env.AUTH_SERVICE_BASE_URL}/secret/${process.env.AUTH_SERVICE_API_SECRET}/validate-session`
  }
}
