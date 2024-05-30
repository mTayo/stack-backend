import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';

export class EventsListingDto {
  @IsNotEmpty()
  @IsString()
  event_id: string;

  @IsOptional()
  note?: string;

  @IsDateString()
  event_date: Date;
}
