import * as React from 'react'

import { Skeleton, SkeletonGroup } from '@epdomains/themey'

import { Snippet } from '../../../types'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: (
      <SkeletonGroup loading>
        <Skeleton>_</Skeleton>
      </SkeletonGroup>
    ),
  },
]
