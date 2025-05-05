import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, Loader2, Search, Filter } from 'lucide-react';
import { TechPoll, TechPollApiResponse } from '@/types/tet-polls';
import { useAuthStore } from '@/hooks/use-auth-store';
import { useAppDispatch } from '@/store/store-hooks';
import { SetOpenLogin } from '@/store/slices/auth/auth.slice';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { pollsService } from '@/apis/services/tet/polls.services';
import { forumsService } from '@/apis/services/tet/forums.services';

const Polls = () => {
  const { isAuthenticated } = useAuthStore();
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  
  const { 
    data: pollsData, 
    isLoading, 
    error,
    refetch 
  } = useQuery<TechPollApiResponse>({
    queryKey: ['polls', currentPage, searchQuery, selectedCategory],
    queryFn: () => pollsService.getPolls({ 
      page: currentPage,
      search: searchQuery,
    }),
  });

  // Fetching categories
  const { 
    data: categoriesData,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: () => forumsService.getForumCategories(),
  });

  const handleVote = async (pollId: number, optionId: number) => {
    if (!isAuthenticated) {
      dispatch(SetOpenLogin(true));
      return;
    }

    try {
      await pollsService.createVote({
        poll: pollId,
        option: optionId
      });
      refetch();
    } catch (error) {
      console.error('Failed to vote:', error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
  };

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
    setCurrentPage(1);
  };

  const totalPages = pollsData?.count ? Math.ceil(pollsData.count / 10) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Sidebar Component */}
      <div className="md:col-span-1">
        <div className="bg-card rounded-xl p-4 shadow-sm border border-border/50 sticky top-20">
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
              {isLoading ? (
                Array(5).fill(0).map((_, i) => (
                  <div key={i} className="h-6 bg-muted rounded animate-pulse"></div>
                ))
              ) : categoriesData?.results ? (
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

          {/* <div className="mt-6 pt-4 border-t border-border">
            <Button variant="outline" className="w-full" as={Link} to="/polls/trending">
              Trending Polls
            </Button>
            {isAuthenticated && (
              <Button variant="outline" className="w-full mt-2" as={Link} to="/polls/my-polls">
                My Polls
              </Button>
            )}
          </div> */}
        </div>
      </div>

      {/* Main Content */}
      <div className="md:col-span-3">
        {isLoading ? (
          <div className="space-y-6">
            <PollSkeleton />
            <PollSkeleton />
            <PollSkeleton />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">Failed to load polls</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => refetch()}
            >
              Retry
            </Button>
          </div>
        ) : !pollsData?.results || pollsData.results.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-xl p-6 shadow-sm border border-border/50">
            <p className="text-muted-foreground">No polls available yet</p>
            {searchQuery || selectedCategory ? (
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                }}
              >
                Clear filters
              </Button>
            ) : null}
          </div>
        ) : (
          <div className="space-y-6">
            {pollsData.results.map((poll) => (
              <PollItem 
                key={poll.id} 
                poll={poll} 
                onVote={handleVote} 
              />
            ))}

            {totalPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNumber;
                    
                    if (totalPages <= 5) {
                      pageNumber = i + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i;
                    } else {
                      pageNumber = currentPage - 2 + i;
                    }
                    
                    if (pageNumber > 0 && pageNumber <= totalPages) {
                      return (
                        <PaginationItem key={pageNumber}>
                          <Button 
                            variant={currentPage === pageNumber ? "default" : "outline"}
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handlePageChange(pageNumber)}
                          >
                            {pageNumber}
                          </Button>
                        </PaginationItem>
                      );
                    }
                    return null;
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

interface PollItemProps {
  poll: TechPoll;
  onVote?: (pollId: number, optionId: number) => void;
}

const PollItem: React.FC<PollItemProps> = ({ poll, onVote }) => {
  const totalVotes = poll.options.reduce((sum, option) => sum + (option.vote_count || 0), 0) || 1;
  const [isVoting, setIsVoting] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleVoteClick = async () => {
    if (selectedOption === null) return;
    
    setIsVoting(true);
    try {
      await onVote?.(poll.id, selectedOption);
    } finally {
      setIsVoting(false);
    }
  };

  // Calculate time remaining
  const calculateTimeRemaining = () => {
    if (!poll.ends_at) return null;
    
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

  return (
    <div className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-border/50">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2 mb-2">
          <Avatar className="h-8 w-8">
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
        
        <Badge variant="outline" className="text-sm bg-amber-100 text-amber-800 border-amber-200">
          {calculateTimeRemaining()}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-3">
        {poll.featured_image && (
          <div className="md:col-span-2">
            <img 
              src={poll.featured_image} 
              alt={poll.title} 
              className="rounded-lg w-full h-48 object-cover"
            />
          </div>
        )}
        
        <div className={`${poll.featured_image ? 'md:col-span-3' : 'md:col-span-5'}`}>
          <Link to={`/polls/${poll.id}`} className="hover:underline">
            <h3 className="text-xl font-semibold mb-4">{poll.title}</h3>
          </Link>
          
          <div className="space-y-3">
            {poll.options.map((option) => (
              <div key={option.id}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`poll-${poll.id}`}
                        className="h-4 w-4 text-primary"
                        onChange={() => setSelectedOption(option.id)}
                        disabled={poll.user_vote !== null || isVoting}
                        checked={selectedOption === option.id}
                      />
                      <span>{option.text}</span>
                    </label>
                  </span>
                  <span className="text-muted-foreground">
                    {option.vote_percentage}%
                  </span>
                </div>
                <Progress 
                  value={option.vote_percentage} 
                  className="h-2"
                  //@ts-ignore
                  indicatorClassName={
                    option.id === 1 ? 'bg-blue-500' :
                    option.id === 2 ? 'bg-green-500' :
                    option.id === 3 ? 'bg-red-500' :
                    option.id === 4 ? 'bg-purple-500' :
                    option.id === 5 ? 'bg-yellow-500' :
                    option.id === 6 ? 'bg-cyan-500' :
                    'bg-primary'
                  }
                />
                <div className="mt-1 text-xs text-muted-foreground text-right">
                  {option.vote_count} votes
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {poll.categories?.map(category => (
                <Badge key={category} variant="outline" className="hover:bg-primary/10 hover:text-primary">
                  #{category}
                </Badge>
              ))}
            </div>
            
            <div className="flex space-x-2">
              {poll.user_vote ? (
                <Button variant="outline" size="sm" disabled>
                  Voted
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleVoteClick}
                  disabled={selectedOption === null || isVoting}
                >
                  {isVoting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Vote Now'
                  )}
                </Button>
              )}
              
              <Button
                variant="default"
                size="sm"
                // as={Link}
                onClick={() => {
                  window.open(`/polls/${poll.id}`);
                }
                }
           
              >
                View Details
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-muted-foreground flex items-center">
        <Clock className="h-4 w-4 mr-1" />
        <span>
          {new Date(poll.starts_at).toLocaleDateString()} - {new Date(poll.ends_at).toLocaleDateString()}
        </span>
        <span className="mx-2">•</span>
        <span>{poll.total_votes} total votes</span>
      </div>
    </div>
  );
};

const PollSkeleton = () => (
  <div className="bg-card rounded-xl p-6 shadow-sm border border-border/50 animate-pulse">
    <div className="flex items-center gap-2 mb-2">
      <div className="h-8 w-8 rounded-full bg-muted"></div>
      <div>
        <div className="h-4 w-24 bg-muted rounded"></div>
        <div className="h-3 w-32 bg-muted rounded mt-1"></div>
      </div>
    </div>
    <div className="h-7 w-3/4 bg-muted rounded mt-3 mb-6"></div>
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i}>
          <div className="flex justify-between mb-1">
            <div className="h-5 w-32 bg-muted rounded"></div>
            <div className="h-4 w-8 bg-muted rounded"></div>
          </div>
          <div className="h-2 w-full bg-muted rounded"></div>
          <div className="h-3 w-12 bg-muted rounded mt-1 ml-auto"></div>
        </div>
      ))}
    </div>
    <div className="mt-6 flex items-center justify-between">
      <div className="flex flex-wrap gap-2">
        <div className="h-5 w-16 bg-muted rounded"></div>
        <div className="h-5 w-20 bg-muted rounded"></div>
      </div>
      <div className="h-8 w-20 bg-muted rounded"></div>
    </div>
  </div>
);

export default Polls;