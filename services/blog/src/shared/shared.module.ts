import { Global, Module } from '@nestjs/common'
import { ClientsModule, ClientsModuleOptions } from '@nestjs/microservices'
import { BaseRepository } from './infra/base.repository'
import { profileQueue } from './queues/profile.queue'

@Global()
@Module({
  imports: [ClientsModule.register([profileQueue] as ClientsModuleOptions)],
  providers: [BaseRepository],
  exports: [BaseRepository, ClientsModule],
})
export class SharedModule {}
