import { useState } from 'react';
import type { Client, CallType } from '../types';
import ClientSearch from './ClientSearch';
import { addBooking } from '../firebase/service';

export default function BookingModal({
  date,
  time,
  onBooked,
  onClose,
}: {
  date: string;
  time: string;
  onBooked: () => void;
  onClose: () => void;
}) {
  const [client, setClient] = useState<Client | null>(null);
  const [callType, setCallType] = useState<CallType>('onboarding');
  const [recurrence, setRecurrence] = useState<'weekly' | ''>('');

  const handleConfirm = async () => {
    if (!client) return alert('Please select a client.');
    await addBooking({
      clientId: client.id,
      clientName: client.name,
      callType,
      date,
      time,
      recurrence: callType === 'followup' && recurrence ? recurrence : undefined,
    });
    onBooked();
  };

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-800/30 dark:bg-neutral-900/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-md rounded-2xl shadow-xl p-6 bg-white dark:bg-neutral-900 transition-all duration-300 space-y-6">
        
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {callType === 'followup' ? 'Follow-up' : 'Onboarding'} Call
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Booking for <span className="font-medium">{formattedDate}</span> at <span className="font-medium">{time}</span>
          </p>
        </div>

        {!client ? (
          <ClientSearch onSelect={setClient} />
        ) : (
          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-700 rounded-lg px-4 py-3 flex items-center justify-between text-sm text-blue-900 dark:text-blue-300">
            <div>
              <strong>{client.name}</strong> <br />
              <span className="text-xs text-blue-800 dark:text-blue-400">{client.phone}</span>
            </div>
            <button
              onClick={() => setClient(null)}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline focus:outline-none"
            >
              Change
            </button>
          </div>
        )}

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Call Type
          </label>
          <div className="flex gap-4">
            {['onboarding', 'followup'].map((type) => (
              <label key={type} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <input
                  type="radio"
                  name="callType"
                  value={type}
                  checked={callType === type}
                  onChange={() => setCallType(type as CallType)}
                  className="accent-blue-500"
                />
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {callType === 'followup' && (
          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              checked={recurrence === 'weekly'}
              onChange={() => setRecurrence((r) => (r === 'weekly' ? '' : 'weekly'))}
              className="accent-blue-500"
            />
            Enable weekly recurrence
          </label>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!client}
            className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}