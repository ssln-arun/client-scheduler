export type CallType = 'onboarding' | 'followup';

export type Client = {
  id: string;
  name: string;
  phone: string;
};

export interface Booking {
  id?: string;
  clientId: string;
  clientName: string;
  callType: CallType;
  date: string; 
  time: string;
  recurrence?: 'weekly';
}