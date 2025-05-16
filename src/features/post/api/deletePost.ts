import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { MutationConfig } from "@/utils/query"
import { getPostsOptions } from "./getPosts"
import { apiClient } from "@/utils/api"

const deletePost = async (postId: string): Promise<void> => {
    await apiClient.delete(`/posts/${postId}`)
}
type UseDeletePostOptions = {
    mutationConfig?: MutationConfig<typeof deletePost>
}

const useDeletePost = ({ mutationConfig }: UseDeletePostOptions = {}) => {
    const queryClient = useQueryClient()
    const { onSuccess, ...restConfig } = mutationConfig || {}

    return useMutation({
        mutationFn: deletePost,
        onSuccess: (data, ...args) => {
            queryClient.invalidateQueries({
                queryKey: getPostsOptions().queryKey,
            })

            onSuccess?.(data, ...args)
        },
        ...restConfig,
    })
}
export { deletePost, useDeletePost }
