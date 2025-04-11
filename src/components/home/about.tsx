import React from 'react'
import { Badge } from '../ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Calendar, Code, Users } from 'lucide-react';

const About = () => {
  return (
    <div>
         {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-2 bg-green-100 text-green-800 hover:bg-green-200">About Us</Badge>
            <h2 className="text-3xl font-bold mb-4">Our Mission & Vision</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Founded in July 2023, we aim to create a space where young individuals can explore, learn, and engage with technology.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Mission</h3>
              <p className="text-gray-600 mb-6">
                Our goal is to reach a large number of young people, both inside and outside universities, 
                and introduce them to the exciting advancements in technology. By leveraging social media platforms, 
                events, and media outreach, we make tech education accessible, engaging, and impactful.
              </p>
              
              <h3 className="text-2xl font-bold mb-4">Vision</h3>
              <p className="text-gray-600">
                In the next five years, YIT Agency envisions becoming a leading technology hub for youth—a company that 
                provides full exposure to technology, whether through learning, skill-building, or hands-on experiences 
                with technological advancements.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-green-50 border-none shadow-md">
                <CardHeader>
                  <Code className="h-8 w-8 text-green-600" />
                  <CardTitle className="mt-2">Skill Development</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Equipping young people with essential tech skills through training programs and workshops</p>
                </CardContent>
              </Card>
              
              <Card className="bg-blue-50 border-none shadow-md">
                <CardHeader>
                  <Users className="h-8 w-8 text-blue-600" />
                  <CardTitle className="mt-2">Community Building</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Creating a dynamic community where young individuals connect and collaborate</p>
                </CardContent>
              </Card>
              
              <Card className="bg-purple-50 border-none shadow-md">
                <CardHeader>
                  <Calendar className="h-8 w-8 text-purple-600" />
                  <CardTitle className="mt-2">Events & Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Organizing hackathons, bootcamps, and tech meetups for hands-on learning</p>
                </CardContent>
              </Card>
              
              <Card className="bg-amber-50 border-none shadow-md">
                <CardHeader>
                  <Award className="h-8 w-8 text-amber-600" />
                  <CardTitle className="mt-2">Awareness</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Promoting awareness of emerging trends, tools, and resources in tech</p>
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