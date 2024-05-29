import { Test, TestingModule } from '@nestjs/testing';
import { EventsMetaService } from './events-meta.service';

describe('EventsMetaService', () => {
  let service: EventsMetaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsMetaService],
    }).compile();

    service = module.get<EventsMetaService>(EventsMetaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
