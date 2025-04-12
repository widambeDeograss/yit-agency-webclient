import React from 'react'
import { Button } from '../ui/button'

const Ctas = () => {
  return (
    <div>
         {/* CTA Section */}
     
      <section className="py-16 bg-background">
   
        <div className="container mx-auto px-4 text-center">
        <div className="relative">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/20 rounded-full filter blur-xl animate-blob"></div>
            <div className="absolute -bottom-14 -right-14 w-40 h-40 bg-primary/30 rounded-full filter blur-xl animate-blob animation-delay-4000"></div>
           
          <h2 className="text-3xl font-bold mb-6">Ready to Join the Tech Revolution?</h2>
          <p className="text-muted-foreground  max-w-2xl mx-auto mb-8">
            Be part of a dynamic community of young tech enthusiasts. Learn, grow, and innovate with us.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-primary hover:bg-green-600  px-8 py-6 text-lg">
              Join Our Community
            </Button>
            <Button variant="outline" className=" px-8 py-6 text-lg">
              Contact Us
            </Button>
          </div>
        </div>
        </div>
      </section>
    

    </div>
  )
}

export default Ctas