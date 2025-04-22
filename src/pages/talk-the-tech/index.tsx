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
import { TalkHeader } from '@/components/talk-the -tech/header'
import Forums from './components/forum-section'
import Blogs from './components/blogs-section'
import CreateForumModal from './components/create-forum'

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
  const [activeTab, setActiveTab] = useState('forums');
  const [createNewForum, setcreateNewForum] = useState(false);



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
      
    <TalkHeader searchQuery={''} setSearchQuery={function (value: string): void {
        throw new Error('Function not implemented.')
      } }/>
      
      <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="container mx-auto px-4 py-8">
        <FeaturedContent />
 

            {activeTab === 'forums' && <Forums/>}

            {activeTab === 'blogs' && <Blogs/>}

            {activeTab === 'polls' && polls.map((poll, index) => (
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
            
          

      </div>
      <CreateForumModal/>
    </div>
  )
}