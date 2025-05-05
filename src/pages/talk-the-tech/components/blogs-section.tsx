import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  Menu,
  X,
} from "lucide-react";
import { Blog } from "@/types/blogs";
import { blogsService } from "@/apis/services/tet/blogs.service";
import { useAuthStore } from "@/hooks/use-auth-store";
import { useAppDispatch } from "@/store/store-hooks";
import { SetOpenLogin } from "@/store/slices/auth/auth.slice";

// Common Sidebar Section Component
const SidebarSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-card rounded-lg p-4 border border-border">
    <h3 className="font-medium text-sm mb-3">{title}</h3>
    <div className="space-y-2">{children}</div>
  </div>
);

const CategoryButton = ({ icon, label, count, active, onClick }:any) => (
  <Button
    variant={active ? "default" : "ghost"}
    className={`w-full justify-between text-sm font-normal px-2 py-1.5 h-auto ${active ? '' : 'hover:bg-primary/5'}`}
    onClick={onClick}
  >
    <div className="flex items-center">
      {icon}
      <span className="ml-2 truncate">{label}</span>
    </div>
    <Badge variant={active ? "default" : "outline"} className="ml-2">
      {count}
    </Badge>
  </Button>
);


const FilterBadge = ({ label, onClear }:any) => (
  <Badge variant="outline" className="flex items-center gap-1 bg-primary/5 text-primary">
    {label}
    <button onClick={onClear} className="ml-1 hover:bg-primary/10 rounded-full">
      <X className="h-3 w-3" />
    </button>
  </Badge>
);

const Blogs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);
  const { isAuthenticated } = useAuthStore();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    following: false,
    bookmarked: false,
  });

  // Fetch blogs using TanStack Query
  const {
    data: blogs,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["blogs", { sortBy, searchQuery, currentPage }],
    queryFn: () =>
      blogsService.getBlogs({
        ordering: sortBy === "popular" ? "-views" : "-published_at",
        search: searchQuery || undefined,
        page: currentPage,
        bookmarked: activeFilters.bookmarked,
      }),
  });

  // Handle search input debouncing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setCurrentPage(1);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const handleFilterToggle = (filterType: string) => {
    if (!isAuthenticated) {
      dispatch(SetOpenLogin(true));
      return;
    }

    if (filterType === "following") {
      setActiveFilters((prev) => ({
        ...prev,
        following: !prev.following,
      }));
      if (!activeFilters.following) setSortBy("me");
    } else if (filterType === "bookmarked") {
      setActiveFilters((prev) => ({
        ...prev,
        bookmarked: !prev.bookmarked,
      }));
      if (!activeFilters.bookmarked) setSortBy("bookmark");
    }
  };



  const clearFilter = (filterType: string) => {
    if (filterType === "category") {
      setSelectedCategory(undefined);
    } else if (filterType === "search") {
      setSearchQuery("");
      setDebouncedQuery("");
    } else if (filterType === "following") {
      setActiveFilters((prev) => ({ ...prev, following: false }));
    } else if (filterType === "bookmarked") {
      setActiveFilters((prev) => ({ ...prev, bookmarked: false }));
    }
  };

  const handleCategorySelect = (categoryId:any) => {
    setSelectedCategory(categoryId === selectedCategory ? undefined : categoryId);
    setMobileSidebarOpen(false);
  };

  // Fetch categories
  const { data: categories } = useQuery({
    queryKey: ["blog-categories"],
    queryFn: () => blogsService.getCategories(),
  });

  const totalPages = blogs?.count ? Math.ceil(blogs.count / 10) : 0;

  // Filter blog posts based on search query
  const filteredPosts = blogs?.results || [];

  const handleBlogClick = (slug: string) => {
    navigate(`/blogs/${slug}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
  };

  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handleSortChange = (value: "popular" | "recent") => {
    setSortBy(value);
    setCurrentPage(1);
  };

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500">
          Error loading blogs:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl md:text-2xl font-bold"></h1>
        <Button
          variant="outline"
          size="icon"
          className="lg:hidden"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      <div className="grid lg:grid-cols-4 gap-8">
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* Sidebar - Mobile & Desktop */}
        <div
          className={`fixed lg:static z-50 lg:z-auto inset-y-0 left-0 w-72 p-4 lg:p-0 bg-background lg:bg-transparent overflow-y-auto transition-transform duration-300 ease-in-out ${
            mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 order-2 lg:order-1`}
        >
          <div className="space-y-6 lg:sticky lg:top-4">
            <div className="flex justify-between items-center mb-6 lg:hidden">
              <h2 className="font-semibold">Browse Articles</h2>
              <Button
                variant="ghost"
                size="sm"
                className="p-1 h-auto"
                onClick={() => setMobileSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="md:hidden mb-6">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search articles..."
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
            </div>

            <SidebarSection title="Search">
              <form onSubmit={handleSearch} className="mb-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search articles..."
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
            </SidebarSection>

            <SidebarSection title="Popular Topics">
              {categories?.results.map((category) => (
                <CategoryButton
                  key={category.id}
                  icon={
                    <Tag
                      className={`h-4 w-4 ${
                        selectedCategory === category.id ? "" : "text-primary"
                      }`}
                    />
                  }
                  label={category.name}
                  count={category.blogs_count || 0}
                  active={selectedCategory === category.id}
                  onClick={() => handleCategorySelect(category.id)}
                />
              ))}
            </SidebarSection>

            <SidebarSection title="Reading Lists">
              <div className="flex flex-col space-y-1">
                <Button
                  className="justify-start text-sm font-normal h-auto py-2"
                  variant={activeFilters.bookmarked ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleFilterToggle("bookmarked")}
                >
                  <Bookmark className="h-4 w-4 mr-2 text-primary" /> My
                  Bookmarks
                </Button>

                <Button
                  className="justify-start text-sm font-normal h-auto py-2"
                  variant={sortBy === "popular" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSortBy('popular')}
                >
                  <TrendingUp className="h-4 w-4 mr-2 text-primary" /> Trending
                  Articles
                </Button>
              </div>
            </SidebarSection>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6 order-1 lg:order-2">
                 {/* Active Filters */}
                 {(debouncedQuery || selectedCategory || activeFilters.following || activeFilters.bookmarked) && (
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="text-sm text-muted-foreground flex items-center mr-2">
                Filters:
              </div>
              
              {debouncedQuery && (
                <FilterBadge 
                  label={`Search: ${debouncedQuery}`} 
                  onClear={() => clearFilter('search')} 
                />
              )}
              
           
              
              {activeFilters.following && (
                <FilterBadge 
                  label="Following" 
                  onClear={() => clearFilter('following')} 
                />
              )}
              
              {activeFilters.bookmarked && (
                <FilterBadge 
                  label="Bookmarked" 
                  onClear={() => clearFilter('bookmarked')} 
                />
              )}
            </div>
          )}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Latest Articles</h2>

            <Tabs
              value={sortBy}
              onValueChange={(value) =>
                handleSortChange(value as "popular" | "recent")
              }
              className="hidden sm:block"
            >
              <TabsList className="bg-muted/50">
                <TabsTrigger value="popular" className="text-xs">
                  Popular
                </TabsTrigger>
                <TabsTrigger value="recent" className="text-xs">
                  Recent
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {isLoading && currentPage === 1 ? (
            <div className="space-y-6">
              <BlogPostSkeleton />
              <BlogPostSkeleton />
              <BlogPostSkeleton />
            </div>
          ) : (
            <>
              {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    No articles found
                  </h3>
                  <p className="text-muted-foreground">
                    Try changing your search query or filters.
                  </p>
                </div>
              ) : (
                <>
                  {filteredPosts.map((post) => (
                    <div
                      key={post.id}
                      className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-border/50 cursor-pointer"
                      onClick={() => handleBlogClick(post.slug)}
                    >
                      <div className="flex flex-col md:flex-row gap-4">
                        {post.featured_image && (
                          <div className="md:w-1/3 bg-primary/10 h-48 md:h-auto shrink-0 relative overflow-hidden">
                            <img
                              src={post.featured_image}
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}

                        <div className="flex-1 p-5">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 text-xs">
                              {/* You might want to calculate read time based on content length */}
                              5 min read
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              •{" "}
                              {new Date(
                                post.published_at || post.created_at
                              ).toLocaleDateString()}
                            </span>
                          </div>

                          <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                            {post.title}
                          </h3>

                          <p className="text-muted-foreground mb-4 line-clamp-2">
                            {post.content.substring(0, 200)}...
                          </p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.categories.slice(0, 3).map((category) => (
                              <Badge
                                key={category.id}
                                variant="outline"
                                className="hover:bg-primary/10 hover:text-primary"
                              >
                                #{category.name}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm">
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarFallback>
                                  {post.author.username
                                    .substring(0, 2)
                                    .toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">
                                {post.author.username}
                              </span>
                            </div>

                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <PieChart className="h-4 w-4" />
                                {post.views} views
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageSquare className="h-4 w-4" />
                                {post.comments.length || 0} comments
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {isLoading && currentPage > 1 && (
                <div className="text-center py-4">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Loading more articles...
                  </p>
                </div>
              )}

              {blogs?.next && !isLoading && (
                <div className="flex justify-center pt-4">
                  <Button
                    variant="outline"
                    className="w-full md:w-auto"
                    onClick={handleLoadMore}
                  >
                    Load More Articles
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Blog Post Skeleton
const BlogPostSkeleton = () => (
  <div className="bg-card rounded-xl overflow-hidden shadow-sm border border-border/50 animate-pulse">
    <div className="flex flex-col md:flex-row gap-4">
      <div className="md:w-1/3 bg-muted h-48 md:h-auto shrink-0"></div>
      <div className="flex-1 p-5">
        <div className="flex items-center gap-2 mb-1">
          <div className="h-5 w-16 bg-muted rounded"></div>
          <div className="h-4 w-20 bg-muted rounded"></div>
        </div>
        <div className="h-7 w-3/4 bg-muted rounded mb-2"></div>
        <div className="h-4 w-full bg-muted rounded mb-1"></div>
        <div className="h-4 w-2/3 bg-muted rounded mb-4"></div>
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="h-5 w-16 bg-muted rounded"></div>
          <div className="h-5 w-20 bg-muted rounded"></div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-6 w-6 rounded-full bg-muted mr-2"></div>
            <div className="h-4 w-20 bg-muted rounded"></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-4 w-10 bg-muted rounded"></div>
            <div className="h-4 w-10 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Blogs;
