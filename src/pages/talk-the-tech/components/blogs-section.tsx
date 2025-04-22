import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  TrendingUp,
  Star,
  Clock,
  Bookmark,
  Tag,
  MessageSquare,
  PieChart,
  FileText,
} from 'lucide-react';


// Common Sidebar Section Component
const SidebarSection = ({ title, children }:any) => (
  <div className="bg-card rounded-lg p-4 border border-border">
    <h3 className="font-medium text-sm mb-3">{title}</h3>
    <div className="space-y-2">{children}</div>
  </div>
);

// Common Category Button Component
const CategoryButton = ({ icon, label, count }:any) => (
  <Button
    variant="ghost"
    className="w-full justify-between text-sm font-normal px-2 py-1.5 h-auto hover:bg-primary/5"
  >
    <div className="flex items-center">
      {icon}
      {label}
    </div>
    <Badge variant="outline" className="ml-2">
      {count}
    </Badge>
  </Button>
);

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


// Blogs Component with preset data
const Blogs = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('popular');
    const [isLoading, setIsLoading] = useState(false);
  
    // Sample blog posts data
    const blogPosts = [
      {
        author: "TechWriter",
        authorAvatar: "TW",
        date: "April 18, 2025",
        title: "The Evolution of TypeScript: What's New in 2025",
        content: "TypeScript continues to evolve with powerful new features. In this article, we explore the latest additions to the language and how they can improve your development workflow.",
        tags: ["typescript", "javascript", "webdev"],
        views: "2.4K",
        bookmarks: 189,
        readTime: "5 min"
      },
      {
        author: "AIEngineer",
        authorAvatar: "AE",
        date: "April 15, 2025",
        title: "Practical Guide to Implementing GPT-5 in Your Applications",
        content: "GPT-5 brings revolutionary capabilities to AI-powered applications. Learn how to integrate these advanced models into your software stack with practical examples and performance tips.",
        tags: ["ai", "machine-learning", "gpt"],
        views: "3.8K",
        bookmarks: 276,
        readTime: "8 min"
      },
      {
        author: "CloudArchitect",
        authorAvatar: "CA",
        date: "April 10, 2025",
        title: "Serverless Architecture Patterns for High-Scale Applications",
        content: "Designing for scale becomes easier with modern serverless patterns. This guide walks through proven architectures for building applications that can handle millions of users without infrastructure headaches.",
        tags: ["serverless", "cloud", "architecture"],
        views: "1.9K",
        bookmarks: 147,
        readTime: "6 min"
      }
    ];
  
    // Filter blog posts based on search query
    const filteredPosts = blogPosts.filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    return (
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="space-y-6 order-2 lg:order-1">
          <div className="md:hidden mb-6">
            <Input 
              placeholder="Search articles..." 
              className="w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <SidebarSection title="Content Types">
            <div className="grid grid-cols-1 gap-2">
              <Button variant="outline" size="sm" className="justify-start">
                <FileText className="h-4 w-4 mr-2 text-primary" /> Articles
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                <MessageSquare className="h-4 w-4 mr-2 text-primary" /> Tutorials
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                <Clock className="h-4 w-4 mr-2 text-primary" /> Case Studies
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                <Bookmark className="h-4 w-4 mr-2 text-primary" /> Resources
              </Button>
            </div>
          </SidebarSection>
          
          <SidebarSection title="Popular Topics">
            <CategoryButton
              icon={<Tag className="h-4 w-4 mr-2 text-blue-600" />}
              label="Web Development"
              count={42}
            />
            <CategoryButton
              icon={<Tag className="h-4 w-4 mr-2 text-green-600" />}
              label="Machine Learning"
              count={31}
            />
            <CategoryButton
              icon={<Tag className="h-4 w-4 mr-2 text-purple-600" />}
              label="Cloud Computing"
              count={28}
            />
            <CategoryButton
              icon={<Tag className="h-4 w-4 mr-2 text-orange-600" />}
              label="Cybersecurity"
              count={23}
            />
            <CategoryButton
              icon={<Tag className="h-4 w-4 mr-2 text-red-600" />}
              label="Mobile Development"
              count={19}
            />
          </SidebarSection>
  
          <SidebarSection title="Reading Lists">
            <div className="flex flex-col space-y-1">
              <Button variant="ghost" className="justify-start text-sm font-normal h-auto">
                <Bookmark className="h-4 w-4 mr-2 text-primary" /> My Bookmarks
              </Button>
              <Button variant="ghost" className="justify-start text-sm font-normal h-auto">
                <Clock className="h-4 w-4 mr-2 text-primary" /> Read Later
              </Button>
              <Button variant="ghost" className="justify-start text-sm font-normal h-auto">
                <Star className="h-4 w-4 mr-2 text-primary" /> Favorites
              </Button>
              <Button variant="ghost" className="justify-start text-sm font-normal h-auto">
                <TrendingUp className="h-4 w-4 mr-2 text-primary" /> Trending Articles
              </Button>
            </div>
          </SidebarSection>
          
          <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
            <h3 className="font-medium text-sm mb-3">Share your knowledge</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Have expertise to share? Write an article and reach thousands of developers.
            </p>
            <Button className="w-full text-sm bg-primary hover:bg-primary/90">
              Write Article
            </Button>
          </div>
        </div>
  
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6 order-1 lg:order-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Latest Articles</h2>
            
            <Tabs defaultValue={sortBy} onValueChange={setSortBy} className="hidden sm:block">
              <TabsList className="bg-muted/50">
                <TabsTrigger value="popular" className="text-xs">Popular</TabsTrigger>
                <TabsTrigger value="recent" className="text-xs">Recent</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
  
          {isLoading ? (
            <div className="space-y-6">
              <BlogPostSkeleton />
              <BlogPostSkeleton />
              <BlogPostSkeleton />
            </div>
          ) : (
            <>
              {filteredPosts.map((post, index) => (
                <div 
                  key={index} 
                  className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-border/50"
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-1/3 bg-primary/10 h-48 md:h-auto shrink-0 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
                        <FileText className="h-12 w-12 text-primary/50" />
                      </div>
                    </div>
                    
                    <div className="flex-1 p-5">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className="bg-primary/10 text-primary hover:bg-primary/20 text-xs">
                          {post.readTime} read
                        </Badge>
                        <span className="text-sm text-muted-foreground">• {post.date}</span>
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {post.content}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="hover:bg-primary/10 hover:text-primary">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm">
                          <Avatar className="h-6 w-6 mr-2">
                            <AvatarFallback>{post.authorAvatar}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{post.author}</span>
                        </div>
                        
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <PieChart className="h-4 w-4" />
                            {post.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Bookmark className="h-4 w-4" />
                            {post.bookmarks}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-center pt-4">
                <Button variant="outline" className="w-full md:w-auto">
                  Load More Articles
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };
  

  export default Blogs;