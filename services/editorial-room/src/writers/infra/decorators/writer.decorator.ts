import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const UseWriter = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()

    return request.writer
  },
)
