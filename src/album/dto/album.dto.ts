import { IsInt, IsString } from 'class-validator';

export class AlbumDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsInt()
  year: number;

  artistId: string | null;
}
