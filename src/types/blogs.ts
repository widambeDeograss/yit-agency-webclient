import { User } from "./account";
import { TechCategory } from "./projects";

export interface ContentType {
    id: number;
    model: string;
    app_label: string;
}

export const ReactionTypes = ['clap', 'like', 'dislike', 'heart', 'rocket'] as const;
export type ReactionType = typeof ReactionTypes[number];

export interface BaseEntity {
    id: number;
    created_at: string;
    updated_at: string;
}

export interface Blog extends BaseEntity {
    title: string;
    slug: string;
    content: string;
    author: User;
    categories: TechCategory[];
    published_at: string | null;
    is_published: boolean;
    featured_image: string | null;
    comments:Comment[];
    views: number;
    deleted: boolean;
    draft: boolean;
    user_reaction?: ReactionType | null;
    bookmark_status?: {
        is_bookmarked: boolean;
        bookmark?: {
          id: number;
          notes: string | null;
          folder: number | null;
          created_at: string;
        };
      }; 
}

export interface Reaction extends BaseEntity {
    user: User;
    content_type: ContentType;
    object_id: number;
    reaction_type: ReactionType;
}

export interface Comment extends BaseEntity {
    content: string;
    author: User | null; // Null when comment is deleted
    parent: Comment | null;
    content_type: ContentType;
    object_id: number;
    replies?: Comment[]; // Optional for nested comments
    user_reaction?: ReactionType | null; // Optional for frontend use
}

// API Response Types
export interface BlogListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Blog[];
}

export interface BlogDetailResponse extends Blog {
    reactions: Reaction[];
    comments: Comment[];
    user_reaction?: ReactionType | null;
}

export interface CommentListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Comment[];
}

export interface CategoryWithBlogStats extends TechCategory {
    blogs_count: number;
}