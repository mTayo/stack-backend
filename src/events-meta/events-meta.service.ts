import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EventsMetaDto } from './dto';

@Injectable()
export class EventsMetaService {
  constructor(private prisma: PrismaService) {}

  batchInsertEventsMeta = async (payload: Array<EventsMetaDto>) => {
    try {
      await this.prisma.eventsMeta.createMany({
        data: payload,
      });
    } catch (error) {
      throw error;
    }
  };
}
