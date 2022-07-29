import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoritesService } from '../shared/favorites.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavoritesService) {}

  @Get()
  getFavs() {
    return this.favsService.getFavs();
  }

  @Post(':type/:id')
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Param('type') type,
  ): any {
    return this.favsService.create(id, type);
  }

  @Delete(':type/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Param('type') type,
  ): Promise<void> {
    return this.favsService.remove(id, type);
  }
}
