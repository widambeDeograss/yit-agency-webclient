import { DiscussionApiResponse, Forum, ForumApiResponse, ForumCategoryResponse } from '@/types/tet-forums';
import { APIClient } from '../../axios/instance';
import { Category } from '@/types/categoty';



class ForumsService extends APIClient {
        constructor() {
                super('baseService');
        }

        // Get all Forums IDs with pagination
        getForums(params?: { page?: number; size?: number, search?: string, active?: boolean, category?: any , followed_by: string }) {
                return this.get<ForumApiResponse>('/forums/forums/', params);
        }

        // Get a single Forums ID 
        getForumById(id: any) {
                return this.get<Forum>(`/forums/forums/${id}/`);
        }

        // Get a single Forums ID by 
        forumDiscussions(id: any, params?: { page?: number; size?: number; search?: string }) {
                return this.get<DiscussionApiResponse>(`/forums/forums/${id}/discussions/`, params);
        }


        // Create a new Forums ID
        createForums(data: Partial<any>) {
                return this.post<any>(`/forums/forums/`, data);
        }

        // Update a Forums ID
        updateForumsId(id: any, data: Partial<any>) {
                return this.put<any>(`/forums/forums/${id}/`, data);
        }

        createDiscussion(id: any, data: Partial<any>) {
                return this.post<any>(`/forums/forums/${id}/discussions/`, data);
        }
        updateDiscussion(id: any, data: Partial<any>) {
                return this.put<any>(`/forums/discussions/${id}/`, data);
        }

        // Delete a Forums ID
        deleteForumsId(id: any) {
                // @ts-ignore
                return this.delete<void>(`/forums/forums/${id}/`);
        }

        // get forum categories
        getForumCategories() {
                return this.get<ForumCategoryResponse>('/forums/forum-categories/');
        }

        // create forum reaction
        createForumReaction(id: any, data: Partial<any>) {
                return this.post<any>(`/forums/reactions/discussion/${id}/`, data);
        }

        removeForumReaction(id: any) {
                return this.delete<any>(`/forums/reactions/discussion/${id}/`);
        }

        checkForumFollowStatus(id: any) {
                return this.get<any>(`/forums/forums/${id}/check-follow/`);
        }

        followForum(id: any) {
                return this.post<any>(`/forums/forums/${id}/follow/`);
        }
        unfollowForum(id: any) {
                return this.delete<any>(`/forums/forums/${id}/follow/`);
        }



}

export const forumsService = new ForumsService();