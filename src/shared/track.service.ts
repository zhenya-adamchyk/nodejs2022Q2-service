import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import * as uuidv from 'uuid';
import { TrackDto } from '../track/dto/track.dto';
import { wrongIdOrCantFind } from '../helpers/wrongIdOrCantFind';
import { FavoritesService } from './favorites.service';

@Injectable()
export class TrackService {
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}
  tracks: TrackDto[] = [];

  getTracks() {
    return this.tracks;
  }

  getTrack(id: string) {
    wrongIdOrCantFind(id, this.tracks);
    return this.tracks.find((track: TrackDto) => track.id === id);
  }

  updateTrack(body: TrackDto, id: string) {
    if (!body.name || !body.duration) {
      throw new HttpException(
        'name and duration required',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      wrongIdOrCantFind(id, this.tracks);
      const newTrack = body;
      this.tracks = this.tracks.map((track: TrackDto) => {
        if (track.id === id) {
          newTrack.id = id;
          return newTrack;
        } else {
          return track;
        }
      });
      return newTrack;
    }
  }

  deleteTrack(id: string) {
    wrongIdOrCantFind(id, this.tracks);
    this.tracks = this.tracks.filter((track: TrackDto) => track.id !== id);
    this.favoritesService.deleteFromFavsWhenDeleteItem('tracks', id);
  }

  createTrack(body: TrackDto) {
    if (!body.name || !body.duration) {
      throw new HttpException(
        'name and duration required',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const newTrack = body;
      newTrack.id = uuidv.v4();
      this.tracks.push(newTrack);
      return newTrack;
    }
  }

  deleteArtistId(artistId: string) {
    this.tracks = this.tracks.map((track: TrackDto) => {
      if (artistId === track.artistId) {
        track.artistId = null;
      }
      return track;
    });
  }

  deleteAlbumId(albumId: string) {
    this.tracks = this.tracks.map((track: TrackDto) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
      return track;
    });
  }
}
