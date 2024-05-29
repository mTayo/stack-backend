import { Test, TestingModule } from '@nestjs/testing';
import { EventsListingService } from './events-listing.service';

describe('EventsListingService', () => {
  let service: EventsListingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsListingService],
    }).compile();

    service = module.get<EventsListingService>(EventsListingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
