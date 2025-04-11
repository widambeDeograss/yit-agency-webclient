import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from 'lucide-react';
import { Avatar } from '../ui/avatar';

const Team = () => {
  return (
    <div>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-2 bg-amber-100 text-amber-800 hover:bg-amber-200">Our Team</Badge>
            <h2 className="text-3xl font-bold mb-4">Meet Our Leadership</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dedicated professionals committed to empowering youth through technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-all">
              <CardHeader className="text-center pb-2">
                <Avatar className="w-24 h-24 mx-auto">
                  <img src="/api/placeholder/96/96" alt="Neema James" />
                </Avatar>
                <CardTitle className="mt-4">Neema James</CardTitle>
                <CardDescription className="font-medium text-green-600">CEO & Founder</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 text-sm">Visionary leader with a passion for technology and youth empowerment.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-all">
              <CardHeader className="text-center pb-2">
                <Avatar className="w-24 h-24 mx-auto">
                  <img src="/api/placeholder/96/96" alt="Stella Kaishe" />
                </Avatar>
                <CardTitle className="mt-4">Stella Kaishe</CardTitle>
                <CardDescription className="font-medium text-green-600">Finance Director & Co-Founder</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 text-sm">Financial expert dedicated to sustainable growth and impact.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-all">
              <CardHeader className="text-center pb-2">
                <Avatar className="w-24 h-24 mx-auto">
                  <img src="/api/placeholder/96/96" alt="Innocent Ushaki" />
                </Avatar>
                <CardTitle className="mt-4">Innocent Ushaki</CardTitle>
                <CardDescription className="font-medium text-green-600">Chief Operating Officer</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 text-sm">Operations specialist driving efficiency and quality in all programs.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-all">
              <CardHeader className="text-center pb-2">
                <Avatar className="w-24 h-24 mx-auto">
                  <img src="/api/placeholder/96/96" alt="Frank Youze" />
                </Avatar>
                <CardTitle className="mt-4">Frank Youze</CardTitle>
                <CardDescription className="font-medium text-green-600">Chief Technology Officer</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 text-sm">Technology leader guiding our tech initiatives and innovations.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-all">
              <CardHeader className="text-center pb-2">
                <Avatar className="w-24 h-24 mx-auto">
                  <img src="/api/placeholder/96/96" alt="Rebeca Joshua" />
                </Avatar>
                <CardTitle className="mt-4">Rebeca Joshua</CardTitle>
                <CardDescription className="font-medium text-green-600">Marketing Director</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 text-sm">Creative marketer expanding our reach and community engagement.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Team