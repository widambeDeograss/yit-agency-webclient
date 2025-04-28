import { Category } from "./categoty";

export interface TechPoll {
    id: number;
    title: string;
    description: string;
    created_by: {
        id: number;
        username: string;
        first_name: string;
        last_name: string;
        profile_image: string | null;
    };
    created_at: string;
    starts_at: string;
    ends_at: string;
    categories: number[];
    featured_image: string;
    published: boolean;
    drafted: boolean;
    options: {
        id: number;
        text: string;
        order: number;
        vote_percentage: number;
        vote_count: number;
    }[];
    user_vote: number | null;
    is_active: boolean;
    total_votes: number;
}



export interface TechPollApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: TechPoll[];
}

export interface PollOption {
    id: number;
    poll: number; 
    text: string;
    order: number;
}

export interface PollVote {
    id: number;
    user: number; 
    poll: number;
    option: number; 
    voted_at: string; 
}

export interface User {
    id: number;
    username: string;
    email: string;
   
}