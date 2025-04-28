// src/services/news.service.ts
import { TechNews, TechNewsApiResponse } from '@/types/events';
import { APIClient } from '../../axios/instance';

class NewsService extends APIClient {
    constructor() {
        super('baseService');
    }

    getNews(params?: { page?: number; size?: number; search?: string; featured?: boolean }) {
        return this.get<TechNewsApiResponse>('/events/news/', params);
    }

    getNewsDetail(newsId: number) {
        return this.get<TechNews>(`/events/tech-news/${newsId}/`);
    }
}

export const newsService = new NewsService();