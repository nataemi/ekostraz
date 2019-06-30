import {Note} from '../entry-details/note';

export class Entry{
  requestDate?: string;
  name?: string;
  surname?: string;
  description?: string;
  phoneNumber?: string;
  houseNumber?: string;
  parcel?: string;
  email?: string;
  city?: string;
  street?: string;
  id: string;
  longtitude?: number;
  latitude?: number;
  requestStatus?: number
  notes?: Note[];
}
