import React, { FormEventHandler, useState, useEffect, use } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MessageSquare,
  Eye,
  Share2,
  Bookmark,
  BookmarkCheck,
  Lock,
  Pin,
  MoreHorizontal,
  ArrowLeft,
  Calendar,
  User,
  PlusCircle,
  AlertCircle,
  Flame,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { forumsService } from '@/apis/services/tet/forums.services';
import { useAuthStore } from '@/hooks/use-auth-store';
import { useAppDispatch } from '@/store/store-hooks';
import { SetOpenLogin } from '@/store/slices/auth/auth.slice';
import { Discussion } from '@/types/tet-forums';
import { toast } from 'react-toastify';
import DiscussionForm from './new-forum-discussion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

const ForumDetailsPage = () => {
  const { id: forumId } = useParams();
  const [activeTab, setActiveTab] = useState("discussions");
  const { isAuthenticated,user } = useAuthStore();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const [following, setFollowing] = useState(false);
  const [createDiscussionOpen, setCreateDiscussionOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [reactionMenuOpen, setReactionMenuOpen] = useState<number | null>(null);

  // Query for forum details
  const { data: forum, isLoading: loadingForum } = useQuery({
    queryKey: ['forum', forumId],
    queryFn: () => forumsService.getForumById(forumId),
  });

  // Query for discussion list
  const { data: discussions, isLoading: loadingDiscussions } = useQuery({
    queryKey: ['discussions', forumId, currentPage],
    queryFn: () => forumsService.forumDiscussions(forumId, { page: currentPage }),
  });

  // Check forum follow status when authenticated
  useEffect(() => {
    if (isAuthenticated && forumId) {
      forumsService.checkForumFollowStatus(forumId)
        .then(data => {
          setFollowing(data.is_following);
        })
        .catch(error => {
          console.error("Error checking follow status:", error);
        });
    }
  }, [isAuthenticated, forumId]);

  // Mutations for forum follow/unfollow
  const followMutation = useMutation({
    mutationFn: () => forumsService.followForum(forumId),
    onSuccess: () => {
      setFollowing(true);
      toast.info("You are now following this forum",
      );
      queryClient.invalidateQueries({ queryKey: ['forum', forumId] });
    },
    onError: (error) => {
      console.error("Error following forum:", error);
      toast.error("Failed to follow forum. Please try again.",
      );
    }
  });

  const unfollowMutation = useMutation({
    mutationFn: () => forumsService.unfollowForum(forumId),
    onSuccess: () => {
      setFollowing(false);
      toast.info("You have unfollowed this forum",
      );
      queryClient.invalidateQueries({ queryKey: ['forum', forumId] });
    },
    onError: (error) => {
      console.error("Error unfollowing forum:", error);
      toast.error("Failed to unfollow forum. Please try again.");
    }
  });

  // Mutation for creating discussions
  const createDiscussionMutation = useMutation({
    mutationFn: (newDiscussion: { title: string; content: string }) => forumsService.createDiscussion(forumId, 
      {
        ...newDiscussion,
        "forum": forumId,
        "author": user?.id,

      }
    ),
    onSuccess: () => {
      setCreateDiscussionOpen(false);
      toast.success("Discussion created successfully",
      );
      queryClient.invalidateQueries({ queryKey: ['discussions', forumId] });
    },
    onError: (error) => {
      console.error("Error creating discussion:", error);
      toast.error("Failed to create discussion. Please try again.");
    }
  });

  // Mutations for discussion reactions
  const addReactionMutation = useMutation({
    mutationFn: ({ discussionId, reaction }: any) => {
      return forumsService.createForumReaction(discussionId, {
        "reaction": reaction,
      });
    },
    onSuccess: (data, variables) => {
      toast.success(`You reacted to the discussion with ${variables.reaction}`);
      setReactionMenuOpen(null);
      queryClient.invalidateQueries({ queryKey: ['discussions', forumId] });
    },
    onError: (error) => {
      console.error("Error adding reaction:", error);
      toast("Failed to add reaction. Please try again.");
    }
  });

  const removeReactionMutation = useMutation({
    mutationFn: (discussionId: number) => {
      return forumsService.removeForumReaction(discussionId);
    },
    onSuccess: () => {
      toast.info("Your reaction has been removed");
      queryClient.invalidateQueries({ queryKey: ['discussions', forumId] });
    },
    onError: (error) => {
      console.error("Error removing reaction:", error);
      toast.error("Failed to remove reaction. Please try again.");
    }
  });

  const handleLoginModal = () => {
    dispatch(SetOpenLogin(true));
  };

  const handleFollowToggle = async () => {
    if (!isAuthenticated) {
      handleLoginModal();
      return;
    }

    if (following) {
      unfollowMutation.mutate();
    } else {
      followMutation.mutate();
    }
  };

  const handleCreateDiscussion = async (newDiscussion: { title: string; content: string }) => {
  
    if (!newDiscussion.title.trim() || !newDiscussion.content.trim()) {
      toast.info("Please provide both title and content");
      return;
    }

    createDiscussionMutation.mutate(newDiscussion);
  };

   const handleReaction = async (discussionId: number, reaction: string) => {
    if (!isAuthenticated) {
      handleLoginModal();
      return;
    }

    // Find the discussion to check if user already reacted
    const discussion = discussions?.results.find(d => d.id === discussionId);

    if (discussion?.user_reaction === reaction) {
      // User clicked the same reaction again, so remove it
      removeReactionMutation.mutate(discussionId);
    } else {
      // Add new reaction (this will replace any existing reaction)
      addReactionMutation.mutate({ discussionId, reaction });
    }

    setReactionMenuOpen(null);
  };

  const goToNextPage = () => {
    if (discussions?.next) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (discussions?.previous && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Loading skeleton
  if (loadingForum || loadingDiscussions) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-6" />
        <div className="grid grid-cols-1 gap-6">
          <div>
            <Skeleton className="h-64 w-full mb-6" />
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <Skeleton key={i} className="h-40 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!forum) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <AlertCircle className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Forum Not Found</h2>
        <p className="text-muted-foreground mb-6">The forum you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/forums">Back to Forums</Link>
        </Button>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Breadcrumb */}
      <div className="flex items-center mb-6 text-sm text-muted-foreground">
        <Link to="/forums" className="flex items-center hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Forums
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{forum.title}</span>
      </div>

      {/* Forum Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold mr-3">{forum.title}</h1>
            {forum.is_public ? null : (
              <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500">
                <Lock className="h-3 w-3 mr-1" /> Private
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={following ? "default" : "outline"}
              size="sm"
              onClick={handleFollowToggle}
              disabled={followMutation.isPending || unfollowMutation.isPending}
            >
              {following ? (
                <>
                  <BookmarkCheck className="h-4 w-4 mr-1" />
                  Following
                </>
              ) : (
                <>
                  <Bookmark className="h-4 w-4 mr-1" />
                  Follow
                </>
              )}
            </Button>

            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
        </div>

       <ReactMarkdown
       
       >
       {forum.description}
       </ReactMarkdown>

        <div className="flex flex-wrap gap-2 mb-4">
          {forum.category &&
            <Badge variant="outline" className="hover:bg-primary/10 hover:text-primary">
              #{forum.category.name}
            </Badge>
          }
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            Created by {forum.created_by.username}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {formatDate(forum.created_at)}
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            {discussions?.count || 0} discussions
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mb-6">
        {/* Tabs and New Discussion Button */}
        <div className="flex items-center justify-between mb-6">
          <Tabs
            defaultValue="discussions"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList>
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
              <TabsTrigger value="pinned">Pinned</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
            </TabsList>

            {/* Discussions List */}
            <TabsContent value="discussions" className="mt-0">
              {!discussions?.results || discussions.results.length === 0 ? (
                <Card className="text-center py-12">
                  <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No discussions yet</h3>
                  <p className="text-muted-foreground mb-6">Be the first to start a discussion in this forum!</p>
                  <Button onClick={() => isAuthenticated ? setCreateDiscussionOpen(true) : handleLoginModal()}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    New Discussion
                  </Button>
                </Card>
              ) : (
                <>
                  <div className="space-y-4">
                    {discussions.results.map((discussion) => (
                      <DiscussionCard
                        key={discussion.id}
                        discussion={discussion}
                        handleReaction={handleReaction}
                        reactionMenuOpen={reactionMenuOpen === discussion.id}
                        setReactionMenuOpen={setReactionMenuOpen}
                        isAuthenticated={isAuthenticated}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {(discussions.previous || discussions.next) && (
                    <div className="flex justify-center mt-6">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={goToPreviousPage}
                          disabled={!discussions.previous}
                        >
                          <ChevronLeft className="h-4 w-4 mr-1" />
                          Previous
                        </Button>

                        <span className="text-sm text-muted-foreground px-2">
                          Page {currentPage}
                        </span>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={goToNextPage}
                          disabled={!discussions.next}
                        >
                          Next
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </TabsContent>

            <TabsContent value="pinned" className="mt-0">
              {forum.pinned_discussions && forum.pinned_discussions.length > 0 ? (
                <div className="space-y-4">
                  {forum.pinned_discussions.map((discussion) => (
                    <DiscussionCard
                      key={discussion.id}
                      discussion={discussion}
                      handleReaction={handleReaction}
                      reactionMenuOpen={reactionMenuOpen === discussion.id}
                      setReactionMenuOpen={setReactionMenuOpen}
                      isAuthenticated={isAuthenticated}
                      pinned
                    />
                  ))}
                </div>
              ) : (
                <Card className="text-center py-12">
                  <Pin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No pinned discussions</h3>
                  <p className="text-muted-foreground">Moderators can pin important discussions here.</p>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="popular" className="mt-0">
              {!discussions?.results || discussions.results.length === 0 ? (
                <Card className="text-center py-12">
                  <Flame className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No popular discussions yet</h3>
                  <p className="text-muted-foreground">Popular discussions will appear here.</p>
                </Card>
              ) : (
                <div className="space-y-4">
                  {discussions.results
                    .slice()
                    .sort((a, b) => b.views - a.views)
                    .slice(0, 5)
                    .map((discussion) => (
                      <DiscussionCard
                        key={discussion.id}
                        discussion={discussion}
                        handleReaction={handleReaction}
                        reactionMenuOpen={reactionMenuOpen === discussion.id}
                        setReactionMenuOpen={setReactionMenuOpen}
                        isAuthenticated={isAuthenticated}
                        popular
                      />
                    ))}
                </div>
              )}
            </TabsContent>


          </Tabs>


        </div>
        {
          isAuthenticated ? <DiscussionForm onSubmit={handleCreateDiscussion} onCancel={function (): void {
            throw new Error('Function not implemented.');
          }} isPending={createDiscussionMutation.isPending}
          /> : <Button
            onClick={() => {
              if (!isAuthenticated) {
                handleLoginModal();
                return;
              }
              setCreateDiscussionOpen(true);
            }}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            New Discussion
          </Button>
        }

      </div>
    </div>
  );
};

// Updated Discussion Card Component
const DiscussionCard = ({
  discussion,
  handleReaction,
  reactionMenuOpen,
  setReactionMenuOpen,
  isAuthenticated,
  pinned = false,
  popular = false
}: {
  discussion: Discussion;
  handleReaction: (discussionId: number, reaction: string) => void;
  reactionMenuOpen: boolean;
  setReactionMenuOpen: (id: number | null) => void;
  isAuthenticated: boolean;
  pinned?: boolean;
  popular?: boolean;
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const truncateContent = (content: any, maxLength = 150) => {
    if (!content) return '';
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  // Available reactions based on the REACTION_CHOICES from the model
  const availableReactions = [
    { emoji: '👍', name: 'Thumbs Up', key: 'thumbs_up' },
    { emoji: '👎', name: 'Thumbs Down', key: 'thumbs_down' },
    { emoji: '❤️', name: 'Heart', key: 'heart' },
    { emoji: '🚀', name: 'Rocket', key: 'rocket' },
    { emoji: '👀', name: 'Eyes', key: 'eyes' },
    { emoji: '🔥', name: 'Fire', key: 'fire' },
    { emoji: '🎉', name: 'Party Popper', key: 'party' },
    { emoji: '👏', name: 'Clap', key: 'clap' },
    { emoji: '🤔', name: 'Thinking Face', key: 'thinking' }
  ];

  const getTotalReactions = () => {
    return discussion.reactions?.length || 0;
  };

  // Function to toggle reaction popup
  const toggleReactionMenu = () => {
    if (reactionMenuOpen) {
      setReactionMenuOpen(null);
    } else {
      setReactionMenuOpen(discussion.id);
    }
  };

  const countReactionsByType = () => {
    const reactionCounts: Record<string, number> = {};

    if (discussion.reactions && discussion.reactions.length > 0) {
      discussion.reactions.forEach(reaction => {
        if (!reactionCounts[reaction.reaction]) {
          reactionCounts[reaction.reaction] = 0;
        }
        reactionCounts[reaction.reaction] += 1;
      });
    }

    return reactionCounts;
  };

  return (
    <Card className="hover:border-primary/50 transition-all duration-300">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{discussion.author?.username?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <span className="font-medium">{discussion.author?.username || 'Unknown'}</span>
              <div className="text-xs text-muted-foreground">
                {formatDate(discussion.created_at)}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {discussion.is_locked && (
              <Badge variant="outline" className="bg-red-500/10 text-red-500">
                <Lock className="h-3 w-3 mr-1" /> Locked
              </Badge>
            )}
            {pinned && (
              <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                <Pin className="h-3 w-3 mr-1" /> Pinned
              </Badge>
            )}
            {popular && (
              <Badge variant="outline" className="bg-orange-500/10 text-orange-500">
                <Flame className="h-3 w-3 mr-1" /> Hot
              </Badge>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Options</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Report
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Link to={`/discussions/${discussion.id}`} className="block">
          <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
            {discussion.title}
          </h3>
          <p className="text-muted-foreground mb-4">
                  <ReactMarkdown 
                         remarkPlugins={[remarkGfm]}
             rehypePlugins={[rehypeHighlight]}
                         >
                           {discussion.content}
                         </ReactMarkdown>
          </p>
        </Link>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="w-full">
          {/* Current reactions */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              {getTotalReactions() > 0 ? (
                <div className="flex items-center gap-1">
                  <div className="flex items-center p-1 px-2 bg-secondary/50 rounded-full text-sm">
                    {Object.entries(countReactionsByType())
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 3)
                      .map(([emoji, count]) => (
                        <div key={emoji} className="flex items-center mr-1">
                          <span>{emoji}</span>
                          {count > 1 && (
                            <span className="text-xs ml-0.5 text-muted-foreground">
                              {count}
                            </span>
                          )}
                        </div>
                      ))}
                    <span className="ml-1 text-muted-foreground">
                      {/* {getTotal<span className="ml-1 text-muted-foreground"> */}
                      {getTotalReactions()}
                    </span>
                  </div>
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">No reactions yet</span>
              )}
            </div>

            <div className="flex items-center text-sm text-muted-foreground">
              <Eye className="h-4 w-4 mr-1" />
              {discussion.views || 0} Views
            </div>
          </div>

          {/* Reaction button and popup */}
          <div className="relative">
            <div className="flex justify-between border-t pt-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={discussion.user_reaction ? "text-primary" : "text-muted-foreground hover:text-foreground"}
                      onClick={toggleReactionMenu}
                    >
                      {discussion.user_reaction ? (
                        <span className="mr-2 text-lg">{discussion.user_reaction}</span>
                      ) : (
                        <span className="mr-2">😃</span>
                      )}
                      React
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{discussion.user_reaction ? "Change your reaction" : "Add your reaction"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Reply
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>

            {/* Reaction popup menu */}
            {reactionMenuOpen && (
              <div className="absolute left-0 bottom-14 bg-background border rounded-lg shadow-lg p-2 z-10">
                <div className="flex gap-2 p-1">
                  {availableReactions.map((reaction) => (
                    <Button
                      key={reaction.emoji}
                      variant={discussion.user_reaction === reaction.emoji ? "secondary" : "ghost"}
                      className={`p-2 h-auto ${discussion.user_reaction === reaction.emoji ? "bg-primary/20" : "hover:bg-secondary"}`}
                      onClick={() => handleReaction(discussion.id, reaction.emoji)}
                    >
                      <span className="text-xl" role="img" aria-label={reaction.name}>
                        {reaction.emoji}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ForumDetailsPage;