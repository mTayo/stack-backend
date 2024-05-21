/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EventTypesService } from './event-types.service';
import { EventsTypeDto } from './dto';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@UseGuards(AuthGuard('jwt'))
@Controller('event-types')
export class EventTypesController {
  constructor(private eventTypesService: EventTypesService) {}

  @Post()
  createEventType(@GetUser() user: User, @Body() dto: EventsTypeDto) {
    return this.eventTypesService.createEventType(user?.id, dto);
  }

  @HttpCode(200)
  @Patch(':id')
  updateEventType(@Body() dto: EventsTypeDto, @Param('id') id: string) {
    return this.eventTypesService.updateEventType(id, dto);
  }

  @HttpCode(200)
  @Get()
  getAllEventType(@GetUser() user: User) {
    return this.eventTypesService.getAllEventTypes(user?.id);
  }
  @HttpCode(200)
  @Get(':id')
  getEventType(@GetUser() user: User, @Param('id') id: string) {
    return this.eventTypesService.getEventType(user?.id, id);
  }
}
