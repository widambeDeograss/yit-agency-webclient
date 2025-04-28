import { Category } from "./categoty";

export interface Forum {
  id: number;
  title: string;
  description: string;
  category: Category;
  created_by: any;
  created_at: string;
  moderators: number[];
  moderator_names?: string[];
  is_public: boolean;
  is_active: boolean;
  featured_image?: string | null;
  tags: number[];
  tag_names?: string[];
  followers: any[];
  followers_count: number;
  views: number;
  pinned_discussions: any[];
  discussion_count: number;
  reaction_count: number;
  latest_discussion: any;
  reactions: any[];
  deleted: boolean;
  drafted: boolean;
  published: boolean;
  locked: boolean;
}

export interface ForumApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Forum[];
}

export interface ForumCategoryResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    id: number;
    name: string;
    forum_count: number;
    active_forum_count: number;
    public_forum_count: number;
  }[];
}


export interface Discussion {
  id: number;
  title: string;
  content: string;
  author: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    profile_image: string | null;
  };
  forum: number;
  created_at: string;
  updated_at: string;
  is_pinned: boolean;
  is_locked: boolean;
  views: number;
  reactions: {
    user: {
      id: number;
      username: string;
      first_name: string;
      last_name: string;
      profile_image: string | null;
    };
    reaction: string;
    created_at: string;
  }[];
  comments: Comment[];
  user_reaction: string | null;
  reactions_count: number;
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