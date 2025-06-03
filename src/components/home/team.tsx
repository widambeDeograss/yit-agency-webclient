import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useTheme } from '../theme-provider';

const Team = () => {
  const { theme } = useTheme();

  return (
    <div>
      {/* Team Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block mb-2">
              <Badge variant="outline" className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">Our Team</Badge>
            </div>
            <h2 className="text-3xl font-bold mb-4 text-foreground">Meet Our Leadership</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dedicated professionals committed to empowering youth through technology
            </p>
          </div>
         <div className='w-full'>
           <div className='container mx-auto'>
      
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ">
            <Card className="border-border shadow-md hover:shadow-lg transition-all">
              <CardHeader className="text-center pb-2">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarImage src="/api/placeholder/96/96" alt="Neema James" />
                  <AvatarFallback>NJ</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4 text-foreground">Neema James</CardTitle>
                <CardDescription className="font-medium text-primary">CEO & Founder</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground text-sm">Visionary leader with a passion for technology and youth empowerment.</p>
              </CardContent>
            </Card>
            
            <Card className="border-border shadow-md hover:shadow-lg transition-all">
              <CardHeader className="text-center pb-2">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarImage src="/api/placeholder/96/96" alt="Stella Kaishe" />
                  <AvatarFallback>SK</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4 text-foreground">Stella Kaishe</CardTitle>
                <CardDescription className="font-medium text-primary">Finance Director & Co-Founder</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground text-sm">Financial expert dedicated to sustainable growth and impact.</p>
              </CardContent>
            </Card>
            
            <Card className="border-border shadow-md hover:shadow-lg transition-all">
              <CardHeader className="text-center pb-2">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarImage src="/api/placeholder/96/96" alt="Innocent Ushaki" />
                  <AvatarFallback>IU</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4 text-foreground">Innocent Ushaki</CardTitle>
                <CardDescription className="font-medium text-primary">Chief Operating Officer</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground text-sm">Operations specialist driving efficiency and quality in all programs.</p>
              </CardContent>
            </Card>
            
            <Card className="border-border shadow-md hover:shadow-lg transition-all">
              <CardHeader className="text-center pb-2">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarImage src="/api/placeholder/96/96" alt="Frank Youze" />
                  <AvatarFallback>FY</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4 text-foreground">Frank Youze</CardTitle>
                <CardDescription className="font-medium text-primary">Chief Technology Officer</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground text-sm">Technology leader guiding our tech initiatives and innovations.</p>
              </CardContent>
            </Card>
    
          </div>

           </div>
         </div>
        </div>
      </section>
    </div>
  )
}

export default Team