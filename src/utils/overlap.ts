import type { Booking } from '../types';

export const isSlotAvailable = (
  bookings: Booking[],
  slotTime: string,
  callType: 'onboarding' | 'followup'
): boolean => {
  const toMinutes = (t: string) => {
    const parts = t.split(' ');
    const time = parts[0];            
    const modifier = parts[1] || '';  

    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) {
      hours += 12;
    } else if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }

    return hours * 60 + minutes;
  };

  const slotStart = toMinutes(slotTime);
  const slotEnd = slotStart + (callType === 'onboarding' ? 40 : 20);

  for (const booking of bookings) {
    const bookingStart = toMinutes(booking.time);
    const bookingEnd =
      bookingStart + (booking.callType === 'onboarding' ? 40 : 20);

    if (slotStart < bookingEnd && slotEnd > bookingStart) {
      return false;
    }
  }

  return true;
};