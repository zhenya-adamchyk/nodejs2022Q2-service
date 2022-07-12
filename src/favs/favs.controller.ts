import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { FavoritesService } from "../shared/favorites.service";
import { TrackDto } from "../track/dto/track.dto";
import { AlbumDto } from "../album/dto/album.dto";
import { ArtistDto } from "../artist/dto/artist.dto";

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavoritesService) {
  }
  @Get()
  getFavs() {
    this.favsService.getFavs();
  }

  @Post()
  pushTrack(@Body() trackDto: TrackDto) {
    return this.favsService.pushTrack(trackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id') id: string) {
    return this.favsService.deleteTrack(id);
  }

  @Post()
  pushAlbum(@Body() albumDto: AlbumDto) {
    return this.favsService.pushAlbum(albumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param('id') id: string) {
    return this.favsService.deleteAlbum(id);
  }

  @Post()
  pushArtist(@Body() artistDto: ArtistDto) {
    return this.favsService.pushArtist(artistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id') id: string) {
    return this.favsService.deleteArtist(id);
  }
}
