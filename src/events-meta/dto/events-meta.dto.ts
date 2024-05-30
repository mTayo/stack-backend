import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
  IsInt,
} from 'class-validator';

export class EventsMetaDto {
  @IsNotEmpty()
  @IsString()
  event_id: string;

  @IsInt()
  schedule_interval: number;

  @IsOptional()
  @IsDateString()
  last_schedule_date: Date;

  @IsNotEmpty()
  @IsDateString()
  next_schedule_date: Date;

  @IsDateString()
  event_date: Date;
}
