import { Transport } from '@nestjs/microservices'

export const PROFILE_QUEUE_KEY = 'profile-queue'

export const profileQueue = {
  name: PROFILE_QUEUE_KEY,
  transport: Transport.RMQ,
  options: {
    urls: ['amqp://localhost:2572'],
    queue: PROFILE_QUEUE_KEY,
  },
}
