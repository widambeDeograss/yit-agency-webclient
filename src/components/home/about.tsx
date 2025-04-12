import React from 'react'
import { Badge } from '../ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Calendar, Code, Users } from 'lucide-react';

const About = () => {
  return (
    <div>
      {/* About Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-2 bg-primary/10 text-primary hover:bg-primary/20">About Us</Badge>
            <h2 className="text-3xl font-bold mb-4 text-foreground">Our Mission & Vision</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Founded in July 2023, we aim to create a space where young individuals can explore, learn, and engage with technology.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Mission</h3>
              <p className="text-muted-foreground mb-6">
                Our goal is to reach a large number of young people, both inside and outside universities, 
                and introduce them to the exciting advancements in technology. By leveraging social media platforms, 
                events, and media outreach, we make tech education accessible, engaging, and impactful.
              </p>
              
              <h3 className="text-2xl font-bold mb-4 text-foreground">Vision</h3>
              <p className="text-muted-foreground">
                In the next five years, YIT Agency envisions becoming a leading technology hub for youth—a company that 
                provides full exposure to technology, whether through learning, skill-building, or hands-on experiences 
                with technological advancements.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-card/50 border border-border shadow-md">
                <CardHeader>
                  <div className="p-2 rounded-full bg-primary/10 w-fit">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="mt-2 text-foreground">Skill Development</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Equipping young people with essential tech skills through training programs and workshops</p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 border border-border shadow-md">
                <CardHeader>
                  <div className="p-2 rounded-full bg-primary/10 w-fit">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="mt-2 text-foreground">Community Building</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Creating a dynamic community where young individuals connect and collaborate</p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 border border-border shadow-md">
                <CardHeader>
                  <div className="p-2 rounded-full bg-primary/10 w-fit">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="mt-2 text-foreground">Events & Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Organizing hackathons, bootcamps, and tech meetups for hands-on learning</p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 border border-border shadow-md">
                <CardHeader>
                  <div className="p-2 rounded-full bg-primary/10 w-fit">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="mt-2 text-foreground">Awareness</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Promoting awareness of emerging trends, tools, and resources in tech</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About