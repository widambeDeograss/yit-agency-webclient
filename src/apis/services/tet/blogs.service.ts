import { Blog, Comment, Reaction, ReactionType } from '@/types/blogs';
import { APIClient } from '../../axios/instance';

interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

interface BlogApiResponse extends PaginatedResponse<Blog> {}
interface BlogCategoryResponse extends PaginatedResponse<{ 
    id: number; 
    name: string; 
    blogs_count: number 
}> {}

interface CommentApiResponse extends PaginatedResponse<Comment> {}

class BlogsService extends APIClient {
    constructor() {
        super('baseService');
    }

    // Blog endpoints
    getBlogs(params?: { 
        page?: number; 
        size?: number; 
        search?: string;
        categories?: number[];
        author?: number;
        bookmarked?:boolean;
        ordering?: '-published_at' | '-created_at' | '-views';
    }) {
        return this.get<BlogApiResponse>('/blogs/blogs/', params);
    }

    getBlogDetail(slug: string) {
        return this.get<Blog>(`/blogs/blogs/${slug}/`);
    }

    getCategories() {
        return this.get<BlogCategoryResponse>('/blogs/categories/');
    }

    // Reaction endpoints
    addReactionToBlog(slug: string, reactionType: ReactionType) {
        return this.post<Reaction>(`/blogs/blogs/${slug}/reactions/`, { 
            reaction_type: reactionType 
        });
    }

    removeReactionFromBlog(slug: string) {
        return this.delete(`/blogs/blogs/${slug}/reactions/`);
    }

    // Comment endpoints
    getBlogComments(
        slug: string, 
        params?: {
            page?: number;
            size?: number;
        }
    ) {
        return this.get<CommentApiResponse>(`/blogs/blogs/${slug}/comments/`, params);
    }

    createBlogComment(slug: string, content: string) {
        return this.post<Comment>(`/blogs/blogs/${slug}/comments/`, { 
            content 
        });
    }

    getCommentDetail(commentId: number) {
        return this.get<Comment>(`/blogs/comments/${commentId}/`);
    }

    updateComment(commentId: number, content: string) {
        return this.patch<Comment>(`/blogs/comments/${commentId}/`, { 
            content 
        });
    }

    deleteComment(commentId: number) {
        return this.delete(`/blogs/comments/${commentId}/`);
    }

    replyToComment(commentId: number, content: string) {
        return this.post<Comment>(`/blogs/comments/${commentId}/replies/`, { 
            content 
        });
    }

    addReactionToComment(commentId: number, reactionType: ReactionType) {
        return this.post<Reaction>(`/blogs/comments/${commentId}/reactions/`, { 
            reaction_type: reactionType 
        });
    }

    removeReactionFromComment(commentId: number) {
        return this.delete(`/blogs/comments/${commentId}/reactions/`);
    }
}

export const blogsService = new BlogsService();