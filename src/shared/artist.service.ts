import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ArtistDto } from '../artist/dto/artist.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as uuid from 'uuid';

@Injectable()
export class ArtistService {
  constructor(private readonly prisma: PrismaService) {}

  async getArtists() {
    return await this.prisma.artist.findMany();
  }

  async getArtist(id) {
    const artist = await this.prisma.artist.findFirst({ where: { id: id } });
    if (!uuid.validate(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST);
    } else if (!artist) {
      throw new HttpException('Cant find', HttpStatus.NOT_FOUND);
    } else {
      return artist;
    }
  }

  async updateArtist(body: ArtistDto, id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id: id } });
    if (
      !body.name ||
      !body.hasOwnProperty('grammy') ||
      typeof body.grammy !== 'boolean'
    ) {
      throw new HttpException(
        'name and grammy required',
        HttpStatus.BAD_REQUEST,
      );
    } else if (!uuid.validate(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST);
    } else if (!artist) {
      throw new HttpException('Cant find', HttpStatus.NOT_FOUND);
    } else {
      await this.prisma.artist.updateMany({
        where: { id: id },
        data: { name: body.name, grammy: body.grammy },
      });
      return await this.prisma.artist.findUnique({ where: { id: id } });
    }
  }

  async deleteArtist(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id: id } });
    if (!uuid.validate(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST);
    } else if (!artist) {
      throw new HttpException('Cant find', HttpStatus.NOT_FOUND);
    } else {
      await this.prisma.artist.deleteMany({ where: { id: id } });

      await this.prisma.track.updateMany({
        where: { artistId: id },
        data: { artistId: null },
      });
      await this.prisma.album.updateMany({
        where: { artistId: id },
        data: { artistId: null },
      });
    }
  }

  async createArtist(body: ArtistDto) {
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
      const artistId = uuid.v4();
      return await this.prisma.artist.create({
        data: { name: body.name, grammy: body.grammy, id: artistId },
      });
    }
  }
}
