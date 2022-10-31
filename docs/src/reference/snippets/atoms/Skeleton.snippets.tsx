import * as React from 'react'

import { Skeleton } from '@epdomains/themey'

import { Snippet } from '../../../types'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: (
      <Skeleton loading>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Skeleton>
    ),
  },
]
