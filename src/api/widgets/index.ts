import { get, post, destroy } from '../config';
import type { Widget, WidgetForm } from './types';

export function getWidgets() {
	return get<Widget[]>('/widgets/');
}

export function postWidget(newWidget: WidgetForm) {
	return post<Widget>('/widgets/', newWidget);
}

export function deleteWidget(widgetId: number) {
	return destroy(`/widgets/${widgetId}/`);
}
