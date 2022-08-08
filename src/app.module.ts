import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './shared/guards';
import { LoggingMiddleware } from './shared/logging.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
  ],
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
    // {
    //   provide: APP_GUARD,
    //   useClass: AtGuard,
    // },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
