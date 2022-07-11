import { Module } from '@nestjs/common';
import { TrackController } from './track/track.controller';
import { ConfigModule } from '@nestjs/config';
import { TrackService } from './shared/track.service';
import { FavoritesService } from './shared/favorites.service';
import { UserService } from './shared/user.service';
import { AlbumService } from './shared/album.service';
import { ArtistService } from './shared/artist.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [TrackController],
  providers: [
    TrackService,
    FavoritesService,
    UserService,
    AlbumService,
    ArtistService,
  ],
})
export class AppModule {}
