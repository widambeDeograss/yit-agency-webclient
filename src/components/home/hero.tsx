import { Button } from "@/components/ui/button"
import { BlobBackground } from "../shared/blob-bg"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative h-[800px] md:h-[700px] flex items-center overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Left Content */}
        <div className="max-w-xl space-y-6 z-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Empowering <span className="text-primary">Youth</span> Through Technology
          </h1>
          <p className="text-lg text-muted-foreground">
            Join Tanzania's fastest-growing tech community with 5,000+ members. Gain skills, collaborate on projects, and launch your tech career.
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

        {/* Right Card with Community Images */}
        <div className="hidden md:block relative z-10 mt-12 md:mt-0">
          <div className="relative group">
            {/* Floating Card Animation */}
            <div className="relative animate-float">
              <div className="bg-card p-6 rounded-2xl shadow-2xl border border-border max-w-sm transform transition-all group-hover:scale-105">
                <div className="text-xl font-semibold mb-4">Next Workshop: AI Fundamentals</div>
                <div className="flex items-center justify-between mb-6">
                  <div className="bg-primary/10 px-3 py-1 rounded-full text-primary text-sm font-medium">Apr 20, 2025</div>
                  <div className="text-muted-foreground text-sm">50 spots remaining</div>
                </div>
                
                {/* Community Images Collage */}
                <div className="relative h-48 mb-6">
                  <img 
                    src="https://img.freepik.com/free-photo/laptop-which-there-is-world-people-drawn_1232-288.jpg?ga=GA1.1.758269213.1736070258&semt=ais_hybrid&w=740" 
                    alt="Workshop participants" 
                    className="absolute w-32 h-32 object-cover rounded-lg border-2 border-card -left-8 -top-4 rotate-3 shadow-lg"
                  />
                  <img 
                    src="https://img.freepik.com/free-photo/developers-brainstorming-ideas-looking-code-computer-screens-asking-feedback-from-senior-developer-while-intern-joins-discussion-junior-programmers-collaborating-group-project_482257-41852.jpg?ga=GA1.1.758269213.1736070258&semt=ais_hybrid&w=740" 
                    alt="Coding session" 
                    className="absolute w-28 h-28 object-cover rounded-lg border-2 border-card right-0 top-2 -rotate-2 shadow-lg"
                  />
                  <img 
                    src="https://img.freepik.com/free-photo/creative-students-collaborating-with-laptop_23-2147664080.jpg?ga=GA1.1.758269213.1736070258&semt=ais_hybrid&w=740" 
                    alt="Group project" 
                    className="absolute w-24 h-24 object-cover rounded-lg border-2 border-card left-12 bottom-0 rotate-6 shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                </div>

                <div className="space-y-3 mb-6">
                  {['Web Development', 'UI/UX Design', 'Machine Learning'].map((topic) => (
                    <div key={topic} className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-primary mr-2" />
                      <div>{topic}</div>
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90">Secure Your Spot</Button>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -right-8 -top-8 w-20 h-20 bg-primary/10 rounded-full filter blur-xl animate-pulse" />
            <div className="absolute -left-12 -bottom-12 w-24 h-24 bg-primary/20 rounded-full filter blur-xl animate-pulse delay-1000" />
          </div>
        </div>
      </div>

      {/* Animated Blob Background */}
      <BlobBackground />

      {/* Floating Community Members */}
      <div className="hidden md:block absolute right-0 top-1/3 w-48 space-y-8 opacity-75">
        {[0, 1, 2].map((i) => (
          <div 
            key={i}
            className="relative animate-float"
            style={{ animationDelay: `${i * 1}s` }}
          >
            <div className="w-12 h-12 bg-primary/10 rounded-full" />
            <div className="absolute -right-4 bottom-0 w-8 h-8 bg-primary/20 rounded-full" />
          </div>
        ))}
      </div>
    </section>
  )
}