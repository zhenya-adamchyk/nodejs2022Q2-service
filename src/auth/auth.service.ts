import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as uuid from 'uuid';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
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
    return bcrypt.hash(data, 10);
  }

  async getTokens(id: string, login: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: id,
          login,
        },
        {
          secret: this.config.get('JWT_SECRET_KEY'),
          expiresIn: this.config.get('TOKEN_EXPIRE_TIME'),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: id,
          login,
        },
        {
          secret: this.config.get('JWT_SECRET_REFRESH_KEY'),
          expiresIn: this.config.get('TOKEN_REFRESH_EXPIRE_TIME'),
        },
      ),
    ]);
    return {
      accessToken: at,
      refreshToken: rt,
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
      await this.updateRtHash(user.id, tokens.refreshToken);
      return tokens;
    }
  }

  async updateRtHash(id: string, rt: string) {
    const hash = await this.hashData(rt);
    await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

  async login(body: CreateUserDto): Promise<Tokens> {
    const user = await this.prisma.user.findFirst({
      where: {
        login: body.login,
      },
    });
    const matchPass = await bcrypt.compare(body.password, user.password);
    if (
      !user.password ||
      !user.login ||
      typeof body.password !== 'string' ||
      typeof body.login !== 'string' ||
      !matchPass
    )
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);

    if (!user) throw new HttpException('Cant find', HttpStatus.NOT_FOUND);

    const tokens = await this.getTokens(user.id, user.login);
    await this.updateRtHash(user.id, tokens.refreshToken);
    return tokens;
  }

  async refresh(id: string, rt: string): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    const rtMatch = await bcrypt.compare(rt, user.hashedRt);

    if (!user || !rtMatch || !user.hashedRt)
      throw new HttpException('Cant find', HttpStatus.NOT_FOUND);

    const tokens = await this.getTokens(user.id, user.login);
    await this.updateRtHash(user.id, tokens.refreshToken);
    return tokens;
  }
}
