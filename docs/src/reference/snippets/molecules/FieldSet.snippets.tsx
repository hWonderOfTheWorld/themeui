import * as React from 'react'

import { FieldSet } from '@epdomains/themey'

import { Snippet } from '../../../types'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: (
      <FieldSet legend="Legend">
        <div />
      </FieldSet>
    ),
  },
]
