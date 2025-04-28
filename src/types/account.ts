import { Category } from "./categoty";

export interface User {
    bio?: string;
    profileImage?: string | null;
    first_name?: string;
    last_name?: string;
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
    id: number;
}


// src/types/account.ts
export interface UserProfile {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    bio: string | null;
    profile_image: string | null;
    github_url: string | null;
    linkedin_url: string | null;
    twitter_url: string | null;
    website: string | null;
    date_of_birth: string | null;
    location: string | null;
    is_verified: boolean;
    created_at: string;
    updated_at: string;
    skills: Skill[];
    interests: TechCategory[];
  }
  
  export interface Skill {
    id: number;
    name: string;
  }
  
  export interface TechCategory {
    id: number;
    name: string;
    description: string | null;
  }
  
  export interface PasswordChangeData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }
  
  export interface ProfileUpdateData {
    username?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    bio?: string;
    dateOfBirth?: Date | null;
    location?: string;
    githubUrl?: string;
    linkedinUrl?: string;
    twitterUrl?: string;
    website?: string;
    profileImage?: File | null;
    skills?: number[];
    interests?: number[];
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