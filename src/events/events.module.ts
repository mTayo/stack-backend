import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
// import { EventsMetaService } from 'src/events-meta/events-meta.service';

@Module({
  providers: [EventsService],
  // imports: [EventsMetaService],
  controllers: [EventsController],
})
export class EventsModule {}
