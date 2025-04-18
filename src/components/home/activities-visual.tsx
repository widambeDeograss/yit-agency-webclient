import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Sample blog post data
const blogPosts = [
  {
    category: "Live Well",
    title: "5 ways to relieve stress during the holidays",
    author: "Riley Steinmetz",
    date: "April 20, 2024",
    imageId: "1X893"
  },
  {
    category: "Get Well",
    title: "Baby flat head pillow - why its important",
    author: "Ken William",
    date: "April 24, 2024",
    imageId: "0X893"
  },
  {
    category: "Eat Well",
    title: "Nutrition tips for a balanced diet",
    author: "Maya Johnson",
    date: "April 18, 2024",
    imageId: "2X893"
  },
  {
    category: "Work Well",
    title: "Creating a productive home office",
    author: "Tyler Grant",
    date: "April 15, 2024",
    imageId: "3X893"
  },
  {
    category: "Sleep Well",
    title: "How to improve your sleep quality",
    author: "Nina Patel",
    date: "April 22, 2024",
    imageId: "4X893"
  },
  {
    category: "Think Well",
    title: "Mindfulness practices for daily life",
    author: "Leo Chen",
    date: "April 19, 2024",
    imageId: "5X893"
  }
];

export default function ActivityCarousel() {
  const scrollContainerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);
  
  // Handle auto-scrolling
  useEffect(() => {
    let interval;
    
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
  const scroll = (direction) => {
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
            Explore Our Latest Perspectives
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
function BlogCard({ post }) {
    return (
      <div className="flex-shrink-0 w-96 h-96 relative">
        {/* Background Image */}
        <div className="absolute inset-0 rounded-lg overflow-hidden">
          <img 
            src="https://img.freepik.com/free-photo/creative-students-collaborating-with-laptop_23-2147664080.jpg?ga=GA1.1.758269213.1736070258&semt=ais_hybrid&w=740" 
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
            <div className="font-semibold mb-2">
              {post.category === "Live Well" ? (
                <span>{post.category}</span>
              ) : post.category === "Get Well" ? (
                <span className="text-primary">{post.category}</span>
              ) : (
                <span>{post.category}</span>
              )}
            </div>
  
            <h3 className="text-base font-bold leading-tight mb-6">
              {post.title}
            </h3>
  
            <div className="flex justify-between text-xs text-muted-foreground dark:text-gray-300 mt-auto">
              <span>By {post.author}</span>
              <span>{post.date}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  