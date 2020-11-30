import { getYMDFormatDate, getYMDAndHourFormatDate } from 'utils/getCustomFormatDate';

export function nvl(value, returnValue) {
  return (value === null || value === void 0) ? returnValue : value;
}

export function nvlDateTypeReturnToString(value, returnValue) {
  if (value === null || value === void 0) {
    return returnValue;
  }

  const checkDate = new Date(value);
  if (checkDate instanceof Date && !isNaN(checkDate)) {
    return getYMDAndHourFormatDate(checkDate);
  }

  return returnValue;
}

export function nvlDateTypeReturnToStringOnlyDate(value, returnValue) {
  if (value === null || value === void 0) {
    return returnValue;
  }

  const checkDate = new Date(value);
  if (checkDate instanceof Date && !isNaN(checkDate)) {
    return getYMDFormatDate(checkDate);
  }

  return returnValue;
}

export function nvlDateTypeReturnToDate(value, returnValue) {
  if (value === null || value === void 0) {
    return returnValue;
  }

  const checkDate = new Date(value);
  if (checkDate instanceof Date && !isNaN(checkDate)) {
    return checkDate;
  }

  return returnValue;
}