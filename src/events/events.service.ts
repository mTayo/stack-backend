/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseManagerService } from 'src/response-manager/response-manager.service';
import { EventsDto } from './dto';

@Injectable()
export class EventsService {
  constructor(
    private prisma: PrismaService,
    private response: ResponseManagerService,
  ) {}

  createEvent(userId: string, data: EventsDto) {
    // console.log('here', userId, data, 'cold boy');
  }
}
