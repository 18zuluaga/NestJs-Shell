import { Type, applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ApiBadRequest, ApiCreateResponses } from 'src/common/docs';

export function ApiDocPostUser<T>(entity: Type<T>) {
  const description =
    'you can create users ';
  return applyDecorators(
    ApiOperation({
      summary: 'create new user ',
      description,
    }),
    ApiCreateResponses(entity),
    ApiBadRequest()
  );
}

export function ApiDocGetUser<T>(entity: Type<T>) {
  const description =
    'you can get all users';
  return applyDecorators(
    ApiOperation({
      summary: 'get all users',
      description,
    }),
    ApiCreateResponses(entity),
    ApiBadRequest()
  );
}
