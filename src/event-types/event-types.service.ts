import { Injectable } from '@nestjs/common';
import { EventsTypeDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseManagerService } from 'src/response-manager/response-manager.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class EventTypesService {
  constructor(
    private prisma: PrismaService,
    private response: ResponseManagerService,
  ) {}
  async createEventType(dto: EventsTypeDto) {
    try {
      const findEventType = await this.prisma.eventType.findFirst({
        where: {
          title: dto.title,
        },
      });

      if (!findEventType) {
        const newEventType = await this.prisma.eventType.create({
          data: {
            title: dto.title,
            is_default: dto.is_default,
          },
        });
        return this.response.createdResponse(newEventType);
      } else {
        return this.response.conflictResponse('Record already exist');
      }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return this.response.conflictResponse('Record already exist');
        }
      }
      throw error;
    }
  }
}
