import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import * as uuid from 'uuid';
import { AlbumDto } from '../album/dto/album.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private readonly prisma: PrismaService) {}

  async getAlbums() {
    return await this.prisma.album.findMany();
  }

  async getAlbum(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id: id } });
    if (!uuid.validate(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST);
    } else if (!album) {
      throw new HttpException('Cant find', HttpStatus.NOT_FOUND);
    } else {
      return album;
    }
  }

  async updateAlbum(body: AlbumDto, id: string) {
    const artistId = body.artistId;
    const album = await this.prisma.album.findUnique({ where: { id: id } });
    if (!body.name || !body.year || typeof body.name !== 'string') {
      throw new HttpException('name and year required', HttpStatus.BAD_REQUEST);
    } else if (!uuid.validate(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST);
    } else if (!album) {
      throw new HttpException('Cant find', HttpStatus.NOT_FOUND);
    } else {
      await this.prisma.album.updateMany({
        where: { id: id },
        data: { name: body.name, year: body.year, artistId: artistId },
      });
      return await this.prisma.album.findUnique({ where: { id: id } });
    }
  }

  async deleteAlbum(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id: id } });
    if (!uuid.validate(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST);
    } else if (!album) {
      throw new HttpException('Cant find', HttpStatus.NOT_FOUND);
    } else {
      await this.prisma.album.deleteMany({ where: { id: id } });
    }
  }

  async createAlbum(body: AlbumDto) {
    if (!body.name || !body.year) {
      throw new HttpException('name and year required', HttpStatus.BAD_REQUEST);
    } else {
      const albumId = uuid.v4();
      return await this.prisma.album.create({
        data: { name: body.name, year: body.year, id: albumId },
      });
    }
  }
}
