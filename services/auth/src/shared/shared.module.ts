import { Global, Module } from '@nestjs/common'
import { ClientsModule, ClientsModuleOptions } from '@nestjs/microservices'
import { profileQueue } from './queues/profile.queue'

@Global()
@Module({
  imports: [ClientsModule.register([profileQueue] as ClientsModuleOptions)],
  exports: [ClientsModule],
})
export class SharedModule {}
