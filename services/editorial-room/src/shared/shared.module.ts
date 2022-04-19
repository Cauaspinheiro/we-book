import { Global, Module } from '@nestjs/common'
import { ClientsModule, ClientsModuleOptions } from '@nestjs/microservices'
import { BaseRepository } from './infra/base.repository'
import { blogQueue } from './queues/blog.queue'

@Global()
@Module({
  imports: [ClientsModule.register([blogQueue] as ClientsModuleOptions)],
  providers: [BaseRepository],
  exports: [BaseRepository, ClientsModule],
})
export class SharedModule {}
