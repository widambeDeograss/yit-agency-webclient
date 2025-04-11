import React from 'react'
import { Button } from '../ui/button'

const Ctas = () => {
  return (
    <div>
         {/* CTA Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join the Tech Revolution?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Be part of a dynamic community of young tech enthusiasts. Learn, grow, and innovate with us.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-lg">
              Join Our Community
            </Button>
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-slate-900 px-8 py-6 text-lg">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Ctas