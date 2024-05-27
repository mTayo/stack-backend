import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MinLength,
  IsString,
  IsBoolean,
  IsDateString,
  ValidateIf,
} from 'class-validator';
import { ValidateEventInterval } from 'src/customValidator';

export enum OperatorTypes {
  'on' = 'on',
  'before' = 'before',
  'after' = 'after',
  'never' = 'never',
}

export enum FrquencyTypes {
  'daily' = 'daily',
  'weekly' = 'weekly',
  'monthly' = 'monthly',
  'yearly' = 'yearly',
  'custom' = 'custom',
  null = null,
}
export class EventsDto {
  @MinLength(3)
  @IsNotEmpty()
  title: string;

  @IsOptional()
  note?: string;

  @IsEnum(OperatorTypes)
  operator: string;

  @IsEnum(FrquencyTypes)
  @IsOptional()
  @ValidateIf((o) => o.is_recurring === true)
  frequency: string;

  @IsOptional()
  @IsString()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  event_type_id: string;

  @IsOptional()
  is_active?: boolean;

  @IsBoolean()
  is_recurring: boolean;

  @IsDateString()
  start_date: Date;

  @IsDateString()
  @IsOptional()
  end_date: Date;

  @ValidateEventInterval('intervals')
  @IsOptional()
  intervals: object;
}
// Weekly payload
// {
//     "title": "owambe",
//     "operator": "never",
//     "event_type_id": "d89f2637-87ca-42f8-b1ca-ba432718760e",
//     "note": "owambe for friends and family",
//     "is_recurring": true,
//     "start_date": "2024-05-26T11:32:30.287Z",
//     "frequency": "weekly",
//     "intervals": {
//         "daysOfWeek": "[1,2,5,7]"
//     ]
//   }

// Daily payload

// {
//   "title": "owambe",
//   "operator": "never",
//   "event_type_id": "d89f2637-87ca-42f8-b1ca-ba432718760e",
//   "note": "owambe for friends and family",
//   "is_recurring": true,
//   "start_date": "2024-05-26T11:32:30.287Z",
//   "frequency": "daily",
//   "intervals": null
// }

// Monthly payload

// {
//     "title": "owambe",
//     "operator": "never",
//     "event_type_id": "d89f2637-87ca-42f8-b1ca-ba432718760e",
//     "note": "owambe for friends and family",
//     "is_recurring": true,
//     "start_date": "2024-05-26T11:32:30.287Z",
//     "frequency": "monthly",
//     "intervals": {
//           "days": "[1,2,5,7]"
//       }
//   }

//  Yearly payload

// {
//     "title": "owambe",
//     "operator": "never",
//     "event_type_id": "d89f2637-87ca-42f8-b1ca-ba432718760e",
//     "note": "owambe for friends and family",
//     "is_recurring": true,
//     "start_date": "2024-05-26T11:32:30.287Z",
//     "frequency": "yearly",
//     "intervals": {
//           "months": "[1,3,6,9]",
//           "days": "[1,2,5,7,12,14, 16]"
//       }
//   }
