import { Category } from "./categoty";

export interface Forum {
    id: number;
    title: string;
    description: string;
    category: Category;
    created_by: number;
    created_at: string;
    latest_discussion: any | null;
    is_public: boolean;
    locked: boolean;
  }

  export interface ForumApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Forum[];
  }


  export interface Discussion {
    id: number;
    title: string;
    content: string;
    author: number;
    author_name?: string;
    forum: number;
    created_at: string;
    updated_at: string;
    is_pinned: boolean;
    is_locked: boolean;
    views: number;
  }
  
  export interface DiscussionApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Discussion[];
  }

  export interface Comment {
    id: number;
    discussion: number;
    author: number;
    author_name?: string;
    content: string;
    created_at: string;
    updated_at: string;
    parent: number | null;
  }