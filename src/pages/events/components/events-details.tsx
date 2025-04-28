// src/pages/events/[id].tsx
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format, parseISO, formatDistance } from 'date-fns';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Video,
  ExternalLink,
  ChevronLeft,
  Share2,
  CalendarPlus,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { EventTypes } from '@/types/events';
import { eventsService } from '@/apis/services/events/event.service';
import { useNavigate, useParams } from 'react-router-dom';

const EventDetailsPage = () => {
  const router = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  
  const eventId = typeof id === 'string' ? parseInt(id, 10) : undefined;

  // Fetch event details
  const { data: event, isLoading, isError, error } = useQuery({
    queryKey: ['event', eventId],
    queryFn: () => eventId ? eventsService.getEventDetail(eventId).then(res => res) : null,
    enabled: !!eventId,
  });

  // Registration mutation
  const registerMutation = useMutation({
    mutationFn: () => eventsService.registerForEvent(eventId!),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['event', eventId] });
      setConfirmDialogOpen(false);
    },
  });

  const handleRegister = () => {
    if (event?.google_form_url) {
      // Open Google Form in new tab
      window.open(event.google_form_url, '_blank');
    } else {
      // Open confirmation dialog for internal registration
      setConfirmDialogOpen(true);
    }
  };

  const confirmRegistration = () => {
    registerMutation.mutate();
  };

  // Handle calendar download
  const downloadCalendarEvent = () => {
    if (event?.ical_url) {
      window.open(event.ical_url, '_blank');
    }
  };

  // Share event
  const shareEvent = () => {
    if (navigator.share) {
      navigator.share({
        title: event?.title,
        text: `Check out this event: ${event?.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  const formatEventDateTime = (startTime: string, endTime: string) => {
    const start = parseISO(startTime);
    const end = parseISO(endTime);
    
    const dateStr = format(start, 'EEEE, MMMM d, yyyy');
    const timeStr = `${format(start, 'h:mm a')} - ${format(end, 'h:mm a')}`;
    const duration = formatDistance(start, end);
    
    return { dateStr, timeStr, duration };
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-16 px-4 flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg">Loading event details...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto py-16 px-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load event details. Please try again later.
          </AlertDescription>
        </Alert>
        <Button 
          className="mt-6" 
          variant="outline" 
          onClick={() => router('/events')}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Events
        </Button>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto py-16 px-4">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Event Not Found</AlertTitle>
          <AlertDescription>
            The event you're looking for doesn't exist or has been removed.
          </AlertDescription>
        </Alert>
        <Button 
          className="mt-6" 
          variant="outline" 
          onClick={() => router('/events')}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Events
        </Button>
      </div>
    );
  }

  const { dateStr, timeStr, duration } = formatEventDateTime(event.start_time, event.end_time);

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Back button */}
      <Button 
        className="mb-6" 
        variant="outline" 
        onClick={() => router('/events')}
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> Back to Events
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          {/* Event header */}
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <Badge 
                className={`mr-3 ${
                  event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 
                  event.status === 'ongoing' ? 'bg-green-100 text-green-800' : 
                  event.status === 'completed' ? 'bg-gray-100 text-gray-800' : 
                  'bg-red-100 text-red-800'
                }`}
              >
                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
              </Badge>
              
              {event.categories.map(category => (
                <Badge key={category.id} variant="outline" className="mr-2">
                  {category.name}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
            <div className="flex items-center text-muted-foreground mb-4">
              <div className="flex items-center mr-4">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src={event.organizer.profile_picture} />
                  <AvatarFallback>
                    {event.organizer.full_name?.split(' ')?.map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span>Organized by {event.organizer.full_name}</span>
              </div>
            </div>
          </div>

          {/* Event images */}
          {(event.featured_image || event.images.length > 0) && (
            <div className="mb-8">
              <Carousel className="w-full">
                <CarouselContent>
                  {/* Featured image first */}
                  {event.featured_image && (
                    <CarouselItem>
                      <div className="rounded-lg overflow-hidden h-80 w-full">
                        <img 
                          src={event.featured_image} 
                          alt={event.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CarouselItem>
                  )}
                  
                  {/* Additional images */}
                  {event.images.map((image) => (
                    <CarouselItem key={image.id}>
                      <div className="rounded-lg overflow-hidden h-80 w-full">
                        <img 
                          src={image.image} 
                          alt={image.caption || event.title} 
                          className="w-full h-full object-cover"
                        />
                        {image.caption && (
                          <div className="p-3 bg-background/80 backdrop-blur text-sm">
                            {image.caption}
                          </div>
                        )}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          )}

          {/* Event details tabs */}
          <Tabs defaultValue="about" className="mb-8">
            <TabsList>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              {event.is_online && (
                <TabsTrigger value="online">Online Access</TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="about" className="mt-4">
              <div className="prose dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: event.description }} />
              </div>
            </TabsContent>
            
            <TabsContent value="details" className="mt-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">Date and Time</h3>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{dateStr}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground mt-1">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{timeStr} ({duration})</span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Timezone: {event.timezone}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-1">Location</h3>
                  <div className="flex items-center text-muted-foreground">
                    {event.is_online ? (
                      <>
                        <Video className="h-4 w-4 mr-2" />
                        <span>Online Event</span>
                      </>
                    ) : (
                      <>
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{event.location || 'To be announced'}</span>
                      </>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-1">Participation</h3>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" />
                    <span>
                      {event.participant_count} registered 
                      {event.max_participants ? ` (max: ${event.max_participants})` : ''}
                    </span>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {event.is_online && (
              <TabsContent value="online" className="mt-4">
                {event.user_registered ? (
                  <div className="space-y-4">
                    <Alert>
                      <CheckCircle2 className="h-4 w-4" />
                      <AlertTitle>You're registered for this event</AlertTitle>
                      <AlertDescription>
                        You can access the online meeting link below.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="mt-4">
                      <h3 className="font-semibold mb-2">Meeting Link</h3>
                      <Button asChild>
                        <a href={event.meeting_url} target="_blank" rel="noopener noreferrer">
                          Join Meeting <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Registration Required</AlertTitle>
                      <AlertDescription>
                        You need to register for this event to access the online meeting link.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </TabsContent>
            )}
          </Tabs>
        </div>
        
        {/* Sidebar */}
        <div>
          {/* Registration card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Registration</CardTitle>
              <CardDescription>
                {event.requires_registration 
                  ? 'Sign up to attend this event' 
                  : 'No registration required'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Registered</span>
                  <span className="font-medium">{event.participant_count}</span>
                </div>
                {event.max_participants && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Capacity</span>
                    <span className="font-medium">{event.max_participants}</span>
                  </div>
                )}
                {event.is_full && (
                  <Alert variant="destructive" className="py-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Event is full</AlertTitle>
                    <AlertDescription>
                      You can still register to join the waitlist.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              {event.user_registered ? (
                <Alert className="w-full">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>You're registered</AlertTitle>
                </Alert>
              ) : (
                <Button 
                  className="w-full" 
                  onClick={handleRegister}
                  disabled={
                    event.status === 'completed' || 
                    event.status === 'canceled' ||
                    registerMutation.isPending
                  }
                >
                  {registerMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : event.is_full ? (
                    'Join Waitlist'
                  ) : event.google_form_url ? (
                    <>Register via Google Form <ExternalLink className="ml-2 h-4 w-4" /></>
                  ) : (
                    'Register Now'
                  )}
                </Button>
              )}
              
              <div className="flex w-full gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={downloadCalendarEvent}
                >
                  <CalendarPlus className="mr-2 h-4 w-4" />
                  Add to Calendar
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={shareEvent}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
          
          {/* Organizer card */}
          <Card>
            <CardHeader>
              <CardTitle>Organizer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-4">
                  <AvatarImage src={event.organizer.profile_picture} />
                  <AvatarFallback>
                    {event.organizer?.full_name?.split(' ')?.map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{event.organizer.full_name}</div>
                  <div className="text-sm text-muted-foreground">
                    @{event.organizer.username}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Registration confirmation dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Registration</DialogTitle>
            <DialogDescription>
              You are about to register for "{event.title}". 
              {event.is_full ? ' This event is full, so you will be added to the waitlist.' : ''}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center mb-2">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{dateStr}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{timeStr}</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmRegistration} disabled={registerMutation.isPending}>
              {registerMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Confirm Registration'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventDetailsPage;