import { Body, Controller, Post } from '@nestjs/common';
import { EventsDto } from './dto';
import { Event } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private eventService: EventsService) {}
  @Post()
  createEvent(@GetUser() user: Event, @Body() dto: EventsDto) {
    return this.eventService.createEvent(user?.id, dto);
  }
}
