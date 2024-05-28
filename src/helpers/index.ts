/* eslint-disable @typescript-eslint/no-unused-vars */
import * as moment from 'moment';

export const isNotEmptyArray = (arr: any) =>
  Array.isArray(arr) && arr.length > 0;

export const differenceBtwDates = (date1: Date, date2: Date) => {
  const convertDate1 = moment(new Date(date1));
  const convertDate2 = moment(new Date(date2));
  return convertDate2.diff(convertDate1, 'hours');
};

export const addDayToDate = (date: Date, x: number) => {
  return moment(new Date(date)).add(x, 'days').toISOString();
};

export const addWeeksToDate = (date: Date, x: number) => {
  return moment(new Date(date)).add(x, 'weeks').toISOString();
};

export const addMonthsToDate = (date: Date, x: number) => {
  return moment(new Date(date)).add(x, 'months').toISOString();
};

export const addYearsToDate = (date: Date, x: number) => {
  return moment(new Date(date)).add(x, 'years').toISOString();
};

export const sortArrayLowestToHighest = (arr: Array<number>) =>
  arr.sort((a, b) => a - b);
