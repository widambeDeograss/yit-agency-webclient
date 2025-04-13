import { useState, useEffect } from 'react'
import { 
  MessageSquare, FileText, BarChart2, Tag, Clock, User, Bookmark, 
  PieChart, TrendingUp, Star, Plus, Filter, ChevronRight, Search
} from 'lucide-react'
import { BlobBackground } from '@/components/shared/blob-bg'
import { CategoryButton } from '@/components/custom/category-button'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { NavigationTabs } from '@/components/talk-the -tech/nav-tabs'
import { SidebarSection } from '@/components/talk-the -tech/sider'
import { Progress } from '@/components/ui/progress'

// Featured content highlight
const FeaturedContent = () => (
  <div className="relative bg-gradient-to-r from-primary/10 to-background rounded-2xl p-6 mb-8 overflow-hidden">
    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20"></div>
    <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/10 rounded-full -ml-10 -mb-10"></div>
    
    <div className="flex flex-col md:flex-row gap-6 items-center relative z-10">
      <div>
        <Badge className="bg-primary/20 text-primary mb-4 hover:bg-primary/30">Featured</Badge>
        <h2 className="text-2xl font-bold mb-2">Tech Trends 2025: The Future of AI Development</h2>
        <p className="text-muted-foreground mb-4">
          Explore the latest AI trends and how they'll shape technology in the coming years.
        </p>
        <div className="flex items-center text-sm text-muted-foreground">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src="/avatars/tech-expert.jpg" />
            <AvatarFallback>TE</AvatarFallback>
          </Avatar>
          <span className="font-medium mr-2">Tech Experts Panel</span>
          <span className="mx-2">•</span>
          <Clock className="h-4 w-4 mr-1" />
          <span>Yesterday</span>
          <span className="mx-2">•</span>
          <MessageSquare className="h-4 w-4 mr-1" />
          <span>128 comments</span>
        </div>
      </div>
      <Button className="shrink-0">
        Read Article <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  </div>
)

// Mock data for different content types
const forumPosts = [
  {
    type: 'forum',
    title: 'Best state management in React 2024',
    author: 'Sarah Johnson',
    authorAvatar: 'SJ',
    date: '3h ago',
    comments: 45,
    views: 256,
    tags: ['react', 'frontend'],
    likes: 128,
    hot: true
  },
  {
    type: 'forum',
    title: 'Getting started with AI accelerators on cloud platforms',
    author: 'James Wilson',
    authorAvatar: 'JW',
    date: '1d ago',
    comments: 32,
    views: 189,
    tags: ['ai', 'cloud'],
    likes: 95
  },
  {
    type: 'forum',
    title: 'Debugging strategies for complex microservices',
    author: 'Lena Park',
    authorAvatar: 'LP',
    date: '2d ago',
    comments: 28,
    views: 176,
    tags: ['microservices', 'debugging'],
    likes: 87
  },
]

const blogPosts = [
  {
    type: 'blog',
    title: 'Introduction to TypeScript',
    author: 'Michael Chen',
    authorAvatar: 'MC',
    date: '2d ago',
    readTime: '8 min',
    views: 1200,
    tags: ['typescript', 'javascript'],
    bookmarks: 234,
    content: 'TypeScript has revolutionized how we write JavaScript by adding strong typing and other features that enhance developer experience and code quality...',
    image: '/blog/typescript-intro.jpg'
  },
  {
    type: 'blog',
    title: 'Building Resilient APIs with GraphQL',
    author: 'Priya Sharma',
    authorAvatar: 'PS',
    date: '3d ago',
    readTime: '10 min',
    views: 945,
    tags: ['graphql', 'api'],
    bookmarks: 187,
    content: 'GraphQL provides a flexible query language for your API, giving clients the power to ask for exactly what they need and nothing more...',
    image: '/blog/graphql-apis.jpg'
  },
  {
    type: 'blog',
    title: 'Machine Learning for Frontend Developers',
    author: 'David Mueller',
    authorAvatar: 'DM',
    date: '5d ago',
    readTime: '12 min',
    views: 1560,
    tags: ['machine-learning', 'frontend'],
    bookmarks: 310,
    content: 'As AI becomes more accessible, frontend developers can leverage machine learning models directly in the browser to create smarter, more responsive user experiences...',
    image: '/blog/ml-frontend.jpg'
  }
]

const polls = [
  {
    type: 'poll',
    title: 'Preferred JavaScript Framework 2024',
    author: 'Tech Community',
    authorAvatar: 'TC',
    date: '1 day left',
    votes: 842,
    tags: ['javascript', 'frameworks'],
    options: [
      { name: 'React', votes: 512, color: 'bg-blue-500' },
      { name: 'Vue', votes: 210, color: 'bg-green-500' },
      { name: 'Angular', votes: 120, color: 'bg-red-500' }
    ]
  },
  {
    type: 'poll',
    title: 'Most Exciting Tech of 2025',
    author: 'Future Tech',
    authorAvatar: 'FT',
    date: '3 days left',
    votes: 1243,
    tags: ['future', 'trends'],
    options: [
      { name: 'AI/ML', votes: 623, color: 'bg-purple-500' },
      { name: 'Web3', votes: 285, color: 'bg-orange-500' },
      { name: 'AR/VR', votes: 235, color: 'bg-cyan-500' },
      { name: 'Quantum Computing', votes: 100, color: 'bg-yellow-500' }
    ]
  }
]

export default function TalkTheTechPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('forums')
  const [sortBy, setSortBy] = useState('popular')
  const [showFilters, setShowFilters] = useState(false)

  const filteredContent = {
    forums: forumPosts,
    blogs: blogPosts,
    polls: polls
  }[activeTab]

  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeIn');
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.fade-in-element').forEach(el => {
      observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, [activeTab]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <BlobBackground />
      
      {/* Header component would be here */}
      <div className="bg-background/80 backdrop-blur-sm py-6 sticky top-0 z-40 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <h1 className="text-xl font-bold">Talk The Tech</h1>
            </div>
            
            <div className="relative max-w-md w-full mx-4 hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search discussions..." 
                className="pl-10 bg-background/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" /> Create Post
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="container mx-auto px-4 py-8">
        <FeaturedContent />
        
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-6 order-2 lg:order-1">
            <div className="md:hidden mb-6">
              <Input 
                placeholder="Search discussions..." 
                className="w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <SidebarSection title="Browse By">
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="justify-start">
                  <TrendingUp className="h-4 w-4 mr-2 text-primary" /> Trending
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Star className="h-4 w-4 mr-2 text-primary" /> Popular
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Clock className="h-4 w-4 mr-2 text-primary" /> Latest
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Bookmark className="h-4 w-4 mr-2 text-primary" /> Saved
                </Button>
              </div>
            </SidebarSection>
            
            <SidebarSection title="Categories" >
              <CategoryButton
                icon={<Tag className="h-4 w-4 mr-2 text-primary" />}
                label="Programming"
                count={124}
              />
              <CategoryButton
                icon={<Tag className="h-4 w-4 mr-2 text-green-600" />}
                label="AI/ML"
                count={89}
              />
              <CategoryButton
                icon={<Tag className="h-4 w-4 mr-2 text-blue-600" />}
                label="Web Dev"
                count={156}
              />
              <CategoryButton
                icon={<Tag className="h-4 w-4 mr-2 text-orange-600" />}
                label="DevOps"
                count={78}
              />
              <CategoryButton
                icon={<Tag className="h-4 w-4 mr-2 text-purple-600" />}
                label="Data Science"
                count={93}
              />
            </SidebarSection>

            <SidebarSection title="Popular Tags" >
              <div className="flex flex-wrap gap-2">
                {['react', 'typescript', 'nextjs', 'python', 'beginners', 'webdev', 'ai', 'frontend', 'backend'].map(tag => (
                  <Button
                    key={tag}
                    variant="outline"
                    size="sm"
                    className="rounded-full text-sm px-3 h-7 hover:bg-primary/10 hover:text-primary"
                  >
                    #{tag}
                  </Button>
                ))}
              </div>
            </SidebarSection>
            
            <div className="bg-primary/5 rounded-xl p-4 border border-primary/10 fade-in-element">
              <h3 className="font-medium text-sm mb-3">Join the conversation</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Connect with other tech enthusiasts and share your knowledge.
              </p>
              <Button className="w-full text-sm bg-primary hover:bg-primary/90">
                Sign Up
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6 order-1 lg:order-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {activeTab === 'forums' && 'Discussions'}
                {activeTab === 'blogs' && 'Latest Articles'}
                {activeTab === 'polls' && 'Community Polls'}
              </h2>
              
              <Tabs defaultValue={sortBy} onValueChange={setSortBy} className="hidden sm:block">
                <TabsList className="bg-muted/50">
                  <TabsTrigger value="popular" className="text-xs">Popular</TabsTrigger>
                  <TabsTrigger value="recent" className="text-xs">Recent</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {activeTab === 'forums' && filteredContent.map((post, index) => (
              <div 
                key={index} 
                className="bg-card rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-border/50 fade-in-element"
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{post.authorAvatar}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{post.author}</span>
                      <span className="text-sm text-muted-foreground">• {post.date}</span>
                      {post.hot && (
                        <Badge className="bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 text-xs">Hot</Badge>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="hover:bg-primary/10 hover:text-primary">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        {post.comments}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        {post.likes}
                      </div>
                      <div className="flex items-center gap-1">
                        <PieChart className="h-4 w-4" />
                        {post.views} views
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {activeTab === 'blogs' && filteredContent.map((post, index) => (
              <div 
                key={index} 
                className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-border/50 fade-in-element"
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

            {activeTab === 'polls' && filteredContent.map((poll, index) => (
              <div 
                key={index} 
                className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-border/50 fade-in-element"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{poll.authorAvatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{poll.author}</div>
                    <div className="text-xs text-muted-foreground">Posted a poll • {poll.date}</div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mt-3 mb-6">{poll.title}</h3>
                
                <div className="space-y-4">
                  {poll.options.map((option, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{option.name}</span>
                        <span className="text-muted-foreground">
                          {Math.round((option.votes / poll.votes) * 100)}%
                        </span>
                      </div>
                      <Progress 
                        value={(option.votes / poll.votes) * 100} 
                        className="h-2"
                        indicatorClassName={option.color || "bg-primary"}
                      />
                      <div className="mt-1 text-xs text-muted-foreground text-right">
                        {option.votes} votes
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {poll.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="hover:bg-primary/10 hover:text-primary">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button variant="outline" size="sm">
                    Vote Now
                  </Button>
                </div>
                
                <div className="mt-4 text-sm text-muted-foreground flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {poll.date}
                  <span className="mx-2">•</span>
                  <span>{poll.votes} total votes</span>
                </div>
              </div>
            ))}
            
            <div className="flex justify-center pt-4">
              <Button variant="outline" className="w-full md:w-auto">
                Load More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}