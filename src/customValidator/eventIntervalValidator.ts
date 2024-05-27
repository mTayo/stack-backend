/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function ValidateEventInterval(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'ValidateEventInterval',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const { frequency, intervals, is_recurring }: any = args?.object;
          if (!is_recurring) return true;
          let validationArray = [];
          switch (frequency) {
            case 'custom':
              validationArray = validateEventPayload(intervals);
              break;
            case 'yearly':
              validationArray = validateEventPayload({
                ...intervals,
                frequency,
                interval: 1,
              });
            case 'monthly':
              validationArray = validateEventPayload({
                ...intervals,
                frequency,
                interval: 1,
              });
            case 'weekly':
              validationArray = validateEventPayload({
                ...intervals,
                frequency,
                interval: 1,
              });
            default:
              break;
          }
          args.object['validation'] = validationArray;
          return validationArray.length ? false : true;
        },
        defaultMessage(args: ValidationArguments) {
          let msg = '';
          if (args.object['validation'].length) {
            msg = args.object['validation'].toString();
          }
          delete args.object['validation'];
          return msg;
        },
      },
    });
  };
}

const validateEventPayload = (customIntervalObject: any) => {
  const { interval, months, days, frequency } = customIntervalObject;

  const validationArray = [];
  if (frequency === 'weekly') {
    if (isNaN(interval) || interval > 52) {
      validationArray.push('Invalid weekly interval');
    } else {
      const validateDays = validateDaysArray(days, frequency);
      if (validateDays.error) validationArray.push(validateDays.msg);
    }
  }

  if (frequency === 'monthly' || frequency === 'yearly') {
    if (isNaN(interval) || interval > 12) {
      validationArray.push('Invalid monthly interval');
    } else {
      const validateMonthDays = validateDaysArray(days, frequency);
      if (validateMonthDays.error) validationArray.push(validateMonthDays.msg);

      const validateMonthSelection = validateMonthsArray(months);
      if (validateMonthSelection.error)
        validationArray.push(validateMonthSelection.msg);
    }
  }

  return validationArray;
};

const validateDaysArray = (daysArray, frequency = 'monthly') => {
  if (Array.isArray(daysArray) && !daysArray.some(isNaN)) {
    for (let index = 0; index < daysArray.length; index++) {
      const element = daysArray[index];
      if (
        (frequency === 'weekly' && element > 7) ||
        (frequency === 'monthly' && element > 31)
      ) {
        return {
          error: true,
          msg:
            frequency === 'weekly'
              ? `${element} Invalid day selection: day selection not in the 7 days of the week`
              : `${element} Invalid day selection, day selection more than 31`,
        };
      }
    }
    return {
      error: false,
      msg: '',
    };
  } else {
    return { error: true, msg: 'Invalid days selection' };
  }
};

const validateMonthsArray = (monthsArray) => {
  if (Array.isArray(monthsArray) && !monthsArray.some(isNaN)) {
    for (let index = 0; index < monthsArray.length; index++) {
      const element = monthsArray[index];
      if (element > 12) {
        return {
          error: true,
          msg: `${element} Invalid month selection: max month selection should be December`,
        };
      }
    }
    return {
      error: false,
      msg: '',
    };
  } else {
    return { error: true, msg: 'Invalid month selection' };
  }
};
