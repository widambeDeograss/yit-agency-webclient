import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import pic1 from '@/assets/events/env2.jpeg';
import pic2 from '@/assets/events/evn3.jpeg';
import pic3 from '@/assets/events/evn4.jpeg';
import pic4 from '@/assets/events/evn5.jpeg';
import pic5 from '@/assets/events/evn6.jpeg';
import pic6 from '@/assets/events/evn7.jpeg';
import pic7 from '@/assets/events/evn8.jpeg';
import pic8 from '@/assets/events/evn9.jpeg';
import pic9 from '@/assets/events/evn10.jpeg';
import pic10 from '@/assets/events/evn11.jpeg';
import pic11 from '@/assets/events/env2.jpeg';


// Sample blog post data
const blogPosts = [
  {
    title: "Innovation starts with empowered youth",
    imageId: pic1
  },
  {
    title: "Young ideas, global impact",
    imageId:pic2
  },
  {
    title: "Tech is the tool & vision is the power.",
    imageId: pic3
  },
  {
    title: "Every idea has the power to transform",
    imageId: pic4
  },
  {
    title: "Inspiring creativity, innovation, and leadership in every session",
    imageId: pic5
  },
  {
    title: "Empowering the next generation of tech leaders",
    imageId: pic6
  },
  {
    title: "Where ambition meets innovation",
    imageId: pic7
  },
  {
    title: "Building tomorrow through technology today",
    imageId: pic8
  },
  {
    title: "Young minds, bold visions", 
    imageId: pic9
  },
  {
    title: "Technology unlocks limitless potential.",
    imageId: pic10
  },
  {
    title: "Shaping the future, one idea at a time",
    imageId: pic11
  },
  // {
  //   title: "Where creativity meets opportunity",
  //   imageId: pic12
  // },
];

export default function ActivityCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);
  
  // Handle auto-scrolling
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    
    if (autoScroll && scrollContainerRef.current) {
      interval = setInterval(() => {
        if (scrollContainerRef.current) {
          const maxScroll = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
          
          if (scrollPosition >= maxScroll) {
            setScrollPosition(0);
            scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            const newPosition = scrollPosition + 320;
            setScrollPosition(newPosition);
            scrollContainerRef.current.scrollTo({ left: newPosition, behavior: 'smooth' });
          }
        }
      }, 3000);
    }
    
    return () => clearInterval(interval);
  }, [scrollPosition, autoScroll]);
  
  // Pause auto-scroll on hover
  const handleMouseEnter = () => setAutoScroll(false);
  const handleMouseLeave = () => setAutoScroll(true);
  
  // Manual navigation
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      const newPosition = Math.max(0, scrollPosition + scrollAmount);
      setScrollPosition(newPosition);
      scrollContainerRef.current.scrollTo({ left: newPosition, behavior: 'smooth' });
    }
  };

  return (
  <div className="w-full py-8 bg-gradient-to-r from-[var(--color-primary-foreground)] to-[var(--color-accent)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Explore Our Latest Events
            <br />
            and Expertise
          </h2>
          <p className="mt-2 text-muted-foreground">
            Stay Informed, Stay Ahead: Discover Fresh Ideas and Strategies
          </p>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-20 bg-background/80 rounded-full p-2 shadow-md hover:bg-background"
            aria-label="Previous posts"
          >
            <ChevronLeft className="h-6 w-6 text-primary" />
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-20 bg-background/80 rounded-full p-2 shadow-md hover:bg-background"
            aria-label="Next posts"
          >
            <ChevronRight className="h-6 w-6 text-primary" />
          </button>
          
          <div 
            ref={scrollContainerRef}
            className="overflow-x-hidden py-8"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex gap-6 transition-transform duration-500">
              {blogPosts.map((post, index) => (
                <BlogCard key={index} post={post} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
interface BlogPost {
  title: string;
  imageId: string;
}

function BlogCard({ post }: { post: BlogPost }) {
    return (
      <div className="flex-shrink-0 w-96 h-96 relative">
        {/* Background Image */}
        <div className="absolute inset-0 rounded-lg overflow-hidden">
          <img 
            src={post.imageId} 
            alt="Group project" 
            className="w-full h-full object-cover"
          />
        </div>
  
        {/* Glassmorphism Card */}
        <div className="absolute top-3/4 left-0  -translate-y-1/2 w-52 rounded-xl shadow-sm z-10 
                        bg-white/0 dark:bg-white/0
                        backdrop-blur-sm border border-white/20 dark:border-white/10
                        ">
          {/* Optional glowing background blur */}
          <div className="absolute w-40 h-40 bg-cyan-400/20 rounded-full blur-2xl -top-10 -left-10 z-0"></div>
  
          <div className="p-4 relative z-10 text-sm text-black dark:text-white">
            {/* <div className="font-semibold mb-2">
              {post.category === "Live Well" ? (
                <span>{post.category}</span>
              ) : post.category === "Get Well" ? (
                <span className="text-primary">{post.category}</span>
              ) : (
                <span>{post.category}</span>
              )}
            </div> */}
  
            <h3 className="text-base font-bold leading-tight mb-6">
              {post.title}
            </h3>
  
            {/* <div className="flex justify-between text-xs text-muted-foreground dark:text-gray-300 mt-auto">
              <span>By {post.author}</span>
              <span>{post.date}</span>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
  