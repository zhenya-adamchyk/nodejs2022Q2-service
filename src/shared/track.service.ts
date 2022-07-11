import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuidv from 'uuid';
import { TrackDto } from '../track/dto/track.dto';

@Injectable()
export class TrackService {
  tracks = [];

  getTracks() {
    return this.tracks;
  }

  getTrack(id: string) {
    this.wrongIdOrCantFind(id);
    return this.tracks.find((track: TrackDto) => track.id === id);
  }

  updateTrack(body: TrackDto, id: string) {
    this.wrongIdOrCantFind(id);
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
    this.wrongIdOrCantFind(id);
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

  wrongIdOrCantFind(id: string) {
    if (!uuidv.validate(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST);
    } else if (!this.isTrackExist(id)) {
      throw new HttpException('Cant find', HttpStatus.NOT_FOUND);
    }
  }

  isTrackExist(id: string): boolean {
    return !!this.tracks.find((track: TrackDto) => track.id === id);
  }
}
