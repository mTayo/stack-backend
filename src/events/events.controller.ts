import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { EventsDto } from './dto';
import { Event } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { EventsService } from './events.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('events')
export class EventsController {
  constructor(private eventService: EventsService) {}
  @Post()
  createEvent(@GetUser() user: Event, @Body() dto: EventsDto) {
    return this.eventService.createEvent(user?.id, dto);
  }
}
