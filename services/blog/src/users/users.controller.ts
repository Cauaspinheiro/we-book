import { Controller, Get, UseGuards } from '@nestjs/common'
import { User } from 'prisma/generated'
import { UseUser } from './infra/decorators/user.decorator'
import { SessionGuard } from './infra/guards/session.guard'
import { UserGuard } from './infra/guards/user.guard'
import { GetUserWithMetadata } from './use-cases/get-user-with-metadata'

@Controller('users')
export class UsersController {
  constructor(private getUserWithMetadata: GetUserWithMetadata) {}

  @Get('me')
  @UseGuards(SessionGuard, UserGuard)
  async find(@UseUser() user: User) {
    return await this.getUserWithMetadata.run(user.id)
  }
}
