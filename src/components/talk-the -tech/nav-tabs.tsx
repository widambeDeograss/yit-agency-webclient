import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, FileText, BarChart2 } from "lucide-react"

export function NavigationTabs({ activeTab, onTabChange }: { activeTab: string; onTabChange: (value: string) => void }) {
  return (
    <div className="border-b border-border bg-background/95 backdrop-blur sticky top-16 z-30">
      <div className="container mx-auto px-4">
        <Tabs defaultValue={activeTab} onValueChange={onTabChange} className="w-full">
          <TabsList className="h-14 w-full justify-start bg-transparent gap-1 sm:gap-2">
            <TabsTrigger 
              value="forums" 
              className="flex items-center gap-1 sm:gap-2 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 sm:px-4 text-sm sm:text-base"
            >
              <MessageSquare className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
              Forums
            </TabsTrigger>
            <TabsTrigger 
              value="blogs" 
              className="flex items-center gap-1 sm:gap-2 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 sm:px-4 text-sm sm:text-base"
            >
              <FileText className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
              Blogs
            </TabsTrigger>
            <TabsTrigger 
              value="polls" 
              className="flex items-center gap-1 sm:gap-2 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 sm:px-4 text-sm sm:text-base"
            >
              <BarChart2 className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
              Polls
            </TabsTrigger>
            <TabsTrigger 
              value="projects" 
              className="flex items-center gap-1 sm:gap-2 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 sm:px-4 text-sm sm:text-base"
            >
              <BarChart2 className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
              Projects
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}