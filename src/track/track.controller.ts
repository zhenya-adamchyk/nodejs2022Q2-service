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
  UseFilters,
} from '@nestjs/common';
import { TrackDto } from './dto/track.dto';
import { TrackService } from '../shared/track.service';
import { HttpExceptionFilter } from '../shared/http-exception.filter';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @UseFilters(HttpExceptionFilter)
  @Get()
  getTracks() {
    return this.trackService.getTracks();
  }

  @UseFilters(HttpExceptionFilter)
  @Get(':id')
  getTrack(@Param('id') id: string) {
    return this.trackService.getTrack(id);
  }

  @UseFilters(HttpExceptionFilter)
  @Post()
  createTrack(@Body() trackDto: TrackDto) {
    return this.trackService.createTrack(trackDto);
  }

  @UseFilters(HttpExceptionFilter)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id') id: string) {
    return this.trackService.deleteTrack(id);
  }

  @UseFilters(HttpExceptionFilter)
  @Put(':id')
  updateTrack(@Body() updateTrackDto: TrackDto, @Param('id') id: string) {
    return this.trackService.updateTrack(updateTrackDto, id);
  }
}
