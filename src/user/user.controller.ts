import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put, UseFilters
} from "@nestjs/common";
import { UserService } from '../shared/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { HttpExceptionFilter } from "../shared/http-exception.filter";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseFilters(HttpExceptionFilter)
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @UseFilters(HttpExceptionFilter)
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @UseFilters(HttpExceptionFilter)
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @UseFilters(HttpExceptionFilter)
  @Put(':id')
  updateUser(
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
    @Param('id') id: string,
  ) {
    return this.userService.updateUser(updateUserPasswordDto, id);
  }

  @UseFilters(HttpExceptionFilter)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
