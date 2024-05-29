import { Global, Module } from '@nestjs/common';
import { EventsMetaService } from './events-meta.service';

@Global()
@Module({
  providers: [EventsMetaService],
  exports: [EventsMetaService],
})
export class EventsMetaModule {}
