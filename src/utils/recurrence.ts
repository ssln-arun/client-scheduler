import type { Booking } from '../types';

export const getRecurringBookingsForDate = (bookings: Booking[], date: string): Booking[] => {
  const day = new Date(date).getDay();
  return bookings
    .filter(b => b.recurrence === 'weekly' && new Date(b.date).getDay() === day)
    .map(b => ({ ...b, date }));
};