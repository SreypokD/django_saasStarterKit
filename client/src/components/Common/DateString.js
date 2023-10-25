import {format, parse ,parseISO} from 'date-fns';

export const DateString =({dateString}) => {
  const date = parseISO( dateString);
  const formattedDate = format(date, 'd-MMMM-yyyy');
  return formattedDate;
}