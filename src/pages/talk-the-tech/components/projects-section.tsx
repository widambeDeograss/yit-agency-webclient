import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { Search, Filter, Github, ExternalLink, Code, Loader2 } from 'lucide-react';
import { Project, ProjectApiResponse } from '@/types/projects';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { projectsService } from '@/apis/services/tet/projects.service';

const Projects = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  
  const { 
    data: projectsData, 
    isLoading, 
    error,
    refetch 
  } = useQuery<ProjectApiResponse>({
    queryKey: ['projects', currentPage, searchQuery, selectedCategory],
    queryFn: () => projectsService.getProjects({ 
      page: currentPage,
      search: searchQuery
    }),
  });

  // Fetching categories
  const { 
    data: categoriesData,
  } = useQuery({
    queryKey: ['project-categories'],
    queryFn: () => projectsService.getCategories(),
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
  };

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
    setCurrentPage(1);
  };

  const totalPages = projectsData?.count ? Math.ceil(projectsData.count / 10) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Sidebar Component */}
      <div className="md:col-span-1">
        <div className="bg-card rounded-xl p-4 shadow-sm border border-border/50 sticky top-20">
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
              {isLoading ? (
                Array(5).fill(0).map((_, i) => (
                  <div key={i} className="h-6 bg-muted rounded animate-pulse"></div>
                ))
              ) : categoriesData?.results ? (
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
            <Button variant="outline" className="w-full">
              Trending Projects
            </Button>
            <Button variant="outline" className="w-full mt-2" >
              My Projects
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:col-span-3">
        <h1 className="text-2xl font-bold mb-6">Community Projects</h1>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <ProjectSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">Failed to load projects</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => refetch()}
            >
              Retry
            </Button>
          </div>
        ) : !projectsData?.results || projectsData.results.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-xl p-6 shadow-sm border border-border/50">
            <p className="text-muted-foreground">No projects available yet</p>
            {searchQuery || selectedCategory ? (
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                }}
              >
                Clear filters
              </Button>
            ) : null}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projectsData.results.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNumber;
                    
                    if (totalPages <= 5) {
                      pageNumber = i + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i;
                    } else {
                      pageNumber = currentPage - 2 + i;
                    }
                    
                    if (pageNumber > 0 && pageNumber <= totalPages) {
                      return (
                        <PaginationItem key={pageNumber}>
                          <Button 
                            variant={currentPage === pageNumber ? "default" : "outline"}
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handlePageChange(pageNumber)}
                          >
                            {pageNumber}
                          </Button>
                        </PaginationItem>
                      );
                    }
                    return null;
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </div>
    </div>
  );
};

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300">
      {project.featured_image && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={project.featured_image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      )}
      
      <CardHeader className={project.featured_image ? "-mt-10 relative z-10" : ""}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8 border-2 border-background">
              {project.author.profileImage ? (
                <AvatarImage src={project.author.profileImage} alt={project.author.username} />
              ) : (
                <AvatarFallback>
                  {project.author.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <span className={`font-medium ${project.featured_image ? "text-white" : ""}`}>
              {project.author.username}
            </span>
          </div>
          <div className="flex space-x-1">
            {project.github_url && (
              <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            )}
            {project.project_url && (
              <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                <a href={project.project_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
        
        <Link to={`/projects/${project.id}`}>
          <h3 className={`text-xl font-bold mt-2 hover:underline ${project.featured_image ? "text-white" : ""}`}>
            {project.title}
          </h3>
        </Link>
      </CardHeader>
      
      <CardContent>
        <p className="text-muted-foreground line-clamp-2">
          {project.description}
        </p>
        
        <div className="mt-4 flex flex-wrap gap-1">
          {project.technologies_used?.slice(0, 4).map((tech) => (
            <Badge key={tech.id} variant="secondary" className="text-xs">
              {tech.name}
            </Badge>
          ))}
          {project.technologies_used?.length > 4 && (
            <Badge variant="secondary" className="text-xs">
              +{project.technologies_used.length - 4} more
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center border-t pt-4">
        <div className="flex -space-x-2">
          {project.contributors?.slice(0, 3).map((contributor) => (
            <Avatar key={contributor.id} className="h-6 w-6 border-2 border-background">
              {contributor.profileImage ? (
                <AvatarImage src={contributor.profileImage} alt={contributor.username} />
              ) : (
                <AvatarFallback className="text-xs">
                  {contributor.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
          ))}
          {project.contributors && project.contributors.length > 3 && (
            <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs border-2 border-background">
              +{project.contributors.length - 3}
            </div>
          )}
        </div>
        
        <Button variant="outline" size="sm" asChild>
          <Link to={`/projects/${project.id}`}>
            View Project
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const ProjectSkeleton = () => (
  <Card className="overflow-hidden animate-pulse">
    <div className="h-48 bg-muted"></div>
    <CardHeader>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-muted"></div>
          <div className="h-4 w-24 bg-muted rounded"></div>
        </div>
        <div className="flex space-x-1">
          <div className="h-8 w-8 rounded bg-muted"></div>
          <div className="h-8 w-8 rounded bg-muted"></div>
        </div>
      </div>
      <div className="h-6 w-3/4 bg-muted rounded mt-2"></div>
    </CardHeader>
    
    <CardContent>
      <div className="h-4 w-full bg-muted rounded mb-2"></div>
      <div className="h-4 w-3/4 bg-muted rounded"></div>
      
      <div className="mt-4 flex flex-wrap gap-1">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-5 w-16 bg-muted rounded"></div>
        ))}
      </div>
    </CardContent>
    
    <CardFooter className="border-t pt-4">
      <div className="flex -space-x-2">
        {[1, 2].map((i) => (
          <div key={i} className="h-6 w-6 rounded-full bg-muted"></div>
        ))}
      </div>
      <div className="ml-auto h-8 w-24 bg-muted rounded"></div>
    </CardFooter>
  </Card>
);

export default Projects;