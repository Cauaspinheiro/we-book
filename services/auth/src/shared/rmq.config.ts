import { Transport } from '@nestjs/microservices'

export const AUTH_QUEUE_KEY = 'auth-queue'

export const authQueue = {
  name: AUTH_QUEUE_KEY,
  transport: Transport.RMQ,
  options: {
    urls: ['amqp://localhost:2572'],
    queue: AUTH_QUEUE_KEY,
  },
}
