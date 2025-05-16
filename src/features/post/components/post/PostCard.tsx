import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import type { Post } from './postTypes'
import { PostCardActions } from './PostCardActions'

type PostCardProps = {
  post: Post
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardAction>
          <PostCardActions post={post} />
        </CardAction>
        <CardDescription>
          {post.createdBy} - {new Date(post.createdAt).toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-justify">{post.body}</CardContent>
    </Card>
  )
}

export { PostCard }
