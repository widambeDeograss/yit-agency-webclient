import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Blog, Comment, ReactionType } from '@/types/blogs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Heart,
  MessageSquare,
  Bookmark,
  Share2,
  ThumbsUp,
  ThumbsDown,
  Rocket,
  Clapperboard,
  ChevronDown,
  ChevronUp,
  Reply,
  BookmarkCheck,
} from 'lucide-react';
import { blogsService } from '@/apis/services/tet/blogs.service';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { useAuthStore } from '@/hooks/use-auth-store';
import { useAppDispatch } from '@/store/store-hooks';
import { SetOpenLogin } from '@/store/slices/auth/auth.slice';
import { toast } from 'react-toastify';
import { accountService } from '@/apis/services/auth/account.service';


const REACTION_ICONS = {
  like: <ThumbsUp className="h-4 w-4" />,
  dislike: <ThumbsDown className="h-4 w-4" />,
  heart: <Heart className="h-4 w-4" />,
  rocket: <Rocket className="h-4 w-4" />,
  clap: <Clapperboard className="h-4 w-4" />,
};

const BlogDetail = () => {
  const { id:slug } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [commentContent, setCommentContent] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [showReplies, setShowReplies] = useState<Record<number, boolean>>({});
  const {isAuthenticated} =  useAuthStore();
  const dispatch = useAppDispatch();

  // Fetch blog post
  const {
    data: blog,
    isLoading,
    isError,
    error,
  } = useQuery<Blog>({
    queryKey: ['blog', slug],
    queryFn: () => blogsService.getBlogDetail(slug!),
  });

  // Fetch comments
  const {
    data: comments,
    isLoading: isLoadingComments,
  } = useQuery({
    queryKey: ['blog-comments', slug],
    queryFn: () => blogsService.getBlogComments(slug!),
  });

  // Add reaction mutation
  const addReaction = useMutation({
    mutationFn: (reactionType: ReactionType) =>
      blogsService.addReactionToBlog(slug!, reactionType),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['blog', slug]});
        queryClient.invalidateQueries({queryKey:['blog-comments', slug]});
    },
  });

  // Remove reaction mutation
  const removeReaction = useMutation({
    mutationFn: () => blogsService.removeReactionFromBlog(slug!),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['blog', slug]});
    },
  });

  // Add comment mutation
  const addComment = useMutation({
    mutationFn: () =>
      replyingTo
        ? blogsService.replyToComment(replyingTo, commentContent)
        : blogsService.createBlogComment(slug!, commentContent),
    onSuccess: () => {
      setCommentContent('');
      setReplyingTo(null);
      queryClient.invalidateQueries({queryKey:['blog-comments', slug]});
    },
  });


    const handleShareProject = async () => {
      const shareText = `Check out this ARTICLE: ${blog?.title}\n${window.location.href}`;
    
      // Try Web Share API first (won't work on Ubuntu/Chrome)
      if (navigator.share) {
        try {
          await navigator.share({
            title: blog?.title,
            text: `Check out this blog: ${blog?.title}`,
            url: window.location.href,
          });
          return; // Success, exit early
        } catch (err) {
          console.log("Web Share failed, falling back to clipboard");
        }
      }
    
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(shareText);
        // Show a toast/notification (example using a simple alert)
        toast.info("Link copied to clipboard! 🎉"); // Replace with a proper toast
      } catch (err) {
        console.error("Failed to copy:", err);
        toast.info("Could not copy link. Please try manually."); // Fallback for clipboard errors
      }
    };

  // Toggle reaction
  const handleReaction = (reactionType: ReactionType) => {
   if (!isAuthenticated) {
      dispatch(SetOpenLogin(true));
      return;
    }
    if (blog?.user_reaction === reactionType) {
        removeReaction.mutate();
      } else {
        addReaction.mutate(reactionType);
      }
  };

    const {mutate:toogleBookMark, isPending:loadingBookMark} = useMutation({
      mutationFn: () => {
        return accountService.toogleBookMark({
          content_type: 'blog',
        object_id: blog?.id,
        bookmark_type: 'blog',
        });
      },
      onSuccess: () => {
        toast.success("Forum bookmarked successfully");
        queryClient.invalidateQueries({ queryKey: ["blog", slug] });
      },
      onError: (error) => {
        console.error("Error bookmarking forum:", error);
        toast.error("Failed to bookmark forum. Please try again.");
      },
    });

    const handleLoginModal = () => {
        dispatch(SetOpenLogin(true));
      };

  // Toggle replies visibility
  const toggleReplies = (commentId: number) => {
    setShowReplies(prev => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <BlogPostSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="text-red-500">
          Error loading blog: {error instanceof Error ? error.message : 'Unknown error'}
        </div>
        <Button onClick={() => navigate(-1)} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div>Blog post not found</div>
        <Button onClick={() => navigate(-1)} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Blog Content */}
      <article className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            ← Back to blogs
          </Button>
          <div className="flex gap-2">
          <Button variant="outline" size="sm"
                 onClick={() =>  {
                  if (!isAuthenticated) {
                    handleLoginModal();
                    return;
                  }else{
                    toogleBookMark()
                  }
                 }}
                 disabled={loadingBookMark}
            >
           {
            blog.bookmark_status?.is_bookmarked ? (
              <>
              <BookmarkCheck className="h-4 w-4 mr-1" />
              Saved
              </>
            ): (
              <>
                 <Bookmark className="h-4 w-4 mr-1" />
                 Save
              </>
            )
           }
            </Button>
            <Button variant="ghost" size="icon"
               onClick={handleShareProject}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            {blog.categories.map(category => (
              <Badge key={category.id} variant="secondary">
                {category.name}
              </Badge>
            ))}
          </div>
          <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={blog.author.profileImage ?? undefined} />
              <AvatarFallback>
                {blog.author.username.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{blog.author.username}</p>
              <p className="text-sm text-muted-foreground">
                {formatDate(blog.published_at || blog.created_at)} · {blog.views} views
              </p>
            </div>
          </div>
        </header>

        {blog.featured_image && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={blog.featured_image}
              alt={blog.title}
              className="w-full h-auto max-h-96 object-cover"
            />
          </div>
        )}

        <div className="prose max-w-none dark:prose-invert">
        <ReactMarkdown
                 remarkPlugins={[remarkGfm]}
                     rehypePlugins={[rehypeHighlight]}
        >{blog.content}</ReactMarkdown>
        </div>

        {/* Reactions */}
        <div className="mt-8 pt-6 border-t">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {Object.entries(REACTION_ICONS).map(([type, icon]) => (
                <Button
                  key={type}
                  variant={blog.user_reaction === type ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleReaction(type as ReactionType)}
                >
                  {icon}
                </Button>
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              {/* {blog.reactions.length} reactions */}
            </div>
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <section className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-6">
          Comments {comments && `(${comments.count})`}
        </h2>

        {/* Comment Form */}
        <div className="mb-8">
          <Textarea
            placeholder={replyingTo ? 'Write your reply...' : 'Write a comment...'}
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            className="mb-2"
          />
          <div className="flex justify-end gap-2">
            {replyingTo && (
              <Button
                variant="ghost"
                onClick={() => setReplyingTo(null)}
              >
                Cancel
              </Button>
            )}
            <Button
              onClick={() => 
                isAuthenticated
                  ? addComment.mutate()
                  : dispatch(SetOpenLogin(true))
              }
              disabled={!commentContent.trim() || addComment.isPending}
            >
              {replyingTo ? 'Reply' : 'Comment'}
            </Button>
          </div>
        </div>

        {/* Comments List */}
        {isLoadingComments ? (
          <div className="space-y-6">
            <CommentSkeleton />
            <CommentSkeleton />
          </div>
        ) : (
          <div className="space-y-6">
            {blog?.comments.map(comment => (
              <div key={comment.id} className="border rounded-lg p-4">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage src={comment.author?.profileImage ?? undefined} />
                    <AvatarFallback>
                      {comment.author?.username.substring(0, 2).toUpperCase() || 'AN'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium">
                          {comment.author?.username || '[deleted]'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(comment.created_at)}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setReplyingTo(comment.id)}
                      >
                        <Reply className="h-4 w-4 mr-2" /> Reply
                      </Button>
                    </div>
                    <p className="mb-4">{comment.content}</p>
                    
                    {/* Comment Reactions */}
                    <div className="flex items-center gap-4">
                      <div className="flex gap-1">
                        {Object.entries(REACTION_ICONS).map(([type, icon]) => (
                          <Button
                            key={type}
                            variant={comment.user_reaction === type ? 'default' : 'ghost'}
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            {icon}
                          </Button>
                        ))}
                      </div>
                      
                      {/* Replies Toggle */}
                      {comment.replies && comment.replies.length > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleReplies(comment.id)}
                        >
                          {showReplies[comment.id] ? (
                            <ChevronUp className="h-4 w-4 mr-1" />
                          ) : (
                            <ChevronDown className="h-4 w-4 mr-1" />
                          )}
                          {comment.replies.length} replies
                        </Button>
                      )}
                    </div>
                    
                    {/* Replies */}
                    {showReplies[comment.id] && comment.replies && (
                      <div className="mt-4 pl-6 border-l-2">
                        {comment.replies.map(reply => (
                          <div key={reply.id} className="py-4 border-b last:border-b-0">
                            <div className="flex gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={reply.author?.profileImage ?? undefined} />
                                <AvatarFallback>
                                  {reply.author?.username.substring(0, 2).toUpperCase() || 'AN'}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="text-sm font-medium">
                                    {reply.author?.username || '[deleted]'}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {formatDate(reply.created_at)}
                                  </p>
                                </div>
                                <p className="text-sm">{reply.content}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};


// Format date utility function
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(date);
};

// Skeleton for blog post loading state
const BlogPostSkeleton = () => {
    return (
        <div className="animate-pulse">
            <div className="flex items-center justify-between mb-6">
                <div className="h-10 w-32 bg-muted rounded-md"></div>
                <div className="flex gap-2">
                    <div className="h-8 w-8 bg-muted rounded-full"></div>
                    <div className="h-8 w-8 bg-muted rounded-full"></div>
                </div>
            </div>
            
            <div className="mb-8">
                <div className="flex gap-2 mb-4">
                    <div className="h-6 w-20 bg-muted rounded-full"></div>
                    <div className="h-6 w-20 bg-muted rounded-full"></div>
                </div>
                <div className="h-10 w-3/4 bg-muted rounded-md mb-4"></div>
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-muted rounded-full"></div>
                    <div>
                        <div className="h-5 w-32 bg-muted rounded-md mb-2"></div>
                        <div className="h-4 w-48 bg-muted rounded-md"></div>
                    </div>
                </div>
            </div>
            
            <div className="h-64 w-full bg-muted rounded-lg mb-8"></div>
            
            <div className="space-y-4">
                <div className="h-4 w-full bg-muted rounded-md"></div>
                <div className="h-4 w-full bg-muted rounded-md"></div>
                <div className="h-4 w-3/4 bg-muted rounded-md"></div>
            </div>
        </div>
    );
};

// Skeleton for comment loading state
const CommentSkeleton = () => {
    return (
        <div className="border rounded-lg p-4 animate-pulse">
            <div className="flex gap-4">
                <div className="h-10 w-10 bg-muted rounded-full"></div>
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <div className="h-5 w-32 bg-muted rounded-md mb-1"></div>
                            <div className="h-4 w-24 bg-muted rounded-md"></div>
                        </div>
                        <div className="h-8 w-16 bg-muted rounded-md"></div>
                    </div>
                    <div className="space-y-2 mb-4">
                        <div className="h-4 w-full bg-muted rounded-md"></div>
                        <div className="h-4 w-5/6 bg-muted rounded-md"></div>
                    </div>
                    <div className="flex gap-2">
                        <div className="h-8 w-8 bg-muted rounded-md"></div>
                        <div className="h-8 w-8 bg-muted rounded-md"></div>
                        <div className="h-8 w-8 bg-muted rounded-md"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;