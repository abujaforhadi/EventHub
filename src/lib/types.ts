export type EventCategory = 'Conference' | 'Workshop' | 'Meetup' | 'Social';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: EventCategory;
  isUserCreated?: boolean;
}
