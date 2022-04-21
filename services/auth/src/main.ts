import { NestFactory } from '@nestjs/core'
import supertokens from 'supertokens-node'
import { AppModule } from './app.module'
import { SupertokensExceptionFilter } from './auth/infra/auth.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: [process.env.SUPERTOKENS_WEBSITE_DOMAIN, 'http://localhost:2500'],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  })

  app.useGlobalFilters(new SupertokensExceptionFilter())

  await app.listen(25080)
}
bootstrap()
