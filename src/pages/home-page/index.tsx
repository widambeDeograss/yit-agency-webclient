import About from "@/components/home/about";
import ActivityCarousel from "@/components/home/activities-visual";
import Ctas from "@/components/home/ctas";
import { Hero } from "@/components/home/hero";
import Team from "@/components/home/team";



export default function App() {


  return (
    <div className="flex flex-col min-h-screen">

      <div className='flex-1'>
      <Hero/>
       <About/>
       <ActivityCarousel/>
       <Team/>
       <Ctas/>
      </div>
   
      </div>)

  }
