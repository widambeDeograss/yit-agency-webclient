import { useState, useEffect } from 'react'
import { 
  MessageSquare, FileText, BarChart2, Tag, Clock, User, Bookmark, 
  PieChart, TrendingUp, Star, Plus, Filter, ChevronRight, Search
} from 'lucide-react'
import { BlobBackground } from '@/components/shared/blob-bg'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { NavigationTabs } from '@/components/talk-the -tech/nav-tabs'
import { Progress } from '@/components/ui/progress'
import { TalkHeader } from '@/components/talk-the -tech/header'
import Forums from './components/forum-section'
import Blogs from './components/blogs-section'
import Polls from './components/polls-section'
import Projects from './components/projects-section'
import { useQuery } from '@tanstack/react-query'
import { blogsService } from '@/apis/services/tet/blogs.service'
import { useNavigate } from 'react-router-dom'


export default function TalkTheTechPage() {
  const [activeTab, setActiveTab] = useState('forums');
  const [createNewForum, setcreateNewForum] = useState(false);
  const navigate =  useNavigate();


  // Fetch blogs using TanStack Query
  const { data: blogs, isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogsService.getBlogs(),
  });

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


  const firstBlogDetails =  blogs?.results[0];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <BlobBackground />
      
    <TalkHeader searchQuery={''} setSearchQuery={function (value: string): void {
        throw new Error('Function not implemented.')
      } }/>
      
      <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="container mx-auto px-4 py-8">
        {
          isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Progress className="w-1/2" value={100} />
            </div>
          ) : (
            <div className="relative bg-gradient-to-r from-primary/10 to-background rounded-2xl p-6 mb-8 overflow-hidden">
    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20"></div>
    <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/10 rounded-full -ml-10 -mb-10"></div>
    
    <div className="flex flex-col md:flex-row gap-6 items-center relative z-10">
      <div>
        <Badge className="bg-primary/20 text-primary mb-4 hover:bg-primary/30">Featured</Badge>
        <h2 className="text-2xl font-bold mb-2">{firstBlogDetails?.title}</h2>
        <p className="text-muted-foreground mb-4">
          {firstBlogDetails?.content ? (firstBlogDetails.content.length > 100 ? `${firstBlogDetails.content.slice(0, 100)}...` : firstBlogDetails.content) : "No content available"}
        </p>
        <div className="flex items-center text-sm text-muted-foreground">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={firstBlogDetails?.author.profileImage ?? undefined} />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <span className="font-medium mr-2">{firstBlogDetails?.author.first_name } {firstBlogDetails?.author.last_name}</span>
          <span className="mx-2">•</span>
          <Clock className="h-4 w-4 mr-1" />
          <span>{firstBlogDetails?.categories[0].name}</span>
          <span className="mx-2">•</span>
          <MessageSquare className="h-4 w-4 mr-1" />
          <span>{firstBlogDetails?.views} Views</span>
        </div>
      </div>
      <Button className="shrink-0"
      onClick={() => {
        navigate(`/blogs/${firstBlogDetails?.slug}`);
      }}
      >
        Read Article <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  </div>
          )
        }
 

            {activeTab === 'forums' && <Forums/>}

            {activeTab === 'blogs' && <Blogs/>}

            {activeTab === 'polls' && <Polls/>}

            {activeTab === 'projects' && <Projects/>}
          
      </div>
     
    </div>
  )
}