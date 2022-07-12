import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistService } from '../shared/artist.service';
import { ArtistDto } from './dto/artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}
  @Get()
  getArtists() {
    return this.artistService.getArtists();
  }

  @Get(':id')
  getArtist(@Param('id') id: string) {
    return this.artistService.getArtist(id);
  }

  @Post()
  createArtist(@Body() artistDto: ArtistDto) {
    return this.artistService.createArtist(artistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id') id: string) {
    return this.artistService.deleteArtist(id);
  }

  @Put(':id')
  updateArtist(@Body() updateArtistDto: ArtistDto, @Param('id') id: string) {
    return this.artistService.updateArtist(updateArtistDto, id);
  }
}
