import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ProfilesModule } from './profiles/profiles.module'
import { SharedModule } from './shared/shared.module'

@Module({
  imports: [SharedModule, ProfilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
