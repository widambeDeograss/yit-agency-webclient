// src/types/events.ts
export interface EventTypes {
    id: number;
    title: string;
    slug: string;
    description: string;
    organizer: {
        id: number;
        username: string;
        full_name: string;
        profile_picture: string;
    };
    location: string;
    is_online: boolean;
    meeting_url: string;
    start_time: string;
    end_time: string;
    registered_participants: number;
    timezone: string;
    categories: {
        id: number;
        name: string;
        slug: string;
    }[];
    featured_image: string;
    max_participants: number | null;
    status: 'upcoming' | 'ongoing' | 'completed' | 'canceled';
    participant_count: number;
    user_registered: boolean;
    requires_registration: boolean;
    ical_url: string;
    is_full: boolean;
    google_form_url: string;
    images: {
        id: number;
        image: string;
        caption: string;
        order: number;
    }[];
}

export interface EventsApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: EventTypes[];
}

// src/types/tech-news.ts
export interface TechNews {
    id: number;
    title: string;
    slug: string;
    content: string;
    source_url: string;
    news_type: 'internal' | 'external' | 'announcement';
    author: {
        id: number;
        username: string;
        full_name: string;
        profile_picture: string;
    };
    categories: {
        id: number;
        name: string;
        slug: string;
    }[];
    published_at: string;
    is_featured: boolean;
    featured_image: string;
    expiry_date: string | null;
    status: 'active' | 'expired';
}

export interface TechNewsApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: TechNews[];
}
