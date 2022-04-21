import { Global, Module } from '@nestjs/common'
import { ClientsModule, ClientsModuleOptions } from '@nestjs/microservices'
import { BaseRepository } from './infra/base.repository'
import { blogQueue } from './queues/blog.queue'
import { editorialRoomQueue } from './queues/editorial-room.queue'

@Global()
@Module({
  imports: [
    ClientsModule.register([
      editorialRoomQueue,
      blogQueue,
    ] as ClientsModuleOptions),
  ],
  providers: [BaseRepository],
  exports: [ClientsModule, BaseRepository],
})
export class SharedModule {}
