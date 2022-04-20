import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { blogQueue } from './shared/rmq.config'
import cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(cookieParser())

  app.enableCors({ origin: 'http://192.168.10.146:2500', credentials: true })

  app.connectMicroservice(blogQueue)

  await app.startAllMicroservices()
  await app.listen(25280)
}
bootstrap()
