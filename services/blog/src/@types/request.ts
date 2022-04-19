import { Request } from 'express'
import { User } from '../../prisma/generated'

export type RequestWithId = Request & { id: string }

export type RequestWithUser = RequestWithId & { user: User }
