import { Injectable } from '@nestjs/common';
import { TrackDto } from "../track/dto/track.dto";
import { ArtistDto } from "../artist/dto/artist.dto";
import { AlbumDto } from "../album/dto/album.dto";

@Injectable()
export class FavoritesService {

  favs = {
    artists: [],
    albums: [],
    tracks: [],
  };

  getFavs() {

  }

  pushTrack(body: TrackDto) {

  }

  deleteTrack(id: string) {

  }

  pushArtist(body: ArtistDto) {

  }

  deleteArtist(id: string) {

  }

  pushAlbum(body: AlbumDto) {

  }

  deleteAlbum(id: string) {

  }

}
