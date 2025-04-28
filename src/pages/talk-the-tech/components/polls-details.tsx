import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { 
  Clock, 
  Loader2, 
  Search, 
  Filter, 
  Share2, 
  MessageSquare, 
  Calendar, 
  Users, 
  ChevronLeft,
  ThumbsUp,
  Flag
} from 'lucide-react';
import { TechPoll } from '@/types/tet-polls';
import { useAuthStore } from '@/hooks/use-auth-store';
import { useAppDispatch } from '@/store/store-hooks';
import { SetOpenLogin } from '@/store/slices/auth/auth.slice';
import { pollsService } from '@/apis/services/tet/polls.services';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { forumsService } from '@/apis/services/tet/forums.services';

const PollDetails = () => {
  const { id:pollId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const dispatch = useAppDispatch();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // Fetch poll details
  const { 
    data: poll, 
    isLoading, 
    error,
    refetch 
  } = useQuery<TechPoll>({
    queryKey: ['poll', pollId],
    queryFn: () => pollsService.getPollDetail(Number(pollId)),
    enabled: !!pollId,
  });

  // Fetch related polls
  const { 
    data: relatedPolls
  } = useQuery({
    queryKey: ['relatedPolls', pollId],
    queryFn: () => pollsService.getPolls(),
    enabled: !!pollId,
  });

  // Fetch categories
  const { 
    data: categoriesData
  } = useQuery({
    queryKey: ['categories'],
    queryFn: () => forumsService.getForumCategories(),
  });

  const handleVote = async () => {
    if (!isAuthenticated) {
      dispatch(SetOpenLogin(true));
      return;
    }

    if (selectedOption === null) return;
    
    setIsVoting(true);
    try {
      await pollsService.createVote({
        poll: Number(pollId),
        option: selectedOption
      });
      refetch();
    } catch (error) {
      console.error('Failed to vote:', error);
    } finally {
      setIsVoting(false);
    }
  };


  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
    navigate(`/polls?category=${categoryId}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/polls?search=${searchQuery}`);
  };

  const handleSharePoll = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    // Show toast notification
    alert('Poll URL copied to clipboard!');
  };

  // Calculate time remaining
  const calculateTimeRemaining = () => {
    if (!poll?.ends_at) return null;
    
    const endDate = new Date(poll.ends_at);
    const now = new Date();
    
    if (now > endDate) return "Poll ended";
    
    const diffTime = Math.abs(endDate.getTime() - now.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 0) return `${diffDays} days left`;
    
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (diffHours > 0) return `${diffHours} hours left`;
    
    const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    return `${diffMinutes} minutes left`;
  };

  // Calculate percentage for poll options
  const totalVotes = poll?.options.reduce((sum, option) => sum + (option.vote_count || 0), 0) || 1;

  if (isLoading) {
    return <PollDetailsSkeleton />;
  }

  if (error || !poll) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Failed to load poll details</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => refetch()}
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
<div className='container mx-auto px-4 py-8'>

<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar - Hidden on mobile, shown on lg screens */}
      <div className="hidden lg:block lg:col-span-1">
        <div className="bg-card rounded-xl p-4 shadow-sm border border-border/50 sticky top-20">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-4" 
            onClick={() => navigate('/polls')}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Polls
          </Button>

          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search polls..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                variant="default" 
                size="sm" 
                className="absolute right-1 top-1"
              >
                Search
              </Button>
            </div>
          </form>
          
          <div>
            <div className="flex items-center mb-3">
              <Filter className="h-4 w-4 mr-2" />
              <h3 className="font-medium">Categories</h3>
            </div>
            
            <div className="space-y-2">
              {categoriesData?.results ? (
                categoriesData.results.map((category) => (
                  <Badge 
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    className="mr-2 mb-2 cursor-pointer hover:bg-primary/10 hover:text-primary w-full justify-between"
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    {category.name}
                    <span className="ml-auto bg-background/80 text-xs px-1.5 py-0.5 rounded-sm">
                      {0}
                    </span>
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No categories found</p>
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <h3 className="font-medium mb-3">Related Polls</h3>
            <div className="space-y-3">
              {relatedPolls?.results?.slice(0, 5).map((relatedPoll) => (
                <Link 
                  key={relatedPoll.id} 
                  to={`/polls/${relatedPoll.id}`}
                  className="block bg-background rounded-lg p-3 hover:bg-accent transition-colors"
                >
                  <h4 className="font-medium text-sm line-clamp-2">{relatedPoll.title}</h4>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <Users className="h-3 w-3 mr-1" />
                    <span>{relatedPoll.total_votes} votes</span>
                  </div>
                </Link>
              ))}
              {(!relatedPolls?.results || relatedPolls.results.length === 0) && (
                <p className="text-sm text-muted-foreground">No related polls found</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Full width on mobile, 3 cols on lg */}
      <div className="col-span-1 lg:col-span-3">
        {/* Mobile back button - shown only on small screens */}
        <div className="lg:hidden mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/polls')}
            className="w-full justify-start"
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Polls
          </Button>
        </div>

        <div className="bg-card rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-border/50 overflow-hidden">
          {/* Header */}
          <div className="p-4 sm:p-6 sm:pb-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  {poll.created_by?.profile_image ? (
                    <AvatarImage src={poll.created_by.profile_image} alt={poll.created_by.username} />
                  ) : (
                    <AvatarFallback>
                      {poll.created_by?.username?.slice(0, 2).toUpperCase() || '??'}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <div className="font-medium">{poll.created_by?.username || 'Anonymous'}</div>
                  <div className="text-xs text-muted-foreground">
                    Posted a poll • {new Date(poll.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 sm:space-x-2">
                <Badge variant="outline" className="text-sm bg-amber-100 text-amber-800 border-amber-200">
                  {calculateTimeRemaining()}
                </Badge>
                <Button variant="outline" size="sm" onClick={handleSharePoll} className="w-full sm:w-auto">
                  <Share2 className="h-4 w-4 mr-1" /> Share
                </Button>
              </div>
            </div>
            
            <h1 className="text-xl sm:text-2xl font-bold mt-4">{poll.title}</h1>
            
            {poll.description && (
              <p className="text-muted-foreground mt-2">{poll.description}</p>
            )}
            
            <div className="flex flex-wrap gap-2 mt-3">
              {poll.categories?.map(category => (
                <Badge key={category} variant="outline" className="hover:bg-primary/10 hover:text-primary">
                  #{category}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Featured Image */}
          {poll.featured_image && (
            <div className="relative">
              <img 
                src={poll.featured_image} 
                alt={poll.title} 
                className="w-full h-48 sm:h-64 object-cover"
              />
            </div>
          )}
          
          {/* Tabs */}
          <Tabs defaultValue="vote" className="p-4 sm:p-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="vote">Vote</TabsTrigger>
              {/* <TabsTrigger value="discussion">
                Discussion {comments?.results?.length ? `(${comments.results.length})` : ''}
              </TabsTrigger> */}
            </TabsList>
            
            {/* Vote Tab */}
            <TabsContent value="vote" className="mt-6">
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <h3 className="text-lg font-medium">Cast your vote</h3>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Ends on {new Date(poll.ends_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {poll.options.map((option) => (
                    <div key={option.id} className="bg-background rounded-lg p-4 border border-border/50">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2">
                        <span className="font-medium">
                          <label className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="radio"
                              name={`poll-${poll.id}`}
                              className="h-5 w-5 text-primary"
                              onChange={() => setSelectedOption(option.id)}
                              checked={selectedOption === option.id}
                              disabled={poll.user_vote !== null || isVoting}
                            />
                            <span className="text-base sm:text-lg">{option.text}</span>
                          </label>
                        </span>
                        <span className="text-lg font-semibold">
                          {option.vote_percentage}%
                        </span>
                      </div>
                      <Progress 
                        value={option.vote_percentage} 
                        className="h-3 rounded-md"
                        //@ts-ignore
                        indicatorClassName={
                          option.id === 1 ? 'bg-blue-500' :
                          option.id === 2 ? 'bg-green-500' :
                          option.id === 3 ? 'bg-red-500' :
                          option.id === 4 ? 'bg-purple-500' :
                          option.id === 5 ? 'bg-yellow-500' :
                          option.id === 6 ? 'bg-cyan-500' :
                          option.id === 7 ? 'bg-orange-500' :
                          'bg-primary'
                        }
                      />
                      <div className="mt-2 text-sm text-muted-foreground text-right">
                        {option.vote_count} votes
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-4 mt-8">
                  <div className="text-sm text-muted-foreground">
                    <Users className="h-4 w-4 inline mr-1" />
                    <span>{poll.total_votes} total votes</span>
                  </div>
                  
                  {poll.user_vote ? (
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
                      <Button variant="outline" size="lg" disabled className="w-full sm:w-auto">
                        Already Voted
                      </Button>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 w-full sm:w-auto text-center">
                        You voted for: {poll.options.find(o => o.id === poll.user_vote)?.text}
                      </Badge>
                    </div>
                  ) : (
                    <Button 
                      variant="default" 
                      size="lg"
                      onClick={handleVote}
                      disabled={selectedOption === null || isVoting}
                      className="w-full sm:w-auto"
                    >
                      {isVoting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Submitting...
                        </>
                      ) : (
                        'Submit Vote'
                      )}
                    </Button>
                  )}
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg mt-6">
                  <div className="flex items-center mb-2">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <h4 className="font-medium">Poll Timeline</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Started</p>
                      <p className="font-medium">{new Date(poll.starts_at).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Ends</p>
                      <p className="font-medium">{new Date(poll.ends_at).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Stats Card */}
        <div className="bg-card rounded-xl p-4 sm:p-6 shadow-sm border border-border/50 mt-6">
          <h3 className="font-semibold mb-4">Poll Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Votes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold">{poll.total_votes}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Time Remaining</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold">{calculateTimeRemaining()}</div>
              </CardContent>
            </Card>
           
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Leading Option</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-base sm:text-xl font-bold truncate">
                  {poll.options.reduce((prev, current) => 
                    (prev.vote_count > current.vote_count) ? prev : current
                  ).text}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>

</div>
  );
};

const PollDetailsSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
    <div className="hidden lg:block lg:col-span-1">
      <div className="bg-card rounded-xl p-4 shadow-sm border border-border/50 animate-pulse">
        <div className="h-8 w-24 bg-muted rounded mb-4"></div>
        <div className="h-10 w-full bg-muted rounded mb-6"></div>
        <div className="space-y-3">
          <div className="h-5 w-full bg-muted rounded"></div>
          <div className="h-6 w-full bg-muted rounded"></div>
          <div className="h-6 w-full bg-muted rounded"></div>
          <div className="h-6 w-full bg-muted rounded"></div>
        </div>
      </div>
    </div>
    
    <div className="col-span-1 lg:col-span-3">
      <div className="bg-card rounded-xl p-4 sm:p-6 shadow-sm border border-border/50 animate-pulse">
        <div className="flex items-center gap-2 mb-6">
          <div className="h-10 w-10 rounded-full bg-muted"></div>
          <div>
            <div className="h-5 w-32 bg-muted rounded"></div>
            <div className="h-3 w-40 bg-muted rounded mt-1"></div>
          </div>
        </div>
        <div className="h-8 w-3/4 bg-muted rounded mb-4"></div>
        <div className="h-4 w-1/2 bg-muted rounded mb-4"></div>
        <div className="h-48 sm:h-64 bg-muted rounded-lg mb-6"></div>
        <div className="h-10 w-full bg-muted rounded mb-6"></div>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-muted rounded"></div>
          ))}
        </div>
        <div className="h-12 w-32 bg-muted rounded mt-6 ml-auto"></div>
      </div>
    </div>
  </div>
);

export default PollDetails;