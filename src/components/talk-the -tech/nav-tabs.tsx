import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, FileText, BarChart2 } from "lucide-react"

export function NavigationTabs({ activeTab, onTabChange }: { activeTab: string; onTabChange: (value: string) => void }) {
  return (
    <div className="border-b border-border bg-background/95 backdrop-blur sticky top-16 z-30">
      <div className="container mx-auto px-4">
        <Tabs defaultValue={activeTab} onValueChange={onTabChange} className="w-full">
          <TabsList className="h-14 w-full justify-start bg-transparent gap-2">
            <TabsTrigger 
              value="forums" 
              className="flex items-center gap-2 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4"
            >
              <MessageSquare className="h-4.5 w-4.5" />
              Forums
            </TabsTrigger>
            <TabsTrigger 
              value="blogs" 
              className="flex items-center gap-2 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4"
            >
              <FileText className="h-4.5 w-4.5" />
              Blogs
            </TabsTrigger>
            <TabsTrigger 
              value="polls" 
              className="flex items-center gap-2 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4"
            >
              <BarChart2 className="h-4.5 w-4.5" />
              Polls
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}