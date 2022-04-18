import { Global, Module } from '@nestjs/common'
import { ClientsModule, ClientsModuleOptions } from '@nestjs/microservices'
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
  exports: [ClientsModule],
})
export class SharedModule {}
