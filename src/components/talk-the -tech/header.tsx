import { Button } from "@/components/ui/button"
import { MessageSquare, PlusCircle, User } from "lucide-react"
import { SearchBar } from "@/components/custom/search"

export function TalkHeader({ searchQuery, setSearchQuery }: {
  searchQuery: string
  setSearchQuery: (value: string) => void
}) {
  return (
    <header className="w-full bg-card shadow-sm">
      <div className="container flex items-center justify-between h-16 gap-4 mx-auto">
        {/* Empty spacer to push content to right */}
        <div className="flex-1" />
        
        {/* Search Bar - Takes remaining space */}
        <div className="flex-1 max-w-2xl">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Logo and Title - Right-aligned */}
        <div className="flex-1 flex justify-end items-center gap-2">
          <div className="bg-primary text-primary-foreground p-2 rounded-lg">
            <div className="w-32 h-24">
              <img 
                src="/logos/tet2.png" 
                alt="logo" 
                className="rounded-b-xl shadow-lg overflow-hidden object-fit w-full h-full"
              />
            </div>
          </div>
          <h1 className="text-xl font-bold">Talk the Tech</h1>
        </div>
      </div>
    </header>
  )
}