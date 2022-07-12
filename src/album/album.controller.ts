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
import { AlbumService } from '../shared/album.service';
import { AlbumDto } from './dto/album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}
  @Get()
  getAlbums() {
    return this.albumService.getAlbums();
  }

  @Get(':id')
  getAlbum(@Param('id') id: string) {
    return this.albumService.getAlbum(id);
  }

  @Post()
  createAlbum(@Body() trackDto: AlbumDto) {
    return this.albumService.createAlbum(trackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param('id') id: string) {
    return this.albumService.deleteAlbum(id);
  }

  @Put(':id')
  updateAlbum(@Body() updateAlbumDto: AlbumDto, @Param('id') id: string) {
    return this.albumService.updateAlbum(updateAlbumDto, id);
  }
}
