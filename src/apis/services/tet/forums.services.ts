import { APIClient } from '../../axios/instance';



class ForumsService extends APIClient {
        constructor() {
                super('baseService');
        }

        // Get all Forums IDs with pagination
        getForums(params?: { page?: number; size?: number, search?: string, active?: boolean }) {
                return this.get<any[]>('/forums/forums/', params);
        }

        // Get a single Forums ID 
        getForumById(id: any) {
                return this.get<any>(`/forums/forums/${id}/`);
        }

            // Get a single Forums ID by 
        forumDisscussions(id: any) {
                return this.get<any>(`/forums/forums/${id}/discussions/`);
        }

        // Create a new Forums ID
        createForums(data: Partial<any>) {
                return this.post<any>(`forums/`, data);
        }

        // Update a Forums ID
        updateForumsId(_id: number, data: Partial<any>) {
                return this.put<any>(`forums/`, data);
        }

        // Delete a Forums ID
        deleteForumsId(id: number) {
                // @ts-ignore
          return this.delete<void>(`/forums/${id}/`);
        }

   
}

export const forumsService = new ForumsService();