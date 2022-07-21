import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import * as uuid from 'uuid';
import { TrackDto } from '../track/dto/track.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private readonly prisma: PrismaService) {}

  async getTracks() {
    return await this.prisma.track.findMany();
  }

  async getTrack(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id: id } });
    if (!uuid.validate(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST);
    } else if (!track) {
      throw new HttpException('Cant find', HttpStatus.NOT_FOUND);
    } else {
      return track;
    }
  }

  async updateTrack(body: TrackDto, id: string) {
    const track = await this.getTrack(id);
    if (!body.name || !body.duration) {
      throw new HttpException(
        'name and duration required',
        HttpStatus.BAD_REQUEST,
      );
    } else if (!uuid.validate(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST);
    } else if (!track) {
      throw new HttpException('Cant find', HttpStatus.NOT_FOUND);
    } else {
      await this.prisma.track.updateMany({
        where: { id: id },
        data: { name: body.name, duration: body.duration },
      });
      return await this.getTrack(id);
    }
  }

  async deleteTrack(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id: id } });
    if (!uuid.validate(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST);
    } else if (!track) {
      throw new HttpException('Cant find', HttpStatus.NOT_FOUND);
    } else {
      await this.prisma.track.deleteMany({ where: { id: id } });
    }
  }

  async createTrack(body: TrackDto) {
    if (!body.name || !body.duration) {
      throw new HttpException(
        'name and duration required',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const trackId = uuid.v4();
      return await this.prisma.track.create({
        data: { name: body.name, duration: body.duration, id: trackId },
      });
    }
  }
}
