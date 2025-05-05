import { TechPoll, TechPollApiResponse } from '@/types/tet-polls';
import { APIClient } from '../../axios/instance';

class PollsService extends APIClient {
    constructor() {
        super('baseService');
    }

    getPolls(params?: { page?: number; size?: number; search?: string, }) {
        return this.get<TechPollApiResponse>('/polls/polls/', params);
    }

    getPollDetail(pollId: number) {
        return this.get<TechPoll>(`/polls/polls/${pollId}/`);
    }

    createVote(data: any) {
        return this.post<void>('/polls/votes/', data);
    }
}

export const pollsService = new PollsService();