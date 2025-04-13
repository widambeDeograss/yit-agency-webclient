import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function CategoryButton({ icon, label, count }: {
  icon: React.ReactNode
  label: string
  count: number
}) {
  return (
    <Button variant="ghost" className="w-full justify-start">
      {icon}
      <span className="flex-1 text-left">{label}</span>
      <Badge variant="secondary">{count}</Badge>
    </Button>
  )
}