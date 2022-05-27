import { get, post, destroy } from "../config";

export function getWidgets() {
  return get("/widgets/");
}

export function postWidget(newWidget) {
  return post("/widgets/", newWidget);
}

export function deleteWidget(widgetId) {
  return destroy(`/widgets/${widgetId}/`);
}
