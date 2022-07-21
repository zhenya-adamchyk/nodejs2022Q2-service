import { Module } from '@nestjs/common';
import { TrackController } from './track/track.controller';
import { ConfigModule } from '@nestjs/config';
import { TrackService } from './shared/track.service';
import { FavoritesService } from './shared/favorites.service';
import { UserService } from './shared/user.service';
import { AlbumService } from './shared/album.service';
import { ArtistService } from './shared/artist.service';
import { AlbumController } from './album/album.controller';
import { ArtistController } from './artist/artist.controller';
import { FavsController } from './favs/favs.controller';
import { UserController } from './user/user.controller';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule],
  controllers: [
    TrackController,
    AlbumController,
    ArtistController,
    FavsController,
    UserController,
  ],
  providers: [
    TrackService,
    FavoritesService,
    UserService,
    AlbumService,
    ArtistService,
  ],
})
export class AppModule {}
