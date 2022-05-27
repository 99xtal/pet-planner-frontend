import { get, post, patch, destroy } from "../config";

export function getPets() {
  return get("/pets/");
}

export function getPetById(petId) {
  return get(`/pets/${petId}/`);
}
