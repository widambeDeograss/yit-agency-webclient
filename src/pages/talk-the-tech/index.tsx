import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
import { 
  MessageSquare, 
  FileText, 
  BarChart2, 
  Heart, 
  Share2, 
  MessageCircle, 
  ThumbsUp, 
  Eye, 
  Clock, 
  Search, 
  PlusCircle, 
  Filter, 
  Tag, 
  User, 
  TrendingUp, 
  Bookmark, 
  ChevronRight
} from 'lucide-react';

export default function TalkTheTechPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 w-full bg-indigo-900 shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-indigo-400 to-purple-600 text-white font-bold text-xl p-3 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-6 w-6" />
                <span>Talk</span>
              </div>
            </div>
            <div className="text-white font-semibold text-xl">The Tech</div>
          </div>
          
          <div className="hidden md:flex items-center bg-indigo-800/60 rounded-full px-4 py-2 flex-grow max-w-md mx-6">
            <Search className="h-5 w-5 text-indigo-200 mr-2" />
            <Input 
              placeholder="Search discussions, blogs, and polls..." 
              className="bg-transparent border-none text-white placeholder:text-indigo-200 focus:outline-none focus:ring-0 w-full"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-white hover:bg-indigo-800">
              <User className="h-5 w-5 mr-1" /> Sign In
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <PlusCircle className="h-4 w-4 mr-2" /> Create Post
            </Button>
          </div>
        </div>
        
        {/* Sub-navigation */}
        <div className="bg-indigo-800">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="forums" className="w-full">
              <TabsList className="h-12 bg-transparent grid grid-cols-3 border-b border-indigo-700">
                <TabsTrigger 
                  value="forums" 
                  className="data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-purple-500 text-indigo-200 rounded-none h-full"
                >
                  <MessageSquare className="h-4 w-4 mr-2" /> Forums
                </TabsTrigger>
                <TabsTrigger 
                  value="blogs" 
                  className="data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-purple-500 text-indigo-200 rounded-none h-full"
                >
                  <FileText className="h-4 w-4 mr-2" /> Blogs
                </TabsTrigger>
                <TabsTrigger 
                  value="polls" 
                  className="data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-purple-500 text-indigo-200 rounded-none h-full"
                >
                  <BarChart2 className="h-4 w-4 mr-2" /> Tech Polls
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <Tabs defaultValue="forums" className="w-full">
          {/* Forums Tab Content */}
          <TabsContent value="foruddms" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Sidebar */}
              <div className="col-span-1">
                <Card className="mb-6">
                  <CardHeader className="pb-2">
                    <CardTitle>Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      <Button variant="ghost" className="w-full justify-start text-left font-normal hover:bg-indigo-50">
                        <Tag className="h-4 w-4 mr-2 text-indigo-600" /> 
                        Programming & Development
                        <Badge className="ml-auto bg-indigo-100 text-indigo-800 hover:bg-indigo-200">124</Badge>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start text-left font-normal hover:bg-indigo-50">
                        <Tag className="h-4 w-4 mr-2 text-green-600" /> 
                        Data Science & ML
                        <Badge className="ml-auto bg-green-100 text-green-800 hover:bg-green-200">86</Badge>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start text-left font-normal hover:bg-indigo-50">
                        <Tag className="h-4 w-4 mr-2 text-blue-600" /> 
                        UI/UX & Design
                        <Badge className="ml-auto bg-blue-100 text-blue-800 hover:bg-blue-200">57</Badge>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start text-left font-normal hover:bg-indigo-50">
                        <Tag className="h-4 w-4 mr-2 text-red-600" /> 
                        Cybersecurity
                        <Badge className="ml-auto bg-red-100 text-red-800 hover:bg-red-200">42</Badge>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start text-left font-normal hover:bg-indigo-50">
                        <Tag className="h-4 w-4 mr-2 text-amber-600" /> 
                        Career & Job Market
                        <Badge className="ml-auto bg-amber-100 text-amber-800 hover:bg-amber-200">39</Badge>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start text-left font-normal hover:bg-indigo-50">
                        <Tag className="h-4 w-4 mr-2 text-purple-600" /> 
                        Tech Events & News
                        <Badge className="ml-auto bg-purple-100 text-purple-800 hover:bg-purple-200">31</Badge>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Popular Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="bg-gray-100 hover:bg-gray-200 text-gray-800">#javascript</Badge>
                      <Badge variant="secondary" className="bg-gray-100 hover:bg-gray-200 text-gray-800">#react</Badge>
                      <Badge variant="secondary" className="bg-gray-100 hover:bg-gray-200 text-gray-800">#python</Badge>
                      <Badge variant="secondary" className="bg-gray-100 hover:bg-gray-200 text-gray-800">#ai</Badge>
                      <Badge variant="secondary" className="bg-gray-100 hover:bg-gray-200 text-gray-800">#webdev</Badge>
                      <Badge variant="secondary" className="bg-gray-100 hover:bg-gray-200 text-gray-800">#blockchain</Badge>
                      <Badge variant="secondary" className="bg-gray-100 hover:bg-gray-200 text-gray-800">#datascience</Badge>
                      <Badge variant="secondary" className="bg-gray-100 hover:bg-gray-200 text-gray-800">#beginners</Badge>
                      <Badge variant="secondary" className="bg-gray-100 hover:bg-gray-200 text-gray-800">#career</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="col-span-1 lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <h2 className="text-2xl font-bold">Discussions</h2>
                    <Badge className="ml-3 bg-indigo-100 text-indigo-800">342 topics</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Filter className="h-4 w-4" /> Filter
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" /> Sort
                    </Button>
                  </div>
                </div>

                {/* Discussion List */}
                <div className="space-y-4">
                  {/* Discussion Item */}
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10">
                          <img src="/api/placeholder/40/40" alt="User avatar" />
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className="bg-green-100 text-green-800">Trending</Badge>
                            <Badge className="bg-indigo-100 text-indigo-800">Programming</Badge>
                          </div>
                          <h3 className="text-lg font-semibold mb-2">What's your preferred frontend framework in 2025?</h3>
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            I've been using React for years but I'm curious about the new features in Angular 16 and Vue 4. What are folks using these days for complex web applications?
                          </p>
                          <div className="flex items-center text-gray-500 text-sm gap-4">
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-1" />
                              <span>Michael T.</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>2 hours ago</span>
                            </div>
                            <div className="flex items-center">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              <span>24 replies</span>
                            </div>
                            <div className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              <span>142 views</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Another Discussion Item */}
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10">
                          <img src="/api/placeholder/40/40" alt="User avatar" />
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className="bg-red-100 text-red-800">Hot Topic</Badge>
                            <Badge className="bg-blue-100 text-blue-800">AI & ML</Badge>
                          </div>
                          <h3 className="text-lg font-semibold mb-2">Ethics in AI: Where do we draw the line?</h3>
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            With AI becoming more advanced, I've been thinking about ethical implications. How do we ensure AI development remains beneficial for humanity?
                          </p>
                          <div className="flex items-center text-gray-500 text-sm gap-4">
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-1" />
                              <span>Sarah K.</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>Yesterday</span>
                            </div>
                            <div className="flex items-center">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              <span>37 replies</span>
                            </div>
                            <div className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              <span>230 views</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Another Discussion Item */}
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10">
                          <img src="/api/placeholder/40/40" alt="User avatar" />
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className="bg-amber-100 text-amber-800">Career</Badge>
                          </div>
                          <h3 className="text-lg font-semibold mb-2">Transitioning from developer to tech lead - advice needed</h3>
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            I've been offered a tech lead position but I'm nervous about the management aspects. Anyone been through this transition before?
                          </p>
                          <div className="flex items-center text-gray-500 text-sm gap-4">
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-1" />
                              <span>James L.</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>3 days ago</span>
                            </div>
                            <div className="flex items-center">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              <span>18 replies</span>
                            </div>
                            <div className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              <span>94 views</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Button variant="outline" className="w-full">Load More Discussions</Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Blogs Tab Content */}
          <TabsContent value="fohhrums" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Sidebar */}
              <div className="col-span-1">
                <Card className="mb-6">
                  <CardHeader className="pb-2">
                    <CardTitle>Blog Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      <Button variant="ghost" className="w-full justify-start text-left font-normal hover:bg-indigo-50">
                        <FileText className="h-4 w-4 mr-2 text-indigo-600" /> 
                        Tutorials & Guides
                        <Badge className="ml-auto bg-indigo-100 text-indigo-800 hover:bg-indigo-200">87</Badge>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start text-left font-normal hover:bg-indigo-50">
                        <FileText className="h-4 w-4 mr-2 text-green-600" /> 
                        Industry Insights
                        <Badge className="ml-auto bg-green-100 text-green-800 hover:bg-green-200">64</Badge>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start text-left font-normal hover:bg-indigo-50">
                        <FileText className="h-4 w-4 mr-2 text-blue-600" /> 
                        Tech Reviews
                        <Badge className="ml-auto bg-blue-100 text-blue-800 hover:bg-blue-200">41</Badge>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start text-left font-normal hover:bg-indigo-50">
                        <FileText className="h-4 w-4 mr-2 text-purple-600" /> 
                        Opinion Pieces
                        <Badge className="ml-auto bg-purple-100 text-purple-800 hover:bg-purple-200">32</Badge>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start text-left font-normal hover:bg-indigo-50">
                        <FileText className="h-4 w-4 mr-2 text-amber-600" /> 
                        Success Stories
                        <Badge className="ml-auto bg-amber-100 text-amber-800 hover:bg-amber-200">28</Badge>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Featured Authors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <img src="/api/placeholder/32/32" alt="Author avatar" />
                        </Avatar>
                        <div>
                          <p className="font-medium">Neema James</p>
                          <p className="text-xs text-gray-500">24 articles</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <img src="/api/placeholder/32/32" alt="Author avatar" />
                        </Avatar>
                        <div>
                          <p className="font-medium">Frank Youze</p>
                          <p className="text-xs text-gray-500">17 articles</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <img src="/api/placeholder/32/32" alt="Author avatar" />
                        </Avatar>
                        <div>
                          <p className="font-medium">Innocent Ushaki</p>
                          <p className="text-xs text-gray-500">12 articles</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <img src="/api/placeholder/32/32" alt="Author avatar" />
                        </Avatar>
                        <div>
                          <p className="font-medium">Rebeca Joshua</p>
                          <p className="text-xs text-gray-500">9 articles</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="col-span-1 lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <h2 className="text-2xl font-bold">Tech Blog</h2>
                    <Badge className="ml-3 bg-indigo-100 text-indigo-800">156 articles</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Filter className="h-4 w-4" /> Filter
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Clock className="h-4 w-4" /> Recent
                    </Button>
                  </div>
                </div>

                {/* Featured Article */}
                <Card className="mb-6 overflow-hidden">
                  <div className="relative">
                    <img src="/api/placeholder/800/300" alt="Featured blog image" className="w-full h-48 object-cover" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-purple-500 hover:bg-purple-600">Featured</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-green-100 text-green-800">Tutorial</Badge>
                      <Badge className="bg-blue-100 text-blue-800">AI</Badge>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Building Your First Machine Learning Model with TensorFlow</h3>
                    <p className="text-gray-600 mb-4">
                      A step-by-step guide to creating and training your first neural network using TensorFlow. Perfect for beginners looking to dive into AI development.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <img src="/api/placeholder/32/32" alt="Author avatar" />
                        </Avatar>
                        <div>
                          <p className="font-medium">Frank Youze</p>
                          <p className="text-xs text-gray-500">Apr 10, 2025 · 12 min read</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-500">
                          <Heart className="h-4 w-4" /> 78
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-500">
                          <MessageCircle className="h-4 w-4" /> 24
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-500">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Blog List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Blog Card */}
                  <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative">
                      <img src="/api/placeholder/400/200" alt="Blog image" className="w-full h-40 object-cover" />
                    </div>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-indigo-100 text-indigo-800">Web Dev</Badge>
                      </div>
                      <h3 className="text-lg font-bold mb-2">Modern CSS Techniques Every Developer Should Know</h3>
                      <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                        Exploring the latest CSS features that can simplify your workflow and create better user experiences.
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <img src="/api/placeholder/24/24" alt="Author avatar" />
                          </Avatar>
                          <p className="text-xs text-gray-500">Sarah K. · Apr 8, 2025</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" aria-label="Like">
                            <Heart className="h-4 w-4 text-gray-500" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" aria-label="Comment">
                            <MessageCircle className="h-4 w-4 text-gray-500" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Blog Card */}
                  <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative">
                      <img src="/api/placeholder/400/200" alt="Blog image" className="w-full h-40 object-cover" />
                    </div>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-amber-100 text-amber-800">Career</Badge>
                      </div>
                      <h3 className="text-lg font-bold mb-2">Navigating Your First Tech Interview: Tips and Tricks</h3>
                      <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                        A comprehensive guide to preparing for and acing your technical interviews in the competitive job market.
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <img src="/api/placeholder/24/24" alt="Author avatar" />
                          </Avatar>
                          <p className="text-xs text-gray-500">Rebeca J. · Apr 5, 2025</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" aria-label="Like">
                            <Heart className="h-4 w-4 text-gray-500" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" aria-label="Comment">
                            <MessageCircle className="h-4 w-4 text-gray-500" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* More blog cards would go here */}
                </div>

                <div className="mt-6">
                  <Button variant="outline" className="w-full">Load More Articles</Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Polls Tab Content */}
          <TabsContent value="forums" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Sidebar */}
              <div className="col-span-1">
                <Card className="mb-6">
                  <CardHeader className="pb-2">
                    <CardTitle>Poll Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      <Button variant="ghost" className="w-full justify-start text-left font-normal hover:bg-indigo-50">
                        <BarChart2 className="h-4 w-4 mr-2 text-indigo-600" /> 
                        Technology Trends
                        <Badge className="ml-auto bg-indigo-100 text-indigo-800 hover:bg-indigo-200">32</Badge>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start text-left font-normal hover:bg-indigo-50">
                        <BarChart2 className="h-4 w-4 mr-2 text-green-600" /> 
                        Programming Languages
                        <Badge className="ml-auto bg-green-100 text-green-800 hover:bg-green-200">27</Badge>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start text-left font-normal hover:bg-indigo-50">
                        <BarChart2 className="h-4 w-4 mr-2 text-blue-600" /> 
                        Tools & Software
                        <Badge className="ml-auto bg-blue-100 text-blue-800 hover:bg-blue-200">23</Badge>
                      </Button>
                
                        </div>
                        </CardContent>
                        </Card></div></div></TabsContent></Tabs></main></div>
  )}