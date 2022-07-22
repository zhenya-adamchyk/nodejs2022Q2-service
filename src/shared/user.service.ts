import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateUserPasswordDto } from '../user/dto/update-user-password.dto';
import * as uuid from 'uuid';
// import { PrismaService } from '../prisma/prisma.service';
// import { User } from '@prisma/client';

@Injectable()
export class UserService {
  // constructor(private readonly prisma: PrismaService) {}

  async getUsers() {
    // console.log('aaaaa');
    // return await this.prisma.user.findMany({
    //   select: {
    //     password: false,
    //     id: true,
    //     version: true,
    //     createdAt: true,
    //     updatedAt: true,
    //     login: true,
    //   },
    // });
  }

  async getUser(id: string) {
    // if (!uuid.validate(id)) {
    //   throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST);
    // } else {
    //   try {
    //     const user = await this.prisma.user.findUnique({ where: { id: id } });
    //
    //     delete user.password;
    //     return user;
    //   } catch (e) {
    //     throw new HttpException('Cant find', HttpStatus.NOT_FOUND);
    //   }
    // }
  }

  async createUser(body: CreateUserDto) {
    // if (!body.login || !body.password) {
    //   throw new HttpException(
    //     'login and password required',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // } else {
    //   const userId = uuid.v4();
    //
    //   const user = await this.prisma.user.create({
    //     data: {
    //       password: body.password,
    //       login: body.login,
    //       id: userId,
    //       version: 1,
    //     },
    //   });
    //   delete user.password;
    //   return user;
    // }
  }

  async updateUser(body: any, id: string) {
    // const updatedUser: User = await this.prisma.user.findUnique({
    //   where: { id: id },
    // });
    // if (!uuid.validate(id) || !body.newPassword || !body.oldPassword) {
    //   throw new HttpException('wrong password', HttpStatus.BAD_REQUEST);
    // } else if (updatedUser.password !== body.oldPassword) {
    //   throw new HttpException('old password not correct', HttpStatus.FORBIDDEN);
    // } else {
    //   try {
    //     await this.prisma.user.updateMany({
    //       where: { password: body.oldPassword },
    //       data: {
    //         version: {
    //           increment: 1,
    //         },
    //         password: body.newPassword,
    //       },
    //     });
    //     delete updatedUser.password;
    //   } catch (e) {
    //     throw new HttpException('cant find user', HttpStatus.NOT_FOUND);
    //   }
    // }
    // return updatedUser;
  }

  async deleteUser(id: string) {
    // if (!uuid.validate(id)) {
    //   throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST);
    // } else {
    //   try {
    //     await this.prisma.user.deleteMany({ where: { id: id } });
    //   } catch (e) {
    //     throw new HttpException('Cant find', HttpStatus.NOT_FOUND);
    //   }
    // }
  }
}
