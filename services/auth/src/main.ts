import { NestFactory } from '@nestjs/core'
import supertokens from 'supertokens-node'
import { AppModule } from './app.module'
import { SupertokensExceptionFilter } from './auth/infra/auth.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const origins = process.env.ACCEPT_ORIGINS.split(',').map((v) => v.trim())

  app.enableCors({
    origin: [process.env.SUPERTOKENS_WEBSITE_DOMAIN, ...origins],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  })

  app.useGlobalFilters(new SupertokensExceptionFilter())

  await app.listen(25080)
}
bootstrap()
