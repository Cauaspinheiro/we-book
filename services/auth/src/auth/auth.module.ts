import {
  MiddlewareConsumer,
  Module,
  NestModule,
  DynamicModule,
} from '@nestjs/common'
import { AuthRMQGateway } from './auth-rmq.gateway'

import { ConfigInjectionToken, AuthModuleConfig } from './auth.config'
import { AuthMiddleware } from './auth.middleware'
import { SupertokensService } from './auth.service'

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
      ],
      exports: [],
      imports: [],
      module: AuthModule,
    }
  }
}
