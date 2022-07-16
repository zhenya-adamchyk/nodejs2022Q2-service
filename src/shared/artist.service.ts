import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ArtistDto } from '../artist/dto/artist.dto';
import { wrongIdOrCantFind } from '../helpers/wrongIdOrCantFind';
import * as uuidv from 'uuid';
import { TrackService } from './track.service';
import { FavoritesService } from './favorites.service';

@Injectable()
export class ArtistService {
  constructor(
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}
  artists: ArtistDto[] = [];

  getArtists() {
    return this.artists;
  }

  getArtist(id) {
    wrongIdOrCantFind(id, this.artists);
    return this.artists.find((artist: ArtistDto) => artist.id === id);
  }

  updateArtist(body: ArtistDto, id: string) {
    if (
      !body.name ||
      !body.hasOwnProperty('grammy') ||
      typeof body.grammy !== 'boolean'
    ) {
      throw new HttpException(
        'name and grammy required',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      wrongIdOrCantFind(id, this.artists);
      const newArtist = body;
      this.artists = this.artists.map((artist: ArtistDto) => {
        if (artist.id === id) {
          newArtist.id = id;
          return newArtist;
        } else {
          return artist;
        }
      });
      return newArtist;
    }
  }

  deleteArtist(id: string) {
    wrongIdOrCantFind(id, this.artists);
    this.trackService.deleteArtistId(id);
    this.trackService.deleteAlbumId(id);
    this.artists = this.artists.filter((artist: ArtistDto) => artist.id !== id);
    this.favoritesService.deleteFromFavsWhenDeleteItem('artists', id);
  }

  createArtist(body: ArtistDto) {
    if (
      !body.name ||
      !body.hasOwnProperty('grammy') ||
      typeof body.grammy !== 'boolean'
    ) {
      throw new HttpException(
        'name and grammy required',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const newArtist = body;
      newArtist.id = uuidv.v4();
      this.artists.push(newArtist);
      return newArtist;
    }
  }
}
