// src/services/accountService.ts
import { CategoryApiResponse } from '@/types/categoty';
import { APIClient } from '@/apis/axios/instance';
import { PasswordChangeData, ProfileUpdateData, Skill, TechCategory, UserProfile } from '@/types/account';


export interface SkillsApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Skill[];
  }
  

class AccountService extends APIClient {
  constructor() {
    super('baseService');
  }

  // User Profile Endpoints
  getProfile(userId?: number) {
    return this.get<UserProfile>(`/accounts/users/${userId}/`);
  }

  updateProfile(data: ProfileUpdateData) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === 'dateOfBirth' && value instanceof Date) {
          formData.append(key, value.toISOString().split('T')[0]);
        } else if (Array.isArray(value)) {
          value.forEach(item => formData.append(key, item));
        } else {
          formData.append(key, value);
        }
      }
    });
    
    if (data.profileImage) {
      formData.append('profile_image', data.profileImage);
    }

    return this.patch<UserProfile>('/accounts/profile/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  // Skills Endpoints
  getSkills() {
    return this.get<SkillsApiResponse>('/accounts/skills/');
  }

  addSkill(skillId: number) {
    return this.post(`/accounts/profile/skills/`, { skill_id: skillId });
  }

  removeSkill(skillId: number) {
    return this.delete(`/accounts/profile/skills/${skillId}/`);
  }

  // Interests Endpoints
  getTechCategories() {
    return this.get<CategoryApiResponse>('/accounts/tech-categories/');
  }

  addInterest(categoryId: number) {
    return this.post(`/accounts/profile/interests/`, { category_id: categoryId });
  }

  removeInterest(categoryId: number) {
    return this.delete(`/accounts/profile/interests/${categoryId}/`);
  }

  // Authentication Endpoints
  changePassword(data: PasswordChangeData) {
    return this.post('/accounts/change-password/', data);
  }

  deleteAccount() {
    return this.delete('/accounts/profile/');
  }

 // Subscription Endpoints
  subscribeToNewsletter() {
    return this.post('/newsletters/subscriptions/');
  }

  // Social Links
  updateSocialLinks(data: {
    githubUrl?: string;
    linkedinUrl?: string;
    twitterUrl?: string;
    website?: string;
  }) {
    return this.patch('/accounts/profile/social-links/', data);
  }
}

export const accountService = new AccountService();