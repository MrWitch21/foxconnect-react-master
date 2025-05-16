import { useState } from 'react'
import { MoreVertical, Pencil, Trash2 } from 'lucide-react'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

import { useDeletePost } from '../../api/deletePost'
import type { Post } from './postTypes'
import { useUpdatePost } from '../../api/updatePost'
import { UpdatePostDialog } from './dialogs/UpdatePostDialog'
import { DeletePostDialog } from './dialogs/DeleteDialog'

type PostCardActionsProps = {
  post: Post
}

function PostCardActions({ post }: PostCardActionsProps) {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [isEditModalOpen, setEditModalOpen] = useState(false)


  const updateMutation = useUpdatePost({
    mutationConfig: {
      onSuccess: () => setEditModalOpen(false),
    },
  })
  const handleUpdate = (data: { id: string; title: string; body: string }) => {
    return updateMutation.mutateAsync(data)
  }

  const deleteMutation = useDeletePost({
    mutationConfig: {
      onSuccess: () => setDeleteModalOpen(false),
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
        open={isEditModalOpen}
        onOpenChange={setEditModalOpen}
      />

      <DeletePostDialog
        open={isDeleteModalOpen}
        onOpenChange={setDeleteModalOpen}
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
          <DropdownMenuItem onClick={() => setEditModalOpen(true)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeleteModalOpen(true)}>
            <Trash2 className="mr-2 h-4 w-4 text-red-500" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export { PostCardActions }
