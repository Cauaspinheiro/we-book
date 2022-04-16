import { Global, Module } from '@nestjs/common'
import { BaseRepository } from './infra/base.repository'

@Global()
@Module({
  providers: [BaseRepository],
  exports: [BaseRepository],
})
export class SharedModule {}
