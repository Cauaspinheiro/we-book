import { NestFactory } from '@nestjs/core'
import supertokens from 'supertokens-node'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: [process.env.SUPERTOKENS_WEBSITE_DOMAIN],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  })

  await app.listen(25080)
}
bootstrap()
