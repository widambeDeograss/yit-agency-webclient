import { Category } from "./categoty";

export interface User {
    bio?: string;
    profileImage?: string | null;
    githubUrl?: string;
    linkedinUrl?: string;
    twitterUrl?: string;
    website?: string;
    skills?: Skill[]; 
    interests?: Category[]; 
    isVerified: boolean;
    isDeleted: boolean;
    dateOfBirth?: string | null;
    location?: string;
    createdAt: string; 
    updatedAt: string; 
    lastActivity: string; 
    groups?: Group[]; 
    userPermissions?: Permission[]; 
    username: string;
    email: string;
}

export interface Skill {
    id: number;
    name: string;
}



export interface Group {
    id: number;
    name: string;
    description?: string;
}

export interface Permission {
    id: number;
    name: string;
    codename: string;
}