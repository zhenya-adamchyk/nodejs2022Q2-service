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
import { ArtistService } from '../shared/artist.service';
import { ArtistDto } from './dto/artist.dto';
import { HttpExceptionFilter } from "../shared/http-exception.filter";

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @UseFilters(HttpExceptionFilter)
  @Get()
  getArtists() {
    return this.artistService.getArtists();
  }

  @UseFilters(HttpExceptionFilter)
  @Get(':id')
  getArtist(@Param('id') id: string) {
    return this.artistService.getArtist(id);
  }

  @UseFilters(HttpExceptionFilter)
  @Post()
  createArtist(@Body() artistDto: ArtistDto) {
    return this.artistService.createArtist(artistDto);
  }

  @UseFilters(HttpExceptionFilter)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id') id: string) {
    return this.artistService.deleteArtist(id);
  }

  @UseFilters(HttpExceptionFilter)
  @Put(':id')
  updateArtist(@Body() updateArtistDto: ArtistDto, @Param('id') id: string) {
    return this.artistService.updateArtist(updateArtistDto, id);
  }
}
