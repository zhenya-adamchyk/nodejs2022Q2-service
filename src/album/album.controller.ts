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
import { AlbumService } from '../shared/album.service';
import { AlbumDto } from './dto/album.dto';
import { HttpExceptionFilter } from "../shared/http-exception.filter";

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @UseFilters(HttpExceptionFilter)
  @Get()
  getAlbums() {
    return this.albumService.getAlbums();
  }

  @UseFilters(HttpExceptionFilter)
  @Get(':id')
  getAlbum(@Param('id') id: string) {
    return this.albumService.getAlbum(id);
  }

  @UseFilters(HttpExceptionFilter)
  @Post()
  createAlbum(@Body() trackDto: AlbumDto) {
    return this.albumService.createAlbum(trackDto);
  }

  @UseFilters(HttpExceptionFilter)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param('id') id: string) {
    return this.albumService.deleteAlbum(id);
  }

  @UseFilters(HttpExceptionFilter)
  @Put(':id')
  updateAlbum(@Body() updateAlbumDto: AlbumDto, @Param('id') id: string) {
    return this.albumService.updateAlbum(updateAlbumDto, id);
  }
}
