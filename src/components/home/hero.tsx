import { Button } from "@/components/ui/button"
import { BlobBackground } from "../shared/blob-bg"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative h-[600px] flex items-center overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="max-w-xl space-y-6 z-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Empowering <span className="text-primary">Youth</span> Through Technology
          </h1>
          <p className="text-lg text-muted-foreground">
            YIT Agency is a dynamic platform dedicated to equipping young people with the skills, knowledge, 
            and experiences they need to thrive in the ever-evolving world of technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg">
              Join Our Community
            </Button>
            <Button variant="outline" className="px-8 py-6 text-lg">
              Explore Programs <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="hidden md:block relative z-10">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/20 rounded-full filter blur-xl animate-blob"></div>
            <div className="absolute -bottom-14 -right-14 w-40 h-40 bg-primary/30 rounded-full filter blur-xl animate-blob animation-delay-4000"></div>
            
            <div className="bg-card p-6 rounded-2xl shadow-lg border border-border max-w-sm">
              <div className="text-xl font-semibold mb-4">Join Our Next Workshop</div>
              <div className="flex items-center justify-between mb-6">
                <div className="bg-primary/10 px-3 py-1 rounded-full text-primary text-sm font-medium">Apr 20, 2025</div>
                <div className="text-muted-foreground text-sm">50 spots remaining</div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                  <div>Intro to Web Development</div>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                  <div>UI/UX Design Fundamentals</div>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                  <div>AI & Machine Learning Basics</div>
                </div>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90">Register Now</Button>
            </div>
          </div>
        </div>
      </div>
      <BlobBackground />
    </section>
  )
}