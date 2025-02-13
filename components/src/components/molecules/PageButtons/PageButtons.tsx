import * as React from 'react'
import styled, { css } from 'styled-components'

import { getTestId } from '../../../utils/utils'

type NativeDivProps = React.HTMLAttributes<HTMLDivElement>

type Size = 'small' | 'medium'

type Props = {
  /** Total number of pages */
  total: number
  current: number
  /** Maximum number of buttons to show */
  max?: number
  size?: Size
  alwaysShowFirst?: boolean
  alwaysShowLast?: boolean
  showEllipsis?: boolean
  onChange: (value: number) => void
} & Omit<NativeDivProps, 'children' | 'onChange'>

enum Marker {
  ellipsis = -1,
}

const Container = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: ${theme.space['2']};
    flex-gap: ${theme.space['2']};
  `,
)

const PageButton = styled.button<{ $selected?: boolean; $size: Size }>(
  ({ theme, $selected, $size }) => css`
    background-color: transparent;
    transition: all 0.15s ease-in-out;
    cursor: pointer;
    ${$selected
      ? css`
          background-color: ${theme.colors.background};
          cursor: default;
          pointer-events: none;
          color: ${theme.colors.accent};
        `
      : css`
          color: ${theme.colors.text};
          &:hover {
            background-color: ${theme.colors.foregroundSecondary};
          }
        `}

    border-radius: ${$size === 'small'
      ? theme.space['2']
      : theme.radii['extraLarge']};
    border: 1px solid ${theme.colors.borderSecondary};
    min-width: ${$size === 'small' ? theme.space['9'] : theme.space['10']};
    padding: ${theme.space['2']};
    height: ${$size === 'small' ? theme.space['9'] : theme.space['10']};
    font-size: ${$size === 'small'
      ? theme.space['3.5']
      : theme.fontSizes['small']};
    font-weight: ${theme.fontWeights['medium']};
  `,
)

const Dots = styled.p(
  ({ theme }) => css`
    font-size: ${theme.fontSizes['small']};
    font-weight: ${theme.fontWeights['bold']};
    color: ${theme.colors.textTertiary};
  `,
)

export const PageButtons = ({
  total,
  current,
  max = 5,
  size = 'medium',
  alwaysShowFirst,
  alwaysShowLast,
  showEllipsis = true,
  onChange,
  ...props
}: Props) => {
  const maxPerSide = Math.floor(max / 2)
  const start = Math.max(
    Math.min(Math.max(current - maxPerSide, 1), total - max + 1),
    1,
  )
  const pageNumbers = Array.from({ length: max }, (_, i) => start + i).filter(
    (x) => x <= total,
  )

  if (total > max) {
    if (alwaysShowFirst && start > 1) {
      if (showEllipsis) {
        pageNumbers[0] = Marker.ellipsis
        pageNumbers.unshift(1)
      } else {
        pageNumbers[0] = 1
      }
    } else if (showEllipsis && start > 1) {
      pageNumbers.unshift(Marker.ellipsis)
    }

    if (alwaysShowLast && total > current + maxPerSide) {
      if (showEllipsis) {
        pageNumbers[pageNumbers.length - 1] = Marker.ellipsis
        pageNumbers.push(total)
      } else {
        pageNumbers[pageNumbers.length - 1] = total
      }
    } else if (showEllipsis && total > current + maxPerSide) {
      pageNumbers.push(Marker.ellipsis)
    }
  }

  return (
    <Container
      {...{ ...props, 'data-testid': getTestId(props, 'pagebuttons') }}
    >
      {pageNumbers.map((value, i) =>
        value === Marker.ellipsis ? (
          // eslint-disable-next-line react/no-array-index-key
          <Dots data-testid="pagebutton-dots" key={`${value}-${i}`}>
            ...
          </Dots>
        ) : (
          <PageButton
            $selected={value === current}
            $size={size}
            data-testid="pagebutton"
            key={value}
            type="button"
            onClick={() => onChange(value)}
          >
            {value}
          </PageButton>
        ),
      )}
    </Container>
  )
}
