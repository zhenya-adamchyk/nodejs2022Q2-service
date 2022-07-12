import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuidv from 'uuid';
import { AlbumDto } from '../album/dto/album.dto';
import { wrongIdOrCantFind } from '../helpers/wrongIdOrCantFind';
import { TrackService } from './track.service';

@Injectable()
export class AlbumService {
  constructor(private readonly trackService: TrackService) {}

  albums: AlbumDto[] = [];

  getAlbums() {
    return this.albums;
  }

  getAlbum(id: string) {
    wrongIdOrCantFind(id, this.albums);
    return this.albums.find((album: AlbumDto) => album.id === id);
  }

  updateAlbum(body: AlbumDto, id: string) {
    if (!body.name || !body.year || typeof body.name !== 'string') {
      throw new HttpException('name and year required', HttpStatus.BAD_REQUEST);
    } else {
      wrongIdOrCantFind(id, this.albums);
      const newAlbum = body;
      this.albums = this.albums.map((album: AlbumDto) => {
        if (album.id === id) {
          newAlbum.id = id;
          return newAlbum;
        } else {
          return album;
        }
      });
      return newAlbum;
    }
  }

  deleteAlbum(id: string) {
    wrongIdOrCantFind(id, this.albums);
    this.trackService.deleteAlbumId(id);
    this.albums = this.albums.filter((album: AlbumDto) => album.id !== id);
  }

  createAlbum(body: AlbumDto) {
    if (!body.name || !body.year) {
      throw new HttpException('name and year required', HttpStatus.BAD_REQUEST);
    } else {
      const newAlbum = body;
      newAlbum.id = uuidv.v4();
      this.albums.push(newAlbum);
      return newAlbum;
    }
  }
}
