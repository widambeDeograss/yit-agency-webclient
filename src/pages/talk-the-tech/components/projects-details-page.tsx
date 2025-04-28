import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Project, ProjectApiResponse } from '@/types/projects';
import { 
  Search, 
  Filter, 
  Github, 
  ExternalLink, 
  Calendar, 
  Users, 
  MessageSquare, 
  Share2,
  ChevronLeft,
  Star,
  StarHalf,
  BookOpen,
  Code,
  Flag
} from 'lucide-react';
import { useAuthStore } from '@/hooks/use-auth-store';
import { useAppDispatch } from '@/store/store-hooks';
import { SetOpenLogin } from '@/store/slices/auth/auth.slice';
import { projectsService } from '@/apis/services/tet/projects.service';

const ProjectDetails = () => {
  const { id:projectId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const dispatch = useAppDispatch();
  const [commentText, setCommentText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // Fetch project details
  const { 
    data: project, 
    isLoading, 
    error,
    refetch 
  } = useQuery<Project>({
    queryKey: ['project', projectId],
    queryFn: () => projectsService.getProjectDetail(Number(projectId)),
    enabled: !!projectId,
  });

  // Fetch related projects
  const { 
    data: relatedProjects
  } = useQuery<ProjectApiResponse>({
    queryKey: ['relatedProjects', projectId],
    queryFn: () => projectsService.getProjects(),
    enabled: !!projectId,
  });

  // Fetch categories
  const { 
    data: categoriesData
  } = useQuery({
    queryKey: ['project-categories'],
    queryFn: () => projectsService.getCategories(),
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/projects?search=${searchQuery}`);
  };

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
    navigate(`/projects?category=${categoryId}`);
  };

  const handleShareProject = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    // Show toast notification
    alert('Project URL copied to clipboard!');
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      dispatch(SetOpenLogin(true));
      return;
    }

    if (!commentText.trim()) return;

    try {
      // Add comment submission logic here
      setCommentText('');
    } catch (error) {
      console.error('Failed to post comment:', error);
    }
  };

  if (isLoading) {
    return <ProjectDetailsSkeleton />;
  }

  if (error || !project) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Failed to load project details</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => refetch()}
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
   <div className='container mx-auto py-8'>
     <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Sidebar */}
      <div className="md:col-span-1">
        <div className="bg-card rounded-xl p-4 shadow-sm border border-border/50 sticky top-20">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-4" 
            onClick={() => navigate('/projects')}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Projects
          </Button>

          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
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
          
          <div>
            <div className="flex items-center mb-3">
              <Filter className="h-4 w-4 mr-2" />
              <h3 className="font-medium">Categories</h3>
            </div>
            
            <div className="space-y-2">
              {categoriesData?.results ? (
                categoriesData.results.map((category) => (
                  <Badge 
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    className="mr-2 mb-2 cursor-pointer hover:bg-primary/10 hover:text-primary w-full justify-between"
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    {category.name}
                    <span className="ml-auto bg-background/80 text-xs px-1.5 py-0.5 rounded-sm">
                      {category.project_count || 0}
                    </span>
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No categories found</p>
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <h3 className="font-medium mb-3">Related Projects</h3>
            <div className="space-y-3">
              {relatedProjects?.results?.filter(p => p.id !== Number(projectId)).slice(0, 5).map((relatedProject) => (
                <Link 
                  key={relatedProject.id} 
                  to={`/projects/${relatedProject.id}`}
                  className="block bg-background rounded-lg p-3 hover:bg-accent transition-colors"
                >
                  <h4 className="font-medium text-sm line-clamp-2">{relatedProject.title}</h4>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <Users className="h-3 w-3 mr-1" />
                    <span>{relatedProject.contributors?.length || 0} contributors</span>
                  </div>
                </Link>
              ))}
              {(!relatedProjects?.results || relatedProjects.results.length <= 1) && (
                <p className="text-sm text-muted-foreground">No related projects found</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:col-span-3">
        <div className="bg-card rounded-xl shadow-sm border border-border/50 overflow-hidden">
          {/* Cover Image */}
          {project.featured_image && (
            <div className="relative h-64 overflow-hidden">
              <img 
                src={project.featured_image} 
                alt={project.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex justify-between items-center">
                  <h1 className="text-3xl font-bold text-white">{project.title}</h1>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="bg-white/20 border-white/40 text-white hover:bg-white/30" onClick={handleShareProject}>
                      <Share2 className="h-4 w-4 mr-1" /> Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Project Header (when no image) */}
          {!project.featured_image && (
            <div className="p-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">{project.title}</h1>
                <Button variant="outline" size="sm" onClick={handleShareProject}>
                  <Share2 className="h-4 w-4 mr-1" /> Share
                </Button>
              </div>
            </div>
          )}

          {/* Project Content */}
          <div className="p-6 pt-0">
            <Tabs defaultValue="overview" className="mt-6">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="contributors">Contributors</TabsTrigger>
                <TabsTrigger value="discussions">Discussions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <div className="space-y-6">
                  {/* Author Info */}
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10">
                      {project.author.profileImage ? (
                        <AvatarImage src={project.author.profileImage} alt={project.author.username} />
                      ) : (
                        <AvatarFallback>
                          {project.author.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="ml-3">
                      <div className="font-medium">{project.author.username}</div>
                      <div className="text-xs text-muted-foreground">
                        Project Author • {new Date(project.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  {/* Project Links */}
                  <div className="flex flex-wrap gap-2">
                    {project.github_url && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" /> GitHub Repository
                        </a>
                      </Button>
                    )}
                    {project.project_url && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.project_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" /> Live Project
                        </a>
                      </Button>
                    )}
                  </div>
                  
                  {/* Project Description */}
                  <div>
                    <h3 className="text-lg font-medium mb-2">Description</h3>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {project.description}
                    </p>
                  </div>
                  
                  {/* Technologies Used */}
                  <div>
                    <h3 className="text-lg font-medium mb-2">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {project?.technologies_used?.map((tech) => (
                        <Badge key={tech.id} variant="secondary">
                          {tech.name}
                        </Badge>
                      ))}
                      {(!project?.technologies_used || project.technologies_used.length === 0) && (
                        <p className="text-sm text-muted-foreground">No technologies specified</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Categories */}
                  <div>
                    <h3 className="text-lg font-medium mb-2">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.categories?.map((category) => (
                        <Badge key={category.id} variant="outline" className="hover:bg-primary/10 hover:text-primary">
                          #{category.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Project Timeline */}
                  <div>
                    <h3 className="text-lg font-medium mb-2">Project Timeline</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Created: {new Date(project.created_at).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span>Last updated: {new Date(project.updated_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="contributors">
                <div className="space-y-6">
                  <h3 className="text-lg font-medium mb-4">Project Contributors</h3>
                  
                  {/* Author */}
                  <div className="bg-background rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10">
                        {project.author.profileImage ? (
                          <AvatarImage src={project.author.profileImage} alt={project.author.username} />
                        ) : (
                          <AvatarFallback>
                            {project.author.username.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div className="ml-3">
                        <div className="font-medium">{project.author.username}</div>
                        <div className="text-xs text-muted-foreground">Project Author</div>
                      </div>
                    </div>
                    <Badge variant="secondary">Author</Badge>
                  </div>
                  
                  {/* Contributors List */}
                  {project.contributors?.map((contributor) => (
                    <div key={contributor.id} className="bg-background rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10">
                          {contributor.profileImage ? (
                            <AvatarImage src={contributor.profileImage} alt={contributor.username} />
                          ) : (
                            <AvatarFallback>
                              {contributor.username.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div className="ml-3">
                          <div className="font-medium">{contributor.username}</div>
                          <div className="text-xs text-muted-foreground">Contributor</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Contributor</Badge>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                      </div>
                  ))}
                  
                  {(!project.contributors || project.contributors.length === 0) && (
                    <div className="text-center py-8">
                      <Users className="h-10 w-10 mx-auto text-muted-foreground" />
                      <h4 className="mt-2 font-medium">No contributors yet</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Be the first to contribute to this project!
                      </p>
                      <Button variant="outline" className="mt-4">
                        Join Project
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            
            </Tabs>
          </div>
        </div>
        
        {/* Project Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-card rounded-xl p-4 shadow-sm border border-border/50 flex items-center">
            <Star className="h-6 w-6 text-yellow-500 mr-3" />
            <div>
              <div className="text-2xl font-bold">4.8</div>
              <div className="text-sm text-muted-foreground">Project Rating</div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-sm border border-border/50 flex items-center">
            <Users className="h-6 w-6 text-blue-500 mr-3" />
            <div>
              <div className="text-2xl font-bold">{project.contributors?.length || 0}</div>
              <div className="text-sm text-muted-foreground">Contributors</div>
            </div>
          </div>
         
        </div>
      </div>
    </div>

   </div>
  );
};

const ProjectDetailsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Sidebar Skeleton */}
      <div className="md:col-span-1">
        <div className="bg-card rounded-xl p-4 shadow-sm border border-border/50 sticky top-20">
          <div className="h-9 w-24 bg-muted rounded-md mb-4"></div>
          
          <div className="mb-6">
            <div className="relative">
              <div className="absolute left-2 top-2.5 h-4 w-4 bg-muted rounded-full"></div>
              <div className="h-9 w-full bg-muted rounded-md pl-8"></div>
              <div className="absolute right-1 top-1 h-7 w-16 bg-muted rounded-md"></div>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="h-5 w-3/4 bg-muted rounded-md mb-3"></div>
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-8 w-full bg-muted rounded-md"></div>
              ))}
            </div>
          </div>
          
          <div className="pt-4 border-t border-border">
            <div className="h-5 w-3/4 bg-muted rounded-md mb-3"></div>
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-16 w-full bg-muted rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content Skeleton */}
      <div className="md:col-span-3">
        <div className="bg-card rounded-xl shadow-sm border border-border/50 overflow-hidden">
          {/* Cover Image Skeleton */}
          <div className="relative h-64 overflow-hidden bg-muted"></div>
          
          {/* Content Skeleton */}
          <div className="p-6">
            <div className="h-10 w-3/4 bg-muted rounded-md mb-6"></div>
            
            <div className="space-y-6">
              {/* Author Info Skeleton */}
              <div className="flex items-center">
                <div className="h-10 w-10 bg-muted rounded-full"></div>
                <div className="ml-3">
                  <div className="h-4 w-24 bg-muted rounded-md mb-1"></div>
                  <div className="h-3 w-32 bg-muted rounded-md"></div>
                </div>
              </div>
              
              {/* Links Skeleton */}
              <div className="flex gap-2">
                <div className="h-9 w-32 bg-muted rounded-md"></div>
                <div className="h-9 w-28 bg-muted rounded-md"></div>
              </div>
              
              {/* Description Skeleton */}
              <div>
                <div className="h-5 w-24 bg-muted rounded-md mb-2"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-muted rounded-md"></div>
                  <div className="h-4 w-5/6 bg-muted rounded-md"></div>
                  <div className="h-4 w-4/6 bg-muted rounded-md"></div>
                </div>
              </div>
              
              {/* Technologies Skeleton */}
              <div>
                <div className="h-5 w-36 bg-muted rounded-md mb-2"></div>
                <div className="flex flex-wrap gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-6 w-16 bg-muted rounded-full"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;