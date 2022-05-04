import { Injectable } from '@nestjs/common'
import { WritersRMQGateway } from '../writers-rmq.gateway'
import { CreateWriter } from './create-writer'

@Injectable()
export class RecoverProfile {
  constructor(
    private writersRMQGateway: WritersRMQGateway,
    private createWriter: CreateWriter,
  ) {}

  async run(id: string) {
    const profile = await this.writersRMQGateway.recoverProfile(id)

    if (!profile) return null

    const writer = await this.createWriter.run(profile)

    return writer
  }
}
