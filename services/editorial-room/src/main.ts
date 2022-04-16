import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { editorialRoomQueue } from './shared/rmq.config'
import cookiesParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.connectMicroservice(editorialRoomQueue)
  app.use(cookiesParser())

  await app.startAllMicroservices()
  await app.listen(25180)
}
bootstrap()
