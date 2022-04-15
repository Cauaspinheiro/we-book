import { Module } from '@nestjs/common'
import { WritersRepository } from './infra/writers.repository'
import { CreateWriter } from './use-cases/create-writer'
import { WritersEvents } from './writers.events'

@Module({
  controllers: [WritersEvents],
  providers: [WritersRepository, CreateWriter],
})
export class WritersModule {}
