import { Request } from 'express'
import { Writer } from '../../prisma/generated'

export type RequestWithId = Request & { id: string }

export type RequestWithWriter = RequestWithId & { writer: Writer }
