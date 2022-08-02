import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Tokens } from './types/tokens.type';
import { GetUser, GetUserId, Public } from '../shared/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() dto: CreateUserDto): Promise<Tokens> {
    return this.authService.signup(dto);
  }

  @Public()
  @Post('/login')
  login(@Body() dto: CreateUserDto): Promise<Tokens> {
    return this.authService.login(dto);
  }

  @Public()
  // @UseGuards(RtGuard)
  @Post('/refresh')
  refresh(
    @GetUserId() id: string,
    @GetUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refresh(id, refreshToken);
  }
}
