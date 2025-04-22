import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function SearchBar({ value, onChange }: {
  value: string
  onChange: (value: string) => void
}) {
  return (

       <div className="relative max-w-md w-full mx-4 hidden md:block">
         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
         <Input 
           placeholder="Search discussions..." 
           className="pl-10 bg-background/50"
           value={value}
           onChange={(e) => onChange(e.target.value)}
         />
       </div>
       
  )
}
