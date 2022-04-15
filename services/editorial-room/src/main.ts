import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { editorialRoomQueue } from './shared/rmq.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.connectMicroservice(editorialRoomQueue)

  await app.startAllMicroservices()
  await app.listen(25180)
}
bootstrap()
