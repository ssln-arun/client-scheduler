import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from './config';
import type { Booking, Client } from '../types';

export const dummyClients: Client[] = [
  { id: '1', name: 'Sriram', phone: '9876543210' },
  { id: '2', name: 'Shilpa', phone: '9123456780' },
  { id: '3', name: 'John', phone: '9012345678' },
  { id: '4', name: 'Peter', phone: '9345678912' },
  { id: '5', name: 'David', phone: '8899776655' },
  { id: '6', name: 'Michael', phone: '9988776655' },
  { id: '7', name: 'James', phone: '9090909090' },
  { id: '8', name: 'Robert', phone: '9112233445' },
  { id: '9', name: 'William', phone: '8001234567' },
  { id: '10', name: 'Daniel', phone: '9500001122' },
  { id: '11', name: 'Joseph', phone: '9876512345' },
  { id: '12', name: 'Henry', phone: '9123467890' },
  { id: '13', name: 'Matthew', phone: '8888123456' },
  { id: '14', name: 'Andrew', phone: '9312345678' },
  { id: '15', name: 'Thomas', phone: '9555566666' },
  { id: '16', name: 'Nathan', phone: '9876509876' },
  { id: '17', name: 'Samuel', phone: '9001234321' },
  { id: '18', name: 'Logan', phone: '9123012345' },
  { id: '19', name: 'Elijah', phone: '9988012345' },
  { id: '20', name: 'Liam', phone: '9445566778' }
];


export function getClients(): Promise<Client[]> {
  return Promise.resolve(dummyClients);
}

export async function getBookings(date: string): Promise<Booking[]> {
  const q = query(collection(db, 'bookings'), where('date', '==', date));
  const snap = await getDocs(q);
  const recSnap = await getDocs(collection(db, 'bookings')); // fetch all for recurrence
  const all: Booking[] = snap.docs.map(d => ({ id: d.id, ...(d.data() as Booking) }));
  // add recurring
  const weekly = recSnap.docs
    .map(d => ({ id: d.id, ...(d.data() as Booking) }))
    .filter(b => b.recurrence === 'weekly' && new Date(b.date).getDay() === new Date(date).getDay())
    .map(b => ({ ...b, date }));
  return [...all, ...weekly];
}

export async function addBooking(
  booking: Omit<Booking, 'id' | 'createdBy'>
): Promise<void> {
  const data: any = { ...booking };
  if (data.recurrence === undefined) delete data.recurrence;
  await addDoc(collection(db, 'bookings'), data);
}

export async function deleteBooking(id: string): Promise<void> {
  await deleteDoc(doc(db, 'bookings', id));
}