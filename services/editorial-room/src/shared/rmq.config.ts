import { Transport } from '@nestjs/microservices'

export const EDITORIAL_ROOM_QUEUE_KEY = 'editorial-room-queue'

export const editorialRoomQueue = {
  name: EDITORIAL_ROOM_QUEUE_KEY,
  transport: Transport.RMQ,
  options: {
    urls: ['amqp://localhost:2572'],
    queue: EDITORIAL_ROOM_QUEUE_KEY,
  },
}
