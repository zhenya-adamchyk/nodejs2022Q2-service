import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as uuid from 'uuid';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async getFavs() {
    const favs = await this.prisma.favorites.findMany({
      select: {
        artists: { select: { id: true, name: true, grammy: true } },
        albums: {
          select: { id: true, name: true, year: true, artistId: true },
        },
        tracks: {
          select: {
            id: true,
            name: true,
            duration: true,
            artistId: true,
            albumId: true,
          },
        },
      },
    });

    return {
      artists: favs.length && favs[0].artists ? favs[0].artists : [],
      albums: favs.length && favs[0].albums ? favs[0].albums : [],
      tracks: favs.length && favs[0].tracks ? favs[0].tracks : [],
    };
  }

  async pushTrack(id: string) {
    const track = await this.prisma.track.findFirst({ where: { id } });
    if (!uuid.validate(id))
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST);
    if (!track)
      throw new HttpException(
        'cant find user',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    const favs = await this.prisma.favorites.findMany();

    if (!favs.length) {
      const createdFavs = await this.prisma.favorites.create({ data: {} });
      await this.prisma.track.update({
        where: { id },
        data: { favId: createdFavs.id },
      });
    } else {
      await this.prisma.track.update({
        where: { id },
        data: { favId: favs[0].id },
      });
    }

    return { statusCode: 201, message: 'Added track' };
  }

  async deleteTrack(id: string) {
    return await this.prisma.track.update({
      where: { id },
      data: { favId: { set: null } },
    });
  }

  async pushArtist(id: string) {
    const artist = await this.prisma.artist.findFirst({ where: { id } });
    if (!uuid.validate(id))
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST);
    if (!artist)
      throw new HttpException(
        'cant find artist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    const favs = await this.prisma.favorites.findMany();

    console.log(favs)

    if (!favs.length) {
      const createdFavs = await this.prisma.favorites.create({ data: {} });
      await this.prisma.artist.update({
        where: { id },
        data: { favId: createdFavs.id },
      });
    } else {
      await this.prisma.artist.update({
        where: { id },
        data: { favId: favs[0].id },
      });
    }

    return { statusCode: 201, message: 'Added artist' };
  }

  async deleteArtist(id: string) {
    return await this.prisma.artist.update({
      where: { id },
      data: { favId: { set: null } },
    });
  }

  async pushAlbum(id: string) {
    const album = await this.prisma.album.findFirst({ where: { id } });
    if (!uuid.validate(id))
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST);
    if (!album)
      throw new HttpException(
        'cant find album',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    const favs = await this.prisma.favorites.findMany();

    if (!favs.length) {
      const createdFavs = await this.prisma.favorites.create({ data: {} });
      await this.prisma.album.update({
        where: { id },
        data: { favId: createdFavs.id },
      });
    } else {
      await this.prisma.album.update({
        where: { id },
        data: { favId: favs[0].id },
      });
    }

    return { statusCode: 201, message: 'Added album' };
  }

  async deleteAlbum(id: string) {
    return await this.prisma.album.update({
      where: { id },
      data: { favId: { set: null } },
    });
  }
}
