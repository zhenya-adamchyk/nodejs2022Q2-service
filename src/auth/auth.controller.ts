import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post, UseFilters,
  UseGuards
} from "@nestjs/common";
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Tokens } from './types/tokens.type';
import { AtGuard, RtGuard } from '../shared/guards';
import { GetUser, GetUserId, Public } from '../shared/decorators';
import { HttpExceptionFilter } from "../shared/http-exception.filter";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseFilters(HttpExceptionFilter)
  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() dto: CreateUserDto): Promise<Tokens> {
    return this.authService.signup(dto);
  }

  @Public()
  @UseFilters(HttpExceptionFilter)
  @Post('/login')
  login(@Body() dto: CreateUserDto): Promise<Tokens> {
    return this.authService.login(dto);
  }

  @Public()
  // @UseGuards(RtGuard)
  @UseFilters(HttpExceptionFilter)
  @Post('/refresh')
  refresh(
    @GetUserId() id: string,
    @GetUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refresh(id, refreshToken);
  }
}
