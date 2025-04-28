import { Button } from "@/components/ui/button"
import { 
  ArrowRight, 
  Users, 
  School, 
  Target, 
  Lightbulb,
  Code, 
  Brain, 
  Calendar
} from "lucide-react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BlobBackground } from "@/components/shared/blob-bg"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AboutPage() {
  const teamMembers = [
    { name: "Neema James", fallback:"NJ", role: "CEO & Founder", image: "/api/placeholder/80/80" },
    { name: "Stella Kaishe",fallback:"SK", role: "Finance Director & Co-Founder", image: "/api/placeholder/80/80" },
    { name: "Innocent Ushaki",fallback:"IU", role: "Chief Operating Officer", image: "/api/placeholder/80/80" },
    { name: "Frank Youze",fallback:"FY", role: "Chief Technology Officer", image: "/api/placeholder/80/80" },
    { name: "Rebeca Joshua", fallback:"RJ",role: "Marketing Director", image: "/api/placeholder/80/80" }
  ]

  const sdgGoals = [
    { num: 4, title: "Quality Education", description: "Providing inclusive and equitable quality education" },
    { num: 8, title: "Decent Work and Economic Growth", description: "Promoting economic growth and productive employment" },
    { num: 9, title: "Industry, Innovation, and Infrastructure", description: "Building resilient infrastructure and fostering innovation" },
    { num: 10, title: "Reduced Inequalities", description: "Reducing inequality by providing equal opportunities" }
  ]

  const departments = [
    { 
      name: "Community", 
      icon: <Users className="h-8 w-8 text-primary" />, 
      description: "Building and nurturing relationships among members through networking events, meetups, and mentorship programs."
    },
    { 
      name: "Marketing & Events", 
      icon: <Calendar className="h-8 w-8 text-primary" />, 
      description: "Promoting YIT's initiatives, attracting participants and sponsors, and managing event logistics."
    },
    { 
      name: "Media", 
      icon: <Brain className="h-8 w-8 text-primary" />, 
      description: "Creating and distributing content that highlights YIT's activities, achievements, and tech-related topics."
    }
  ]

  return (
    <div className="relative overflow-hidden">
      <BlobBackground />
      
      {/* Hero Section */}
      <section className="pt-16 pb-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-block bg-primary/10 px-4 py-2 rounded-full text-primary font-medium text-sm mb-2">
              About YIT Agency
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Empowering Tanzania's <span className="text-primary">Youth</span> Through Technology
            </h1>
            <p className="text-lg text-muted-foreground">
              Founded in 2023, we've grown from a WhatsApp group of 90+ tech enthusiasts to a thriving community of 5,000+ members passionate about technology.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Our Story</h2>
              <p className="text-lg text-muted-foreground">
                Youth in Technology (YIT) Agency was born from a passion for technology and a vision to empower Tanzania's youth. Founded on July 5, 2023, we began as a small WhatsApp community of 90+ tech enthusiasts eager to learn, connect, and grow together.
              </p>
              <p className="text-lg text-muted-foreground">
                By July 14, 2023, YIT Agency was officially registered, marking the beginning of our journey as Tanzania's fastest-growing tech community. Today, with over 5,000 members, we've created a dynamic platform where young innovators can thrive in the ever-evolving world of technology.
              </p>
              <Button className="bg-primary hover:bg-primary/90">
                Join Our Community <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="relative">
              <div className="bg-card border border-border p-8 rounded-2xl shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Mission & Vision</h3>
                    <p className="text-muted-foreground">Guiding our community forward</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Our Mission</h4>
                    <p className="text-muted-foreground">To reach young people and introduce them to the exciting advancements in technology, making tech education accessible, engaging, and impactful.</p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Our Vision</h4>
                    <p className="text-muted-foreground">In the next five years, to become a leading technology hub for youth—providing full exposure to technology through learning, skill-building, and hands-on experiences.</p>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -z-10 -right-8 -bottom-8 w-48 h-48 bg-primary/5 rounded-full"></div>
              <div className="absolute -z-10 -left-4 -top-4 w-24 h-24 bg-primary/10 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 bg-muted/30 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">What We Do</h2>
            <p className="text-lg text-muted-foreground">
              At YIT Agency, we focus on three key areas to empower the youth of Tanzania with technology skills.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card border border-border shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <School className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Skill Development</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We equip young people with essential tech skills through training programs and workshops in programming, techpreneurship, and project management.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <Users className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Community Building</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We create a dynamic environment where young individuals can connect and collaborate through meetups, hackathons, and networking events.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border border-border shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <Lightbulb className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Awareness & Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We keep youth informed about the latest advancements in technology through various media channels and events.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Departments */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Departments</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {departments.map((dept, index) => (
              <div key={index} className="bg-card border border-border p-6 rounded-xl shadow-md">
                <div className="mb-4">
                  {dept.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{dept.name}</h3>
                <p className="text-muted-foreground">{dept.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-muted/30 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-lg text-muted-foreground">
              Meet the passionate leaders behind YIT Agency who are dedicated to empowering youth through technology.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-card border border-border p-4 rounded-xl text-center shadow-md">
              <Avatar className="w-16 h-16 mx-auto">
                  <AvatarImage src="/api/placeholder/96/96" alt="Neema James" />
                  <AvatarFallback>{member.fallback}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-lg text-muted-foreground">
              YIT Agency is committed to contributing to the United Nations Sustainable Development Goals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-4">
            {sdgGoals.map((goal, index) => (
              <div key={index} className="bg-card border border-border p-4 rounded-xl shadow-md flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <span className="text-primary font-bold">SDG{goal.num}</span>
                </div>
                <h3 className="font-semibold text-center mb-2">{goal.title}</h3>
                <p className="text-sm text-muted-foreground text-center">{goal.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Tanzania's Fastest-Growing Tech Community</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            With 5,000+ members, YIT Agency provides the perfect platform to gain skills, collaborate on projects, and launch your tech career.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg">
              Join Our Community
            </Button>
            <Button variant="outline" className="px-8 py-6 text-lg">
              Learn More <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}