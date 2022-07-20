import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateUserPasswordDto } from '../user/dto/update-user-password.dto';
import { wrongIdOrCantFind } from '../helpers/wrongIdOrCantFind';
import * as uuid from 'uuid';
import { isItemExist } from '../helpers/isItemExist';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  users = [];

  async getUsers() {
    return await this.prisma.user.findMany();
    // return this.users;
  }

  getUser(id: string) {
    wrongIdOrCantFind(id, this.users);
    return this.users.find((user: CreateUserDto) => user.id === id);
  }

  async createUser(body: CreateUserDto) {
    const userId = uuid.v4();

    const user = await this.prisma.user.create({
      data: {
        password: body.password,
        login: body.login,
        id: userId,
      },
    });

    delete user.password;
    return user;

    // if (!body.login || !body.password) {
    //   throw new HttpException(
    //     'login and password required',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // } else {
    //   const newUser = body;
    //   newUser.id = uuidv.v4();
    //   newUser.version = 1;
    //   newUser.createdAt = new Date().getTime();
    //   newUser.updatedAt = new Date().getTime();
    //   this.users.push(newUser);
    //   return new CreateUserDto({
    //     id: body.id,
    //     login: body.login,
    //     version: body.version,
    //     updatedAt: newUser.createdAt,
    //     createdAt: newUser.createdAt,
    //   });
    // }
  }

  updateUser(body: UpdateUserPasswordDto, id: string) {
    const updateTime = new Date().getTime();
    const updatedUser: CreateUserDto = this.users.find(
      (user: CreateUserDto) => user.id === id,
    );
    if (!uuid.validate(id) || !body.newPassword || !body.oldPassword) {
      throw new HttpException('wrong password', HttpStatus.BAD_REQUEST);
    } else if (!isItemExist(id, this.users)) {
      throw new HttpException('cant find user', HttpStatus.NOT_FOUND);
    } else if (updatedUser.password !== body.oldPassword) {
      throw new HttpException('old password not correct', HttpStatus.FORBIDDEN);
    } else {
      this.users = this.users.map((user: CreateUserDto) => {
        if (user.password === body.oldPassword) {
          user.updatedAt = updateTime;
          user.version = user.version + 1;
          user.password = body.newPassword;
        }
        return user;
      });
    }
    return new CreateUserDto({
      id: id,
      login: updatedUser.login,
      version: updatedUser.version,
      updatedAt: updateTime,
      createdAt: updatedUser.createdAt,
    });
  }

  deleteUser(id: string) {
    wrongIdOrCantFind(id, this.users);
    this.users = this.users.filter((track: CreateUserDto) => track.id !== id);
  }
}
