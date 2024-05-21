import { IsBoolean, IsNotEmpty, MinLength } from 'class-validator';

export class EventsTypeDto {
  @MinLength(3)
  @IsNotEmpty()
  title: string;

  @IsBoolean()
  is_default?: boolean;
}
