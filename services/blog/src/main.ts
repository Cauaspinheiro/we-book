import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { blogQueue } from './shared/rmq.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.connectMicroservice(blogQueue)

  await app.startAllMicroservices()
  await app.listen(25280)
}
bootstrap()
