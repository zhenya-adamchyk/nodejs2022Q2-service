import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
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

  @Post('track/:id')
  pushTrack(@Param('id') id: string) {
    return this.favsService.pushTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id') id: string) {
    return this.favsService.deleteTrack(id);
  }

  @Post('album/:id')
  pushAlbum(@Param('id') id: string) {
    return this.favsService.pushAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param('id') id: string) {
    return this.favsService.deleteAlbum(id);
  }

  @Post('artist/:id')
  pushArtist(@Param('id') id: string) {
    return this.favsService.pushArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id') id: string) {
    return this.favsService.deleteArtist(id);
  }
}
