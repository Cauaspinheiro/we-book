import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    AuthModule.forRoot({
      connectionURI: process.env.SUPERTOKENS_CONNECTION_URI,
      appInfo: {
        appName: process.env.SUPERTOKENS_APP_NAME,
        apiDomain: process.env.SUPERTOKENS_API_DOMAIN,
        websiteDomain: process.env.SUPERTOKENS_WEBSITE_DOMAIN,
        apiBasePath: process.env.SUPERTOKENS_API_BASE_PATH,
        websiteBasePath: process.env.SUPERTOKENS_WEBSITE_BASE_PATH,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
