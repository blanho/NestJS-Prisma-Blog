import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const http = context.switchToHttp();
    const request = http.getRequest();
    return request.user;
  },
);
