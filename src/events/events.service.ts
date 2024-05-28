/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseManagerService } from 'src/response-manager/response-manager.service';
import { EventsDto } from './dto';
import { appConstanst } from 'src/constants';
import {
  differenceBtwDates,
  addDayToDate,
  addWeeksToDate,
  addMonthsToDate,
} from 'src/helpers';

@Injectable()
export class EventsService {
  data: EventsDto;
  constructor(
    private prisma: PrismaService,
    private response: ResponseManagerService,
  ) {}

  createEvent(userId: string, data: EventsDto) {
    const { frequency } = data;
    this.data = data;
    const payload = [];
    switch (frequency) {
      case appConstanst.CUSTOM:
        this.handleCustomEvents();
        break;

      default:
        break;
    }
  }

  handleCustomEvents() {
    const datum = this.data;
    const { intervals }: any = datum;
    const date = new Date(datum.start_date);
    const event_meta = [];
    switch (intervals.frequency) {
      case appConstanst.WEEKLY:
        // case appConstanst.MONTHLY:
        for (let index = 0; index < intervals.days.length; index++) {
          const element = intervals.days[index];
          let date2 = addWeeksToDate(
            new Date(datum.start_date),
            intervals.interval,
          );
          date2 = addDayToDate(new Date(date2), element);
          const difference = differenceBtwDates(date, new Date(date2));
          event_meta.push({
            schedule_interval: difference,
            last_schedule_date: date,
            next_schedule_date: addDayToDate(date, element),
          });
        }

        break;
      case appConstanst.MONTHLY:
        for (let index = 0; index < intervals.days.length; index++) {
          const element = intervals.days[index];
          let date2 = addMonthsToDate(
            new Date(datum.start_date),
            intervals.interval,
          );
          date2 = addDayToDate(new Date(date2), element);
          const difference = differenceBtwDates(date, new Date(date2));
          event_meta.push({
            schedule_interval: difference,
            last_schedule_date: date,
            next_schedule_date: addDayToDate(date, element),
          });
        }
        break;
      case appConstanst.YEARLY:
        const date2 = new Date(datum.start_date);
        date2.setFullYear(date.getFullYear() + intervals.interval);
        for (let index = 0; index < intervals.months.length; index++) {
          const element = intervals.months[index];
          date2.setMonth(element);
          for (let j = 0; j < intervals.days.length; j++) {
            const el = intervals.days[j];
            date2.setDate(date2.getDate() + el);
            console.log(date2);
          }

          // const date2 = new Date(datum.start_date);
          // date2.setDate(date2.getDate() + element);
          // const difference = differenceBtwDates(date, date2);
          // event_meta.push({
          //   schedule_interval: difference,
          //   last_schedule_date: date,
          //   next_schedule_date: getNextScheduleDate(date, element),
          // });
        }
        break;
      default:
        break;
    }
  }
}
