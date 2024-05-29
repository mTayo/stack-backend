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
  addYearsToDate,
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
    let event_meta: any = [];
    switch (intervals.frequency) {
      case appConstanst.WEEKLY:
        event_meta = this.computeWeeklyEvents(
          date,
          intervals.interval,
          intervals.days,
        );
        break;
      case appConstanst.MONTHLY:
        event_meta = this.computeWeeklyEvents(
          date,
          intervals.interval,
          intervals.days,
        );
        break;
      case appConstanst.YEARLY:
        const getYear = addYearsToDate(
          new Date(datum.start_date),
          intervals.interval,
        );
        for (let index = 0; index < intervals.months.length; index++) {
          const element = intervals.months[index];
          let date2 = addMonthsToDate(new Date(getYear), element);
          for (let j = 0; j < intervals.days.length; j++) {
            const el = intervals.days[j];
            date2 = addDayToDate(new Date(date2), el);
            const difference = differenceBtwDates(date, new Date(date2));
            event_meta.push({
              schedule_interval: difference,
              last_schedule_date: date,
              next_schedule_date: addDayToDate(date, element),
            });
          }
        }
        break;
      default:
        break;
    }
  }

  computeWeeklyEvents = (
    startDate: Date,
    interval: number,
    selectedDays: Array<number>,
  ) => {
    const returnArr = [];
    for (let index = 0; index < selectedDays.length; index++) {
      const element = selectedDays[index];
      let date2 = addWeeksToDate(new Date(startDate), interval);
      date2 = addDayToDate(new Date(date2), element);
      const difference = differenceBtwDates(startDate, new Date(date2));
      returnArr.push({
        schedule_interval: difference,
        last_schedule_date: null,
        next_schedule_date: addDayToDate(startDate, element),
      });
    }
    return returnArr;
  };
  computeMonthlyEvents = (
    startDate: Date,
    interval: number,
    selectedDays: Array<number>,
  ) => {
    const returnArr = [];
    for (let index = 0; index < selectedDays.length; index++) {
      const element = selectedDays[index];
      let date2 = addMonthsToDate(new Date(startDate), interval);
      date2 = addDayToDate(new Date(date2), element);
      const difference = differenceBtwDates(startDate, new Date(date2));
      returnArr.push({
        schedule_interval: difference,
        last_schedule_date: null,
        next_schedule_date: addDayToDate(startDate, element),
      });
    }
    return returnArr;
  };
  computeYearlyEvents = () => {};
}
