import * as uuidv from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';
import { isItemExist } from './isItemExist';

export const wrongIdOrCantFind = (
  id: string,
  arr: any[],
  anotherError?: boolean,
) => {
  if (!uuidv.validate(id)) {
    throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST);
  } else if (!isItemExist(id, arr)) {
    const errorStatus = anotherError
      ? HttpStatus.UNPROCESSABLE_ENTITY
      : HttpStatus.NOT_FOUND;
    throw new HttpException('Cant find', errorStatus);
  }
};
