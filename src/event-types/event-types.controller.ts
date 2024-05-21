/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EventTypesService } from './event-types.service';
import { EventsTypeDto } from './dto';

@UseGuards(AuthGuard('jwt'))
@Controller('event-types')
export class EventTypesController {
  constructor(private eventTypesService: EventTypesService) {}
  @Post('create')
  createEventType(@Body() dto: EventsTypeDto) {
    return this.eventTypesService.createEventType(dto);
  }
}
