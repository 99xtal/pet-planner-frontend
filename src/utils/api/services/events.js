import { get, post, patch, destroy } from '../config';

export function getEvents() {
  return get('/events/');
}

export function getEventsByPet(petId) {
  return get(`/events/?petId=${petId}`);
}

export function postEvent(newEvent) {
  return post('/events/', newEvent);
}

export function patchEvent(eventId, updatedEvent) {
  return patch(`/events/${eventId}/`, updatedEvent);
}

export function deleteEvent(eventId) {
  return destroy(`/events/${eventId}/`);
}
