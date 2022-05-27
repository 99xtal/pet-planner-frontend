import { get, post, patch, destroy } from "../config";

export async function getEvents() {
  return get("/events/");
}

export async function getEventsByPet(petId) {
  return get(`/events/?petId=${petId}`);
}

export async function postEvent(newEvent) {
  return post("/events/", newEvent);
}

export async function patchEvent(eventId, updatedEvent) {
  return patch(`/events/${eventId}/`, updatedEvent);
}

export async function deleteEvent(eventId) {
  return destroy(`/events/${eventId}/`);
}
