import { Module } from '@nestjs/common';
import { EventsListingService } from './events-listing.service';

@Module({
  providers: [EventsListingService],
  exports: [EventsListingService],
})
export class EventsListingModule {}
