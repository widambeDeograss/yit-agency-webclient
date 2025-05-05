import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useNavigate, Link } from 'react-router-dom';
import {
  TrendingUp,
  Star,
  Clock,
  Bookmark,
  Tag,
  MessageSquare,
  PieChart,
  FileText,
  Search,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  AlertCircle,
  Menu,
} from 'lucide-react';
import { any } from 'zod';
import { forumsService } from '@/apis/services/tet/forums.services';
import { useAuthStore } from '@/hooks/use-auth-store';
import { useAppDispatch } from '@/store/store-hooks';
import { SetOpenLogin } from '@/store/slices/auth/auth.slice';
import CreateForumModal from './create-forum';

const SidebarSection = ({ title, children }: any) => (
  <div className="bg-card rounded-lg p-4 border border-border">
    <h3 className="font-medium text-sm mb-3">{title}</h3>
    <div className="space-y-2">{children}</div>
  </div>
);

const CategoryButton = ({ icon, label, count, active, onClick }: any) => (
  <Button
    variant={active ? "default" : "ghost"}
    className={`w-full justify-between text-sm font-normal px-2 py-1.5 h-auto ${active ? '' : 'hover:bg-primary/5'}`}
    onClick={onClick}
  >
    <div className="flex items-center">
      {icon}
      <span className="truncate">{label}</span>
    </div>
    <Badge variant={active ? "default" : "outline"} className="ml-2">
      {count}
    </Badge>
  </Button>
);

const Forums = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<number>();
  const { isAuthenticated } = useAuthStore();
  const dispatch = useAppDispatch();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [following, setFollowing] = useState(false);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setCurrentPage(1);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const { 
    data: forumsData, 
    isLoading: forumsLoading, 
    error: forumsError,
    refetch: refetchForums 
  } = useQuery({
    queryKey: ['forums', currentPage, sortBy, debouncedQuery, selectedCategory],
    queryFn: () => forumsService.getForums({
      search: debouncedQuery,
      page: currentPage,
      size: 10,
      category: selectedCategory ,
      followed_by: following ? "me" : "",
    }),
  });

  const { 
    data: categoriesData, 
    isLoading: categoriesLoading 
  } = useQuery({
    queryKey: ['categories'],
    queryFn: () => forumsService.getForumCategories(),
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId === selectedCategory ? undefined : categoryId);
    setCurrentPage(1);
    setMobileSidebarOpen(false); // Close mobile sidebar when selecting a category
  };

  const handleSortChange = (value: any) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleForumClick = (forumId: number) => {
    navigate(`/forum/${forumId}`);
  };

  const totalPages = forumsData?.count ? Math.ceil(forumsData.count / 10) : 0;

  const getAvatarFallback = (name: string) => {
    if (!name) return '';
    const nameParts = name.split(' ');
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="container mx-auto py-4 md:py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Tech Forums</h1>
        <Button 
          variant="outline" 
          size="icon" 
          className="md:hidden"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="grid lg:grid-cols-4 gap-6 md:gap-8">
        {/* Mobile Sidebar Overlay */}
        {mobileSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* Sidebar - Mobile & Desktop */}
        <div className={`fixed lg:static z-50 lg:z-auto inset-y-0 left-0 w-72 p-4 lg:p-0 bg-background lg:bg-transparent overflow-y-auto transition-transform duration-300 ease-in-out ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 order-2 lg:order-1`}>
          <div className="space-y-6">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search forums..." 
                  className="w-full pl-9"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            
            <SidebarSection title="Browse By">
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant={sortBy === 'popular' ? "default" : "outline"} 
                  size="sm" 
                  className="justify-start"
                  onClick={() => handleSortChange('popular')}
                >
                  <TrendingUp className="h-4 w-4 mr-2" /> Popular
                </Button>
                <Button 
                  variant={sortBy === 'recent' ? "default" : "outline"} 
                  size="sm" 
                  className="justify-start"
                  onClick={() => handleSortChange('recent')}
                >
                  <Clock className="h-4 w-4 mr-2" /> Recent
                </Button>
                <Button 
                 variant={sortBy === 'me' ? "default" : "outline"} 
                size="sm" className="justify-start"
                
                  onClick={() => {
               if (isAuthenticated) {
                    setFollowing(!following);
                    setSortBy('me');
                    setCurrentPage(1);
                  }
                  else {
                    dispatch(SetOpenLogin(true));
                  }
                
               }
                  }
                >
                  <Star className="h-4 w-4 mr-2 text-primary" /> Following
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Bookmark className="h-4 w-4 mr-2 text-primary" /> Saved
                </Button>
              </div>
            </SidebarSection>
            
            <SidebarSection title="Categories">
              {categoriesLoading ? (
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-8 bg-muted rounded animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <>
                  {categoriesData?.results?.map(category => (
                    <CategoryButton
                      key={category.id}
                      icon={<Tag className={`h-4 w-4 mr-2 ${selectedCategory === category.id ? '' : 'text-primary'}`} />}
                      label={category.name}
                      count={category.forum_count || 0}
                      active={selectedCategory === category.id}
                      onClick={() => handleCategorySelect(category.id)}
                    />
                  ))}
                </>
              )}
            </SidebarSection>

            <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
              <h3 className="font-medium text-sm mb-3">Join the conversation</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Connect with other tech enthusiasts and share your knowledge.
              </p>
              {isAuthenticated ? (
                <CreateForumModal />
              ) : (
                <Button variant="default" className="w-full" onClick={() => dispatch(SetOpenLogin(true))}>
                  Create a Forum
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6 order-1 lg:order-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h2 className="text-lg md:text-xl font-semibold">
              {debouncedQuery ? `Search: "${debouncedQuery}"` : 'All Forums'}
              {selectedCategory && categoriesData?.results && (
                <span className="text-muted-foreground ml-2 text-sm">
                  in {categoriesData.results.find(c => c.id === selectedCategory)?.name}
                </span>
              )}
            </h2>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                onClick={() => refetchForums()}
                disabled={forumsLoading}
              >
                <RefreshCw className={`h-4 w-4 ${forumsLoading ? 'animate-spin' : ''}`} />
              </Button>
              
              <Tabs value={sortBy} onValueChange={handleSortChange}>
                <TabsList className="bg-muted/50">
                  <TabsTrigger value="popular" className="text-xs">Popular</TabsTrigger>
                  <TabsTrigger value="recent" className="text-xs">Recent</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {forumsLoading ? (
            <div className="space-y-4 md:space-y-6">
              <ForumSkeleton />
              <ForumSkeleton />
              <ForumSkeleton />
            </div>
          ) : forumsError ? (
            <div className="p-6 md:p-8 text-center rounded-xl border border-border">
              <AlertCircle className="h-10 w-10 md:h-12 md:w-12 mx-auto text-red-500 mb-4" />
              <p className="text-base md:text-lg font-medium mb-2">Error loading forums.</p>
              <p className="text-muted-foreground mb-4 md:mb-6">There was a problem fetching the forums. Please try again later.</p>
              <Button onClick={() => refetchForums()}>
                Try Again
              </Button>
            </div>
          ) : forumsData?.results?.length === 0 ? (
            <div className="p-6 md:p-8 text-center rounded-xl border border-border">
              <FileText className="h-10 w-10 md:h-12 md:w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-base md:text-lg font-medium mb-2">No forums found</p>
              <p className="text-muted-foreground mb-4 md:mb-6">
                {debouncedQuery 
                  ? `No forums matching "${debouncedQuery}" were found.` 
                  : selectedCategory 
                    ? "No forums in this category yet." 
                    : "No forums available. Be the first to create one!"}
              </p>
            </div>
          ) : (
            <>
              {forumsData?.results?.map((forum) => (
                <div 
                  key={forum.id} 
                  className="bg-card rounded-xl p-4 md:p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-border/50 cursor-pointer"
                  onClick={() => handleForumClick(forum.id)}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8 md:h-10 md:w-10">
                      {forum.created_by.profile_image ? (
                        <AvatarImage src={forum.created_by.profile_image} alt={forum.created_by.username} />
                      ) : (
                        <AvatarFallback>
                          {getAvatarFallback(`${forum.created_by.first_name} ${forum.created_by.last_name}`)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1 md:gap-2 mb-1">
                        <span className="font-medium text-sm md:text-base">{forum.created_by.username}</span>
                        <span className="text-xs md:text-sm text-muted-foreground">• {formatDate(forum.created_at)}</span>
                        {forum.followers_count > 10 && (
                          <Badge className="bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 text-xs">Hot</Badge>
                        )}
                        {!forum.is_public && (
                          <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 text-xs">Private</Badge>
                        )}
                        {forum.locked && (
                          <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20 text-xs">Locked</Badge>
                        )}
                      </div>
                      
                      <h3 className="text-base md:text-lg font-semibold mb-2 hover:text-primary transition-colors line-clamp-2">
                        {forum.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-3 line-clamp-2 text-sm md:text-base">
                        {forum.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="outline" className="hover:bg-primary/10 hover:text-primary text-xs md:text-sm">
                          #{forum.category.name}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3 md:h-4 md:w-4" />
                          {forum.discussion_count || 0} discussions
                        </div>
                        <div className="flex items-center gap-1">
                          <Bookmark className="h-3 w-3 md:h-4 md:w-4" />
                          {forum.followers_count || 0} followers
                        </div>
                        <div className="flex items-center gap-1">
                          <PieChart className="h-3 w-3 md:h-4 md:w-4" />
                          {forum.views || 0} views
                        </div>
                      </div>
                      
                      {forum.latest_discussion && (
                        <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-border/50">
                          <div className="flex items-center gap-2 mb-1 md:mb-2">
                            <div className="w-1 h-4 md:h-5 bg-primary/50 rounded"></div>
                            <span className="text-xs md:text-sm font-medium">Latest Discussion</span>
                          </div>
                          <div className="ml-3">
                            <div className="flex flex-wrap items-center gap-1 md:gap-2">
                              <Avatar className="h-5 w-5 md:h-6 md:w-6">
                                {forum.latest_discussion.author.profile_image ? (
                                  <AvatarImage src={forum.latest_discussion.author.profile_image} />
                                ) : (
                                  <AvatarFallback>
                                    {getAvatarFallback(`${forum.latest_discussion.author.first_name} ${forum.latest_discussion.author.last_name}`)}
                                  </AvatarFallback>
                                )}
                              </Avatar>
                              <span className="text-xs md:text-sm">{forum.latest_discussion.author.username}</span>
                              <span className="text-xs text-muted-foreground">
                                {formatDate(forum.latest_discussion.created_at)}
                              </span>
                            </div>
                            <p className="text-sm font-medium mt-1 hover:text-primary line-clamp-1">
                              {forum.latest_discussion.title}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination className="mt-6 md:mt-8">
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
                              size="sm"
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const ForumSkeleton = () => (
  <div className="bg-card rounded-xl p-4 md:p-5 shadow-sm border border-border/50 animate-pulse">
    <div className="flex items-start gap-3">
      <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-muted"></div>
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-1 md:gap-2 mb-1">
          <div className="h-3 md:h-4 w-20 md:w-24 bg-muted rounded"></div>
          <div className="h-3 w-12 md:w-16 bg-muted rounded"></div>
        </div>
        <div className="h-4 md:h-6 w-3/4 bg-muted rounded mb-2"></div>
        <div className="flex flex-wrap gap-2 mb-3">
          <div className="h-4 w-16 bg-muted rounded"></div>
          <div className="h-4 w-20 bg-muted rounded"></div>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="h-3 md:h-4 w-12 bg-muted rounded"></div>
          <div className="h-3 md:h-4 w-12 bg-muted rounded"></div>
          <div className="h-3 md:h-4 w-20 bg-muted rounded"></div>
        </div>
      </div>
    </div>
  </div>
);

export default Forums;