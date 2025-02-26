import { Suspense } from 'react'

import { api, HydrateClient } from '~/trpc/server'
import Posts from './posts'

const PostCardSkeleton = () => (
    <div className='bg-muted my-2.5 flex w-full flex-col gap-2 rounded-lg p-3'>
      <p className='bg-muted-foreground w-1/6 animate-pulse rounded text-xl'>&nbsp;</p>

      <p className='bg-muted-foreground w-1/3 animate-pulse rounded text-sm'>&nbsp;</p>
    </div>
  ),
  Page = () => {
    void api.post.all.prefetch()
    return (
      <HydrateClient>
        <Suspense
          fallback={
            <>
              <PostCardSkeleton />

              <PostCardSkeleton />

              <PostCardSkeleton />
            </>
          }>
          <Posts />
        </Suspense>
      </HydrateClient>
    )
  }

export default Page
