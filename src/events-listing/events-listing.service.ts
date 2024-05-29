import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventsListingService {
  constructor(private prisma: PrismaService) {}

  createEventListing = async (payload: any) => {
    try {
      const createEvent = await this.prisma.eventListing.create({
        data: payload,
      });
      return createEvent;
    } catch (error) {
      throw error;
    }
  };
}
