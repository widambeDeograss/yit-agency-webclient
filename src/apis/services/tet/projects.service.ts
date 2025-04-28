import { Project, ProjectApiResponse, ProjectCategoryResponse } from '@/types/projects';
import { APIClient } from '../../axios/instance';

class ProjectsService extends APIClient {
    constructor() {
        super('baseService');
    }

    getProjects(params?: { page?: number; size?: number; search?: string }) {
        return this.get<ProjectApiResponse>('/projects/', params);
    }

    getProjectDetail( projectId: number) {
        return this.get<Project>(`/projects/${projectId}/`);
    }
            getCategories() {
                    return this.get<ProjectCategoryResponse>('/projects/categories/');
            }

}

export const projectsService = new ProjectsService();