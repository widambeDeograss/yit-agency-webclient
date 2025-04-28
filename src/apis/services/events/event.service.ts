// src/services/events.service.ts
import { EventsApiResponse, EventTypes } from '@/types/events';
import { APIClient } from '../../axios/instance';

class EventsService extends APIClient {
    constructor() {
        super('baseService');
    }

    getEvents(params?: { page?: number; size?: number; search?: string; category?: string }) {
        return this.get<EventsApiResponse>('/events/events/', params);
    }

    getEventDetail(eventId: number) {
        return this.get<EventTypes>(`/events/events/${eventId}/`);
    }

    getFeaturedEvents(params?: { page?: number; size?: number }) {
        return this.get<EventsApiResponse>('/events/featured-events/', params);
    }

    registerForEvent(eventId: number) {
        return this.post<{ detail: string; registration_id?: number; waitlisted?: boolean }>(`/events/events/${eventId}/register/`, {});
    }
}

export const eventsService = new EventsService();

