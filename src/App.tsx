import { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import BookingModal from './components/BookingModal';
import { format } from 'date-fns';
import { getBookings, deleteBooking } from './firebase/service';
import type { Booking, CallType } from './types';

function App() {
  const today = format(new Date(), 'yyyy-MM-dd');
  const [date, setDate] = useState<string>(today);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalTime, setModalTime] = useState<string>('');
  const [, setModalCallType] = useState<CallType | null>(null);


  const load = async () => {
    setBookings(await getBookings(date));
  };

  useEffect(() => {
    load();
  }, [date]);

  const handleBook = (time: string) => {
    setModalTime(time);
    setModalCallType('onboarding');
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    await deleteBooking(id);
    load();
  };

  return (
    <main className="min-h-screen w-full bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col gap-6">

        <header className="flex flex-col items-center justify-center text-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight dark:text-white text-gray-900">
            Schedule Onboarding or Follow-up Call
          </h1>
        </header>

        <section className="flex flex-col gap-1">
          <label htmlFor="date" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Select a Date
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-gray-200 text-black border border-neutral-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </section>

        <section>
          <Calendar
            date={date}
            bookings={bookings}
            onBook={handleBook}
            onDelete={handleDelete}
          />
        </section>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <BookingModal
            date={date}
            time={modalTime}
            onBooked={() => {
              setShowModal(false);
              load();
            }}
            onClose={() => setShowModal(false)}
          />
        </div>
      )}
    </main>
  );
}

export default App;