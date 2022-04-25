import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { profileQueue } from './shared/rmq.config'
import cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const origins = process.env.ACCEPT_ORIGINS.split(',').map((v) => v.trim())
  app.use(cookieParser())

  app.enableCors({ origin: origins, credentials: true })

  app.connectMicroservice(profileQueue)

  await app.startAllMicroservices()
  await app.listen(25380)
}

bootstrap()
