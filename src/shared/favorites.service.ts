import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

enum InfoForUser {
  BAD_REQUEST = 'Bad request. Id is invalid (not uuid)',
  ADDED_SUCCESSFULY = 'Added successfully',
}

@Injectable()
export class FavoritesService {
  data: string;
  id: number;

  constructor(private readonly prisma: PrismaService) {
    this.data = 'favorites';
    this.id = 0;
  }

  private async initFavs() {
    try {
      await this.prisma.favorites.findUniqueOrThrow({
        where: { id: this.id },
      });
    } catch (error) {
      try {
        await this.prisma.favorites.create({
          data: { id: this.id },
        });
      } catch (error) {
        console.log('ERROR INITIAL FAVS:', error);
      }
    }
  }

  async getFavs() {
    await this.initFavs();
    return await this.prisma.favorites.findUnique({
      where: { id: this.id },
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
  }

  async create(id: string, type: string) {
    try {
      await this.initFavs();

      await this.prisma[type].update({
        where: { id },
        data: { favId: this.id },
      });

      const data = {
        statusCode: HttpStatus.CREATED,
        message: InfoForUser.ADDED_SUCCESSFULY,
      };

      return data;
    } catch (error) {
      throw new UnprocessableEntityException(this.favNotFound(type));
    }
  }

  async remove(id: string, type: string): Promise<void> {
    try {
      await this.initFavs();

      await this.prisma[type].update({
        where: { id },
        data: { favId: null },
      });
    } catch (err) {
      throw new NotFoundException(this.notFound(this.data));
    }
  }

  notFound(type: string) {
    return `${type[0].toUpperCase() + type.slice(1)} not found`;
  }

  favNotFound(type: string) {
    return `${type[0].toUpperCase() + type.slice(1)} with id doesn't exist`;
  }
}
