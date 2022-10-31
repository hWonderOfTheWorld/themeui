import * as React from 'react'

import { CountdownCircle } from '@epdomains/themey'

import { Snippet } from '../../../types'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: <CountdownCircle countdownSeconds={30} />,
  },
]
