import { IsInt, IsString } from 'class-validator';

export class TrackDto {
  @IsString()
  id?: string;

  @IsString()
  name: string;
  artistId: string | null;
  albumId: string | null;

  @IsInt()
  duration: number;
}
