import { Exclude } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  id: string;

  @IsString()
  login: string;

  @IsInt()
  version: number;

  @IsInt()
  createdAt: number;

  @IsInt()
  updatedAt: number;

  @Exclude()
  @IsString()
  password: string;

  constructor(partial: Partial<CreateUserDto>) {
    Object.assign(this, partial);
  }
}
