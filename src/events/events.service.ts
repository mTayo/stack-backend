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
import { Frequency, Operators } from '@prisma/client';
import { EventsMetaService } from 'src/events-meta/events-meta.service';
import { EventsListingService } from 'src/events-listing/events-listing.service';

@Injectable()
export class EventsService {
  data: EventsDto;
  constructor(
    private prisma: PrismaService,
    private response: ResponseManagerService,
    private eventsMetaService: EventsMetaService,
    private eventsListingService: EventsListingService,
  ) {}

  createEvent = async (userId: string, data: EventsDto) => {
    try {
      this.data = data;
      const eventMetaPayload = this.createEventsMeta();
      const newEvent = await this.prisma.event.create({
        data: {
          title: data.title,
          note: data?.note,
          operator: Operators[data?.operator],
          event_type_id: data?.event_type_id,
          is_active: true,
          is_recurring: data.is_recurring,
          start_date: data?.start_date,
          end_date: data?.end_date,
          frequency: Frequency[data?.frequency],
          user_id: userId,
        },
      });
      eventMetaPayload.forEach(function (element) {
        element.event_id = newEvent?.id;
      });
      await this.eventsMetaService.batchInsertEventsMeta(eventMetaPayload);
      await this.eventsListingService.createEventListing({
        event_id: newEvent?.id,
        event_date: data?.start_date,
      });
      return this.response.createdResponse(newEvent);
    } catch (error) {
      throw error;
    }
  };

  getSingleEvent = async (eventId: string) => {
    try {
      const getSingleEvent = await this.prisma.event.findFirst({
        where: {
          id: eventId,
        },
        include: {
          event_listing: true,
        },
      });
      return this.response.retrieveRecordResponse(getSingleEvent);
    } catch (error) {
      throw error;
    }
  };

  createEventsMeta = () => {
    let eventsMetaPayload: any = [];
    const { frequency } = this.data;
    switch (frequency) {
      case appConstanst.CUSTOM:
        eventsMetaPayload = this.handleCustomEvents();
        break;
      case appConstanst.DAILY:
        eventsMetaPayload = this.handleDailyEvents();
      case appConstanst.WEEKLY:
        eventsMetaPayload = this.handleWeeklyEvents();
      case appConstanst.MONTHLY:
        eventsMetaPayload = this.handleMonthlyEvents();
      case appConstanst.YEARLY:
        eventsMetaPayload = this.handleYearlyEvents();
      default:
        break;
    }
    return eventsMetaPayload;
  };

  handleDailyEvents = () => {
    const datum = this.data;
    return this.computeDailyEvents(datum.start_date, 1);
  };

  handleWeeklyEvents = () => {
    const datum = this.data;
    const { intervals }: any = datum;
    return this.computeWeeklyEvents(datum.start_date, 1, intervals.days);
  };

  handleMonthlyEvents = () => {
    const datum = this.data;
    const { intervals }: any = datum;
    return this.computeMonthlyEvents(datum.start_date, 1, intervals.days);
  };

  handleYearlyEvents = () => {
    const datum = this.data;
    const { intervals }: any = datum;
    return this.computeYearlyEvents(
      datum.start_date,
      1,
      intervals.months,
      intervals.days,
    );
  };

  handleCustomEvents = () => {
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
        event_meta = this.computeMonthlyEvents(
          date,
          intervals.interval,
          intervals.days,
        );
        break;
      case appConstanst.YEARLY:
        event_meta = this.computeYearlyEvents(
          date,
          intervals.interval,
          intervals.months,
          intervals.days,
        );
        break;
      default:
        event_meta = [];
        break;
    }
    return event_meta;
  };

  computeDailyEvents = (startDate: Date, interval: number) => {
    const returnArr = [];
    const nextDate = addDayToDate(new Date(startDate), 1);
    const difference = differenceBtwDates(startDate, new Date(nextDate));
    returnArr.push({
      schedule_interval: difference,
      last_schedule_date: startDate,
      next_schedule_date: nextDate,
    });

    return returnArr;
  };
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
        last_schedule_date: startDate,
        next_schedule_date: addDayToDate(startDate, element),
      });
    }
    return returnArr;
  };
  computeYearlyEvents = (
    startDate: Date,
    interval: number,
    selectedMonths: Array<number>,
    selectedDays: Array<number>,
  ) => {
    const returnArr = [];
    const getYear = addYearsToDate(new Date(startDate), interval);
    for (let index = 0; index < selectedMonths.length; index++) {
      const element = selectedMonths[index];
      let date2 = addMonthsToDate(new Date(getYear), element);
      for (let j = 0; j < selectedDays.length; j++) {
        const el = selectedDays[j];
        date2 = addDayToDate(new Date(date2), el);
        const difference = differenceBtwDates(startDate, new Date(date2));
        returnArr.push({
          schedule_interval: difference,
          last_schedule_date: startDate,
          next_schedule_date: addDayToDate(startDate, element),
        });
      }
    }
    return returnArr;
  };
}
