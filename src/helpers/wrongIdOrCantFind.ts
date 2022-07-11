import * as uuidv from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';
import { isItemExist } from './isItemExist';

export const wrongIdOrCantFind = (id: string, arr: any[]) => {
  if (!uuidv.validate(id)) {
    throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST);
  } else if (!isItemExist(id, arr)) {
    throw new HttpException('Cant find', HttpStatus.NOT_FOUND);
  }
};
