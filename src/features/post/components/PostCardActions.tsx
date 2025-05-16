import { useState } from 'react'
import { MoreVertical, Pencil, Trash2 } from 'lucide-react'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

import { useDeletePost } from '../api/deletePost'
import type { Post } from './postTypes'
import { useUpdatePost } from '../api/updatePost'
import { DeletePostDialog } from './dialogs/DeletePostDialog'
import { UpdatePostDialog } from './dialogs/UpdatePostDialog'


type PostCardActionsProps = {
  post: Post
}

function PostCardActions({ post }: PostCardActionsProps) {

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [isEditDialogOpen, setEditDialogOpen] = useState(false)

  const updateMutation = useUpdatePost({
    mutationConfig: {
      onSuccess: () => setEditDialogOpen(false),
    },
  })
  const handleUpdate = (data: { id: string; title: string; body: string }) => {
    return updateMutation.mutateAsync(data)
  }

  const deleteMutation = useDeletePost({
    mutationConfig: {
      onSuccess: () => setDeleteDialogOpen(false),
    },
  })
  const handleDelete = () => {
    deleteMutation.mutate(post.id)
  }

  return (
    <>
      <UpdatePostDialog
        defaultValues={{
          id: post.id,
          title: post.title,
          body: post.body,
        }}
        handleSubmit={handleUpdate}
        open={isEditDialogOpen}
        onOpenChange={setEditDialogOpen}
      />

      <DeletePostDialog
        open={isDeleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        isLoading={deleteMutation.isPending}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Post actions">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setEditDialogOpen(true)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeleteDialogOpen(true)}>
            <Trash2 className="mr-2 h-4 w-4 text-red-500" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export { PostCardActions }
