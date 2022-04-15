import { Global, Module } from '@nestjs/common'
import { ClientsModule, ClientsModuleOptions } from '@nestjs/microservices'
import { editorialRoomQueue } from './queues/editorial-room.queue'

@Global()
@Module({
  imports: [
    ClientsModule.register([editorialRoomQueue] as ClientsModuleOptions),
  ],
  exports: [ClientsModule],
})
export class SharedModule {}
