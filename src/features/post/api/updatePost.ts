import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { apiClient } from '@/utils/api'
import type { MutationConfig } from '@/utils/query'

import type { Post } from '../components/postTypes'
import { getPostsOptions } from '../api/getPosts'

const updatePostSchema = z.object({
  id: z.string().nonempty(),
  title: z
    .string()
    .nonempty('Title is required')
    .min(3, { message: 'Title must be at least 3 characters long' })
    .max(100, { message: 'Title must be less than 100 characters' }),
  body: z
    .string()
    .nonempty('Body is required')
    .min(3, { message: 'Body must be at least 3 characters long' })
    .max(1000, { message: 'Body must be less than 1000 characters' }),
})

type UpdatePostSchema = z.infer<typeof updatePostSchema>

const updatePost = async (input: UpdatePostSchema): Promise<Post> => {
  const response = await apiClient.patch(`/posts/${input.id}`, {
    title: input.title,
    body: input.body,
  })
  return response.data
}

type UseUpdatePostOptions = {
  mutationConfig?: MutationConfig<typeof updatePost>
}

const useUpdatePost = ({ mutationConfig }: UseUpdatePostOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getPostsOptions().queryKey,
      })

      onSuccess?.(data, ...args)
    },
    ...restConfig,
    mutationFn: updatePost,
  })
}

export type { UpdatePostSchema }
export { updatePostSchema, updatePost, useUpdatePost }
