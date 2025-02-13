import * as React from 'react'

import { Dialog, Typography } from '@epdomains/themey'

import { Snippet } from '../../../types'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: (
      <Dialog
        open
        subtitle="Dialog Subtitle"
        title="Dialog Title"
        variant="closable"
        onDismiss={() => alert('dismissed')}
      >
        <Typography>Dialog text content.</Typography>
      </Dialog>
    ),
  },
]
