import { isSlotAvailable } from '../utils/overlap';
import type { Booking } from '../types';

type Props = {
  time: string;
  bookings: Booking[];
  onBook: (time: string) => void;
  onDelete: (id: string) => void;
  isPast: boolean;
};

export default function TimeSlot({ time, bookings, onBook, onDelete, isPast }: Props) {
  const booking = bookings.find((b) => b.time === time);
  const callType = booking?.callType ?? 'onboarding';
  const available = !booking && isSlotAvailable(bookings, time, callType);
  const disabled = isPast || !available;

  return (
    <div
      className={`p-2 rounded border text-xs w-full max-w-[120px] transition duration-200
        ${isPast
          ? 'bg-gray-800 text-gray-500 border-gray-700'
          : available
          ? 'bg-gray-900 text-white hover:shadow-md border-gray-700'
          : 'bg-gray-700 text-gray-400 border-gray-600'
        }`}
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <span className="font-mono text-[10px] text-gray-300">{time}</span>

        {booking ? (
          <>
            <div className="text-[10px] font-medium truncate w-full">{booking.clientName}</div>
            <div className="text-[10px] text-yellow-300 bg-yellow-900 rounded px-1 py-0.5">
              {booking.callType}
            </div>
            <button
              onClick={() => onDelete(booking.id!)}
              className="text-red-400 text-[10px] hover:underline cursor-pointer"
            >
              Delete
            </button>
          </>
        ) : (
          <button
            disabled={disabled}
            onClick={() => onBook(time)}
            className={`px-1.5 py-0.5 rounded text-[10px] font-semibold w-full transition
              ${disabled
                ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                : 'bg-green-500 text-white hover:bg-green-600 cursor-pointer'
              }`}
          >
            Book
          </button>
        )}
      </div>
    </div>
  );
}