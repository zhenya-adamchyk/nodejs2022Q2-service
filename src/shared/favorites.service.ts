import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { wrongIdOrCantFind } from '../helpers/wrongIdOrCantFind';
import { TrackDto } from '../track/dto/track.dto';
import { ArtistDto } from '../artist/dto/artist.dto';
import { AlbumDto } from '../album/dto/album.dto';
import { FavsDto } from '../favs/dto/favs.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async getFavs() {
    return await this.prisma.favorites.findMany();
  }

  pushTrack(id: string) {
    // const tracks = this.trackService.getTracks();
    // wrongIdOrCantFind(id, tracks, true);
    // this.favs.tracks.push(this.trackService.getTrack(id));
  }

  deleteTrack(id: string) {
    // wrongIdOrCantFind(id, this.favs.tracks, true);
    // this.favs.tracks = this.favs.tracks.filter(
    //   (track: TrackDto) => track.id !== id,
    // );
  }

  pushArtist(id: string) {
    // const artists = this.artistService.getArtists();
    // wrongIdOrCantFind(id, artists, true);
    // this.favs.artists.push(this.artistService.getArtist(id));
  }

  deleteArtist(id: string) {
    // wrongIdOrCantFind(id, this.favs.artists, true);
    // this.deleteAlbumIdFromTracks(id);
    // this.deleteArtistIdFromTracks(id);
    // this.favs.artists = this.favs.artists.filter(
    //   (artist: ArtistDto) => artist.id !== id,
    // );
  }

  pushAlbum(id: string) {
    // const albums = this.albumService.getAlbums();
    // wrongIdOrCantFind(id, albums, true);
    // this.favs.albums.push(this.albumService.getAlbum(id));
  }

  deleteAlbum(id: string) {
    // wrongIdOrCantFind(id, this.favs.albums, true);
    // this.deleteAlbumIdFromTracks(id);
    // this.favs.albums = this.favs.albums.filter(
    //   (album: AlbumDto) => album.id !== id,
    // );
  }

  deleteArtistIdFromTracks(id: string) {
    // this.favs.tracks = this.favs.tracks.map((track: TrackDto) => {
    //   if (track.artistId === id) {
    //     track.artistId = null;
    //   }
    //   return track;
    // });
  }

  deleteAlbumIdFromTracks(id: string) {
    // this.favs.tracks = this.favs.tracks.map((track: TrackDto) => {
    //   if (track.albumId === id) {
    //     track.albumId = null;
    //   }
    //   return track;
    // });
  }

  deleteFromFavsWhenDeleteItem(arrName: string, id: string) {
    // if (this.favs[arrName].length) {
    //   this.favs[arrName] = this.favs[arrName].filter(
    //     (item: TrackDto | AlbumDto | ArtistDto) => {
    //       return item.id !== id;
    //     },
    //   );
    // }
  }
}
