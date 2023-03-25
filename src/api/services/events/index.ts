import { get, post, patch, destroy } from '../../config';
import type { Event, EventForm } from './types'

export function getEvents() {
  return get<Event[]>('/events/');
}

export function getEventsByPet(petId: number) {
  return get<Event[]>(`/events/?petId=${petId}`);
}

export function postEvent(newEvent: EventForm) {
  return post<Event>('/events/', newEvent);
}

export function patchEvent(eventId: number, updatedEvent: Partial<Event>) {
  return patch<Event>(`/events/${eventId}/`, updatedEvent);
}

export function deleteEvent(eventId: number) {
  return destroy(`/events/${eventId}/`);
}
