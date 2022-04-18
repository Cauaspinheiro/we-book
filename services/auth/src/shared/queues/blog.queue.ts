import { Transport } from '@nestjs/microservices'

export const BLOG_QUEUE_KEY = 'blog-queue'

export const blogQueue = {
  name: BLOG_QUEUE_KEY,
  transport: Transport.RMQ,
  options: {
    urls: ['amqp://localhost:2572'],
    queue: BLOG_QUEUE_KEY,
  },
}
