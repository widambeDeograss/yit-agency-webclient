import { Button } from "@/components/ui/button"
import { Filter, MessageSquare, Plus, PlusCircle, User } from "lucide-react"
import { SearchBar } from "@/components/custom/search"

export function TalkHeader({ searchQuery, setSearchQuery }: {
  searchQuery: string
  setSearchQuery: (value: string) => void
}) {
  return (
    <div className="bg-background/80 backdrop-blur-sm py-6 sticky top-0 z-40 border-b border-border">
   <div className="container mx-auto px-4">
     <div className="flex items-center justify-between">
       <div className="flex items-center gap-3">
         {/* <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
           <MessageSquare className="h-5 w-5 text-primary" />
         </div>
         <h1 className="text-xl font-bold">Talk The Tech</h1> */}
       </div>
       
       
       
       <div className="flex items-center gap-3">
       
       </div>
     </div>
   </div>
 </div>
  )
}
