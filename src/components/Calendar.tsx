import type { Booking } from '../types';
import TimeSlot from './TimeSlot';

export const TIMES = [
  '10:30 AM', '10:50 AM', '11:10 AM', '11:30 AM', '11:50 AM', '12:10 PM', '12:30 PM', '12:50 PM',
  '01:10 PM', '01:30 PM', '01:50 PM', '02:10 PM', '02:30 PM', '02:50 PM', '03:10 PM', '03:30 PM',
  '03:50 PM', '04:10 PM', '04:30 PM', '04:50 PM', '05:10 PM', '05:30 PM', '05:50 PM', '06:10 PM',
  '06:30 PM', '06:50 PM', '07:10 PM', '07:30 PM',
];

interface Props {
  date: string;
  bookings: Booking[];
  onBook: (time: string) => void;
  onDelete: (id: string) => void;
}

export default function Calendar({ date, bookings, onBook, onDelete }: Props) {
  const d = new Date(date);
  const formattedDate = `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${String(d.getFullYear()).slice(2)}`;

  return (
    <div className="p-4 bg-white dark:bg-zinc-900 rounded-xl shadow-md overflow-y-auto max-h-[90vh] transition-colors">
      <h2 className="text-xl font-bold mb-6 text-zinc-800 dark:text-zinc-100">
        Calendar for {formattedDate}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {TIMES.map((time) => {
          const [timePart, period] = time.split(' ');
          const [hourStr, minuteStr] = timePart.split(':');
          let hour = parseInt(hourStr, 10);
          const minute = parseInt(minuteStr, 10);

          if (period === 'PM' && hour !== 12) hour += 12;
          if (period === 'AM' && hour === 12) hour = 0;

          const slotTime = new Date(date);
          slotTime.setHours(hour, minute, 0, 0);

          const now = new Date();
          const isPast = slotTime < now;

          return (
            <TimeSlot
              key={time}
              time={time}
              bookings={bookings}
              onBook={onBook}
              onDelete={onDelete}
              isPast={isPast}
            />
          );
        })}
      </div>
    </div>
  );
}