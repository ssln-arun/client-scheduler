import { useState } from 'react';
import type { Client } from '../types';
import { dummyClients } from '../firebase/service';

export default function ClientSearch({ onSelect }: { onSelect: (c: Client) => void }) {
  const [q, setQ] = useState('');
  const filtered = dummyClients.filter(c =>
    c.name.toLowerCase().includes(q.toLowerCase()) || c.phone.includes(q)
  );

  return (
    <div className="relative w-full max-w-xl mx-auto mb-6">
      <input
        type="text"
        placeholder="Search by name or phone number"
        value={q}
        onChange={e => setQ(e.target.value)}
        className="w-full px-4 py-3 bg-white/90 text-black border border-gray-300 rounded-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-500 backdrop-blur-sm"
        autoComplete="off"
      />

      {q && (
        <ul className="absolute top-full mt-2 w-full bg-white/90 border border-gray-300 rounded-xl shadow-xl max-h-60 overflow-y-auto z-50 backdrop-blur-sm">
          {filtered.length === 0 ? (
            <li className="px-4 py-3 text-gray-500 text-sm text-center">No clients found</li>
          ) : (
            filtered.map(c => (
              <li
                key={c.id}
                className="px-4 py-3 hover:bg-gray-200 text-gray-900 hover:text-black cursor-pointer transition-colors duration-150 rounded-xl"
                onClick={() => {
                  onSelect(c);
                  setQ('');
                }}
              >
                <div className="font-semibold">{c.name}</div>
                <div className="text-sm text-gray-600">{c.phone}</div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}