import { Card, CardHeader, CardContent } from "@/components/ui/card"


export function SidebarSection({ title, children }: {
  title: string
  children: React.ReactNode
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <h3 className="font-semibold">{title}</h3>
      </CardHeader>
      <CardContent className="space-y-1">
        {children}
      </CardContent>
    </Card>
  )
}