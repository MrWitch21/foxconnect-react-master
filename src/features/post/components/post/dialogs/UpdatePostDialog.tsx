import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { updatePostSchema, type UpdatePostSchema } from '@/features/post/api/updatePost'

type UpdatePostDialogProps = {
  defaultValues: UpdatePostSchema
  handleSubmit: (formData: UpdatePostSchema) => Promise<unknown> | unknown
  open: boolean
  onOpenChange: (open: boolean) => void
}

const UpdatePostDialog = ({ defaultValues, handleSubmit, open, onOpenChange }: UpdatePostDialogProps) => {
  const form = useForm<UpdatePostSchema>({
    resolver: zodResolver(updatePostSchema),
    defaultValues,
  })

  const handleFormSubmit = async (formData: UpdatePostSchema) => {
    await handleSubmit(formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <DialogHeader>
            <DialogTitle>Update post</DialogTitle>
            <DialogDescription>Edit your thoughts and save the changes.</DialogDescription>
          </DialogHeader>
          <form className="space-y-4" onSubmit={form.handleSubmit(handleFormSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title:</FormLabel>
                  <FormControl>
                    <Input placeholder="Update title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Body:</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Edit your post..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && <LoaderCircle className="animate-spin" />} Update post
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export { UpdatePostDialog }
