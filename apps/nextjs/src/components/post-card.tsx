'use client'

import { format, formatDistance } from 'date-fns'
import { Trash } from 'lucide-react'
import { toast } from 'sonner'

import type { RouterOutputs } from '@a/api'
import { cn } from '@a/ui'
import { Button } from '@a/ui/button'

import { api } from '~/trpc/react'

export const PostCard = ({ post }: { readonly post: RouterOutputs['post']['all'][number] }) => {
  const utils = api.useUtils(),
    deletePost = api.post.delete.useMutation({
      onError: err =>
        toast.error(
          err.data?.code === 'UNAUTHORIZED'
            ? 'You must be logged in to delete a post'
            : 'Failed to delete post'
        ),
      onSuccess: async () => utils.post.invalidate()
    })
  return (
    <div className='group bg-muted my-2.5 flex w-full items-center rounded-lg p-3'>
      <div className='group grow space-y-1'>
        <p className='text-2xl font-semibold'>{post.title}</p>

        <p className='text-xs group-hover:hidden'>{format(post.createdAt, 'd/L/y')}</p>

        <p className='hidden text-xs group-hover:block'>
          {formatDistance(post.createdAt, new Date(), { addSuffix: true })}
        </p>

        <p>{post.content}</p>
      </div>

      <Button
        className={cn(
          'group-hover:text-background size-0 text-transparent transition-all duration-500 group-hover:mr-5 group-hover:size-9',
          deletePost.isPending &&
            'border-foreground text-foreground animate-spin rounded-3xl border-2 border-t-transparent bg-transparent *:stroke-none hover:bg-transparent'
        )}
        onClick={() => deletePost.mutate(post.id)}
        size='icon'
        variant='destructive'>
        <Trash />
      </Button>
    </div>
  )
}
