import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const UseProfile = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()

    return request.profile
  },
)
