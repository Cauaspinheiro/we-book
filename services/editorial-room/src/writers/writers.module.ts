import { Module } from '@nestjs/common'
import { SessionGuard } from './infra/guards/session.guard'
import { WritersRepository } from './infra/writers.repository'
import { CreateWriter } from './use-cases/create-writer'
import { GetWriter } from './use-cases/get-writer'
import { RecoverProfile } from './use-cases/recover-profile'
import { ValidateSession } from './use-cases/validate-session'
import { WritersRMQGateway } from './writers-rmq.gateway'
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
    WritersRMQGateway,
    RecoverProfile,
  ],
  exports: [
    ValidateSession,
    GetWriter,
    SessionGuard,
    WritersRepository,
    RecoverProfile,
  ],
})
export class WritersModule {}
