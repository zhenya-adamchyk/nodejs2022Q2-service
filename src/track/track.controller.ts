import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TrackDto } from './dto/track.dto';
import { TrackService } from '../shared/track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}
  @Get()
  getTracks() {
    return this.trackService.getTracks();
  }

  @Get(':id')
  getTrack(@Param('id') id: string) {
    return this.trackService.getTrack(id);
  }

  @Post()
  createTrack(@Body() trackDto: TrackDto) {
    return this.trackService.createTrack(trackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id') id: string) {
    return this.trackService.deleteTrack(id);
  }

  @Put(':id')
  updateTrack(@Body() updateTrackDto: TrackDto, @Param('id') id: string) {
    return this.trackService.updateTrack(updateTrackDto, id);
  }
}
