import { Module } from '@nestjs/common'
import { SessionGuard } from './infra/guards/session.guard'
import { WritersRepository } from './infra/writers.repository'
import { CreateWriter } from './use-cases/create-writer'
import { GetWriter } from './use-cases/get-writer'
import { ValidateSession } from './use-cases/validate-session'
import { WritersController } from './writers.controller'
import { WritersEvents } from './writers.events'

@Module({
  controllers: [WritersEvents, WritersController],
  providers: [
    WritersRepository,
    CreateWriter,
    ValidateSession,
    GetWriter,
    SessionGuard,
  ],
  exports: [ValidateSession],
})
export class WritersModule {}
