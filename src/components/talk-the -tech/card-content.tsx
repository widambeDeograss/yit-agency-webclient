import { Card, CardContent } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MessageCircle, ThumbsUp, Eye, Clock, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function ContentCard({ type, title, author, date, comments, views, tags }: {
  type: 'forum' | 'blog' | 'poll'
  title: string
  author: string
  date: string
  comments: number
  views: number
  tags?: string[]
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <Avatar className="h-10 w-10 border">
            <span className="text-sm">{author[0]}</span>
          </Avatar>

          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              {tags?.map(tag => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>

            <h3 className="font-semibold">{title}</h3>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" /> {author}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" /> {date}
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" /> {comments}
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" /> {views}
              </div>
            </div>
          </div>

          <Button variant="ghost" size="sm">
            <ThumbsUp className="h-4 w-4 mr-2" /> 42
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}