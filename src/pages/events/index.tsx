import { useState } from 'react';
import { format } from 'date-fns';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  ChevronRight, 
  ChevronLeft, 
  ExternalLink, 
  Video, 
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
// src/api/events.ts
import { eventsService } from '@/apis/services/events/event.service';
import { newsService } from '@/apis/services/events/technews.service';
import { BlobBackground } from '@/components/shared/blob-bg';
import { useNavigate } from 'react-router-dom';

export const useEvents = (params: {
  page: number;
  search?: string;
  category?: string;
}) => {
  return useQuery({
    queryKey: ['events', params],
    queryFn: async () => {
      const response = await eventsService.getEvents({
        page: params.page,
        size: 6,
        search: params.search,
        category: params.category,
      });
      return response;
    },

  });
};

export const useTechNews = () => {
  return useQuery({
    queryKey: ['tech-news'],
    queryFn: async () => {
      const response = await newsService.getNews({ page:1, size: 10 });
      return response.results;
    },
  });
};

const EventsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [page, setPage] = useState(1);
  const navigate =  useNavigate()

  // Using TanStack Query for data fetching
  const {
    data: eventsData,
    isLoading: eventsLoading,
    // isPreviousData: isPreviousEventsData,
  } = useEvents({
    page,
    search: searchQuery,
    category: categoryFilter,
  });

  const {
    data: news,
    isLoading: newsLoading,
  } = useTechNews();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Reset to first page when searching
    if (page !== 1) setPage(1);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'ongoing':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'completed':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      case 'canceled':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const formatEventDate = (startTime: string, endTime: string) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    if (start.toDateString() === end.toDateString()) {
      return {
        date: format(start, 'MMM d, yyyy'),
        time: `${format(start, 'h:mm a')} - ${format(end, 'h:mm a')}`
      };
    }
    
    return {
      date: `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`,
      time: `${format(start, 'h:mm a')} - ${format(end, 'h:mm a')}`
    };
  };

  const totalPages = eventsData ? Math.ceil(eventsData.count / 6) : 1;
  const events = eventsData?.results || [];

  return (
    <div className="container mx-auto py-8 px-4">

      <div className="mb-8 mt-5">
        <BlobBackground/>
        <h1 className="text-3xl font-bold mb-2">Youth in Tech Events</h1>
        <p className="text-muted-foreground">
          Discover upcoming tech events, workshops, and networking opportunities
        </p>
      </div>

  <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-between items-center">
  <form onSubmit={handleSearch} className="w-full sm:w-auto sm:flex-1">
    <div className="relative max-w-md w-full mx-auto sm:mx-0">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search events..."
        className="pl-10"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  </form>

  {/* Filter buttons or select dropdowns can go here later */}
</div>


      {/* Events Grid */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Upcoming Events</h2>
          <p className="text-muted-foreground">
            {eventsData?.count ?? 0} events found
          </p>
        </div>

        {eventsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events?.map((event) => {
               const { date, time } = formatEventDate(event.start_time, event.end_time);
               return (
                   <Card key={event.id} className="overflow-hidden">
                       <div className="relative h-48 w-full">
                           {event.featured_image ? (
                               <img 
                                   src={event.featured_image} 
                                   alt={event.title}
                                   className="h-full w-full object-cover"
                               />
                           ) : (
                               <div className="h-full w-full bg-muted flex items-center justify-center">
                                   <Calendar className="h-12 w-12 text-muted-foreground" />
                               </div>
                           )}
                           <Badge 
                               className={`absolute top-4 right-4 ${getStatusBadgeColor(event.status)}`}
                           >
                               {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                           </Badge>
                       </div>
                       <CardHeader>
                           <div className="flex justify-between items-start">
                               <div>
                                   <CardTitle className="line-clamp-1">{event.title}</CardTitle>
                                   <CardDescription className="flex items-center mt-1">
                                       {event.is_online ? (
                                           <>
                                               <Video className="h-4 w-4 mr-1" /> Online Event
                                           </>
                                       ) : (
                                           <>
                                               <MapPin className="h-4 w-4 mr-1" /> {event.location || 'TBA'}
                                           </>
                                       )}
                                   </CardDescription>
                               </div>
                               <Avatar className="h-8 w-8">
                                   <AvatarImage src={event.organizer.profile_picture} />
                                   <AvatarFallback>
                                       {event.organizer?.full_name?.split(' ')?.map(name => name[0]).join('')}
                                   </AvatarFallback>
                               </Avatar>
                           </div>
                       </CardHeader>
                       <CardContent>
                           <div className="text-sm space-y-2">
                               <div className="flex items-center text-muted-foreground">
                                   <Calendar className="h-4 w-4 mr-2" />
                                   <span>{date}</span>
                               </div>
                               <div className="flex items-center text-muted-foreground">
                                   <Clock className="h-4 w-4 mr-2" />
                                   <span>{time}</span>
                               </div>
                               <div className="flex items-center text-muted-foreground">
                                   <Users className="h-4 w-4 mr-2" />
                                   <span>
                                       {event.participant_count} / {event.max_participants || 'Unlimited'}
                                   </span>
                               </div>
                           </div>
                           <div className="mt-4 flex flex-wrap gap-2">
                               {event.categories.slice(0, 3).map(category => (
                                   <Badge 
                                       key={category.id} 
                                       variant="outline" 
                                       className="text-xs"
                                   >
                                       {category.name}
                                   </Badge>
                               ))}
                           </div>
                       </CardContent>
                       <CardFooter className="pt-0">
                           <Button 
                               className="w-full" 
                               onClick={() => navigate(`/events/${event.id}`)}
                           >
                               View Details
                           </Button>
                       </CardFooter>
                   </Card>
               );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No events found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('');
                setPage(1);
              }}
            >
              Clear filters
            </Button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                disabled={page === 1 || eventsLoading}
                onClick={() => setPage(page - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center text-sm">
                Page <span className="font-bold mx-1">{page}</span> of{" "}
                <span className="font-bold mx-1">{totalPages}</span>
              </div>
              <Button
                variant="outline"
                size="icon"
                disabled={page === totalPages || eventsLoading}
                onClick={() => setPage(page + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

   {/* Tech News Slider */}
<div className="mb-8">
  <h2 className="text-2xl font-bold mb-6">Latest Tech News</h2>
  {newsLoading ? (
    <div className="flex gap-6 overflow-x-auto pb-4">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="w-80 shrink-0">
          <Skeleton className="h-48 w-full" />
          <CardHeader>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  ) : (
    <div className="relative">
      <div className="overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex gap-6 min-w-max">
          {news?.map((item) => (
            <Card key={item.id} className="w-80 shrink-0 hover:shadow-lg transition-shadow duration-200">
              {/* Featured Image */}
              {item.featured_image && (
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img 
                    src={item.featured_image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  {item.is_featured && (
                    <Badge className="absolute top-2 left-2 bg-primary/90 text-primary-foreground hover:bg-primary">
                      Featured
                    </Badge>
                  )}
                  {/* Category Badge */}
                  {item.categories && item.categories.length > 0 && (
                    <Badge 
                      variant="secondary" 
                      className="absolute top-2 right-2 bg-background/80 text-foreground"
                    >
                      {item.categories[0].name}
                    </Badge>
                  )}
                </div>
              )}
              
              <CardHeader className="pb-3">
                {!item.featured_image && item.is_featured && (
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30 mb-2 self-start">
                    Featured
                  </Badge>
                )}
                <CardTitle className="line-clamp-2 text-lg leading-tight">
                  {item.title}
                </CardTitle>
                <CardDescription className="flex items-center text-xs space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={item.author?.profile_image} />
                    <AvatarFallback className="text-xs">
                      {item.author 
                        ? `${item.author.first_name?.[0] || ''}${item.author.last_name?.[0] || ''}` 
                        : 'AN'
                      }
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium truncate">
                    {item.author 
                      ? `${item.author.first_name || ''} ${item.author.last_name || ''}`.trim() || item.author.username
                      : 'Anonymous'
                    }
                  </span>
                  <span>•</span>
                  <span className="whitespace-nowrap">
                    {format(new Date(item.published_at), 'MMM d, yyyy')}
                  </span>
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pb-3">
                <p className="text-sm line-clamp-3 text-muted-foreground leading-relaxed">
                  {item.content.replace(/<[^>]*>?/gm, '')}
                </p>
                {/* Categories display if no featured image */}
                {!item.featured_image && item.categories && item.categories.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {item.categories.slice(0, 2).map((category) => (
                      <Badge 
                        key={category.id} 
                        variant="outline" 
                        className="text-xs"
                      >
                        {category.name}
                      </Badge>
                    ))}
                    {item.categories.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{item.categories.length - 2} more
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="pt-0">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => {
                    if (item.news_type === 'external' && item.source_url) {
                      window.open(item.source_url, '_blank', 'noopener,noreferrer');
                    } else {
                      navigate(`/news/${item.id}`);
                    }
                  }}
                >
                  {item.news_type === 'external' ? 'Read Original' : 'Read More'}
                  {item.news_type === 'external' && (
                    <ExternalLink className="ml-2 h-3 w-3" />
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Gradient overlays for visual effect */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none z-10"></div>
      
      {/* Optional: Add scroll indicators */}
      {news && news.length > 3 && (
        <div className="flex justify-center mt-4 space-x-2">
          <div className="text-xs text-muted-foreground flex items-center">
            <ArrowLeft className="h-3 w-3 mr-1" />
            Scroll for more
            <ArrowRight className="h-3 w-3 ml-1" />
          </div>
        </div>
      )}
    </div>
  )}
</div>
    </div>
  );
};

export default EventsPage;