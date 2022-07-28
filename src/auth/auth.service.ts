import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as uuid from 'uuid';
import { PrismaService } from '../prisma/prisma.service';
import * as bcript from 'bcrypt';
import { Tokens } from './types/tokens.type';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  hashData(data: string) {
    return bcript.hash(data, 10);
  }

  async getTokens(id: number, login: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: id,
          login,
        },
        {
          secret: this.config.get('JWT_SECRET_KEY'),
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: id,
          login,
        },
        {
          secret: this.config.get('JWT_SECRET_REFRESH_KEY'),
          expiresIn: 60 * 60 * 7 * 24,
        },
      ),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async signup(body: CreateUserDto): Promise<Tokens> {
    if (!body.login || !body.password) {
      throw new HttpException(
        'login and password required',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const hash = await this.hashData(body.password);

      const user = await this.prisma.user.create({
        data: {
          password: hash,
          login: body.login,
          id: uuid.v4(),
          version: 1,
          updatedAt: new Date().getTime(),
          createdAt: new Date().getTime(),
        },
      });

      const tokens = await this.getTokens(user.id, user.login);
      return tokens;
      // delete user.password;
      // return user;
    }
  }

  login() {}

  refresh() {}
}
