import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { blogQueue } from './shared/rmq.config'
import cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(cookieParser())

  const origins = process.env.ACCEPT_ORIGINS.split(',').map((v) => v.trim())

  app.enableCors({ origin: origins, credentials: true })

  app.connectMicroservice(blogQueue)

  await app.startAllMicroservices()
  await app.listen(25280)
}
bootstrap()
