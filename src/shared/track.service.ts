import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuidv from 'uuid';
import { TrackDto } from '../track/dto/track.dto';
import { wrongIdOrCantFind } from '../helpers/wrongIdOrCantFind';

@Injectable()
export class TrackService {
  tracks: TrackDto[] = [];

  getTracks() {
    return this.tracks;
  }

  getTrack(id: string) {
    wrongIdOrCantFind(id, this.tracks);
    return this.tracks.find((track: TrackDto) => track.id === id);
  }

  updateTrack(body: TrackDto, id: string) {
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
  }

  deleteTrack(id: string) {
    wrongIdOrCantFind(id, this.tracks);
    this.tracks = this.tracks.filter((track: TrackDto) => track.id !== id);
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
    }
  }
}
