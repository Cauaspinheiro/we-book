import {
  MiddlewareConsumer,
  Module,
  NestModule,
  DynamicModule,
} from '@nestjs/common'
import { AuthRMQGateway } from './auth-rmq.gateway'

import { ConfigInjectionToken, AuthModuleConfig } from './auth.config'
import { AuthController } from './auth.controller'
import { AuthMiddleware } from './auth.middleware'
import { SupertokensService } from './auth.service'
import { ValidateSessionByApiSecret } from './use-cases/validate-session-by-api-secret'

@Module({
  providers: [],
  exports: [],
  controllers: [],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/auth/*')
  }

  static forRoot({
    connectionURI,
    apiKey,
    appInfo,
  }: AuthModuleConfig): DynamicModule {
    return {
      providers: [
        {
          useValue: {
            appInfo,
            connectionURI,
            apiKey,
          },
          provide: ConfigInjectionToken,
        },
        SupertokensService,
        AuthRMQGateway,
        ValidateSessionByApiSecret,
      ],
      controllers: [AuthController],
      exports: [],
      imports: [],
      module: AuthModule,
    }
  }
}
