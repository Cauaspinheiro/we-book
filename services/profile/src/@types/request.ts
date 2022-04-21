import { Request } from 'express'
import { Profile } from '../../prisma/generated'

export type RequestWithId = Request & { id: string }

export type RequestWithProfile = RequestWithId & { profile: Profile }
