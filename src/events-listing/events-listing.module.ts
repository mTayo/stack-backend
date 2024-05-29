import { Global, Module } from '@nestjs/common';
import { EventsListingService } from './events-listing.service';

@Global()
@Module({
  providers: [EventsListingService],
  exports: [EventsListingService],
})
export class EventsListingModule {}
