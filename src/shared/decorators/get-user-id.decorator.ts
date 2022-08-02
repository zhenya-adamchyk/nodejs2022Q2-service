import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUserId = createParamDecorator(
  (data: undefined, context: ExecutionContext): string => {
    const req = context.switchToHttp().getRequest();
    return req.user['sub'];
  },
);
