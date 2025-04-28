// Define TypeScript types for the Project model and related entities.

import { User } from "./account";


export interface Skill {
    id: number;
    name: string;
    // Add other fields as needed
}

export interface TechCategory {
    id: number;
    name: string;
    // Add other fields as needed
}

export interface Project {
    id: number;
    title: string;
    description: string;
    author: User;
    contributors: User[];
    githubUrl?: string;
    projectUrl?: string;
    categories: TechCategory[];
    createdAt: string; // ISO 8601 format
    updatedAt: string; // ISO 8601 format
    featuredImage?: string | null; // URL or null
    technologies_used: Skill[];
    deleted: boolean;
    drafted: boolean;
    published: boolean;
    featured_image?: string | null;
    github_url?: string | null;
    created_at: string;
    updated_at: string;
    profile_image?: string | null;
    project_url?: string | null;
}

export interface ProjectApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Project[];
}
export interface ProjectCategoryResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: {
        id: number;
        name: string;
        project_count: number;
    }[];
}