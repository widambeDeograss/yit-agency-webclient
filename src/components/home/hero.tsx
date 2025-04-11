import { Button } from "@/components/ui/button"
import { BlobBackground } from "../shared/blob-bg"

export function Hero() {
  return (
    <section className="relative h-[600px] flex items-center">
       <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Empowering <span className="text-green-500">Youth</span> Through Technology
          </h1>
          <p className="text-lg text-muted-foreground">
            YIT Agency is a dynamic platform dedicated to equipping young people with the skills, knowledge, 
            and experiences they need to thrive in the ever-evolving world of technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-lg">
              Join Our Community
            </Button>
            <Button variant="outline" className="px-8 py-6 text-lg">
              Explore Programs
            </Button>
          </div>
        </div>
      </div>
      <BlobBackground />
    </section>
  )
}