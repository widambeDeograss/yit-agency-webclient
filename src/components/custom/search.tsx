import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function SearchBar({ value, onChange }: {
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="flex items-center w-full max-w-md bg-muted rounded-full px-4  border-primary/20 focus:border-primary">
      <Search className="h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search discussions..."
        className="bg-background/50 border-primary/20 focus:border-primary"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}