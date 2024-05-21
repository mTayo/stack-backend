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
  async createEventType(userId: string, dto: EventsTypeDto) {
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
            user_id: userId,
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
  async updateEventType(id: string, dto: EventsTypeDto, userId: string) {
    try {
      const findEventType = await this.prisma.eventType.findFirst({
        where: {
          id,
          user_id: userId,
        },
      });

      if (findEventType) {
        const newEventType = await this.prisma.eventType.update({
          where: {
            id,
          },
          data: {
            title: dto.title,
          },
        });
        return this.response.updatedResponse(newEventType);
      } else {
        return this.response.notFoundResponse('Record not found');
      }
    } catch (error) {
      throw error;
    }
  }

  async getAllEventTypes(userId: string) {
    try {
      const findEventTypes = await this.prisma.eventType.findMany({
        where: {
          OR: [
            {
              user_id: {
                equals: userId,
              },
            },
            {
              AND: {
                is_default: {
                  equals: true,
                },
              },
            },
          ],
        },
        select: {
          id: true,
          title: true,
          is_default: true,
        },
      });
      return this.response.retrieveRecordResponse(findEventTypes);
    } catch (error) {
      throw error;
    }
  }
  async getEventType(userId: string | null, eventTypeId: string) {
    try {
      const findEventTypes = await this.prisma.eventType.findFirst({
        where: {
          OR: [
            {
              user_id: userId,
              id: eventTypeId,
            },
            {
              AND: {
                id: eventTypeId,
                is_default: true,
              },
            },
          ],
        },
        select: {
          id: true,
          title: true,
          is_default: true,
        },
      });
      return this.response.retrieveRecordResponse(findEventTypes);
    } catch (error) {
      throw error;
    }
  }
}
