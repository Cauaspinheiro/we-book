import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { editorialRoomQueue } from './shared/rmq.config'
import cookiesParser from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.connectMicroservice(editorialRoomQueue)
  app.use(cookiesParser())
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  await app.startAllMicroservices()
  await app.listen(25180)
}
bootstrap()
