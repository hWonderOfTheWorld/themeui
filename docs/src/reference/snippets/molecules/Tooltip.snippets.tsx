import * as React from 'react'

import { Button, Tooltip } from '@epdomains/themey'

import { Snippet } from '../../../types'

export const snippets: Snippet[] = [
  {
    name: 'Atoms',
    code: (
      <Tooltip content={<span>Tooltip Content</span>}>
        <Button>Button</Button>
      </Tooltip>
    ),
  },
]
