import * as React from 'react'
import styled from 'styled-components'

import { tokens } from '@/src/tokens'

import { ReactNodeNoStrings } from '../../../types'
import { Spinner } from '../Spinner'
import { Typography } from '../Typography'
import { GetCenterProps, getCenterProps } from './utils'

export type Size = 'extraSmall' | 'small' | 'medium'

type NativeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>
type NativeAnchorProps = React.AllHTMLAttributes<HTMLAnchorElement>

type Variant = 'primary' | 'secondary' | 'action' | 'transparent'

type Tone = 'accent' | 'blue' | 'green' | 'red'

type BaseProps = {
  /** An alternative element type to render the component as.*/
  as?: 'a'
  /** Centers text and reserves space for icon and spinner */
  center?: boolean
  children: NativeButtonProps['children']
  /** If true, prevents user interaction with button. */
  disabled?: boolean
  /** Insert a ReactNode before the children */
  prefix?: ReactNodeNoStrings
  /** Shows loading spinner inside button */
  loading?: boolean
  /** Constrains button to specific shape */
  shape?: 'square' | 'circle'
  /** Sets dimensions and layout  */
  size?: Size
  /** Adds ReactNode after children */
  suffix?: ReactNodeNoStrings
  /** The tabIndex attribute for button elemnt. */
  tabIndex?: NativeButtonProps['tabIndex']
  /** The type attribute for button element. */
  type?: NativeButtonProps['type']
  /** Sets the styling of the component.  */
  variant?: Variant
  /** The zIndex attribute for button element. */
  zIndex?: string
  /** If true, sets the style to indicate "on" state. Useful for toggles switches. */
  pressed?: boolean
  /** If true, removes the box-shadow */
  shadowless?: boolean
  /** The handler for click events. */
  onClick?: React.MouseEventHandler<HTMLElement> | undefined
}

type WithTone = {
  /** Sets the color scheme when variant is 'primary' or 'action' */
  tone?: Tone
  variant?: 'primary' | 'action'
}

type WithoutTone = {
  tone?: never
  variant?: Variant
}

type WithAnchor = {
  /** The href attribute for the anchor element. */
  href?: string
  /** The rel attribute for the anchor element. */
  rel?: NativeAnchorProps['rel']
  /** The target attribute for the anchor element. */
  target?: NativeAnchorProps['target']
}

type WithoutAnchor = {
  href?: never
  rel?: never
  target?: never
}

interface ButtonElement {
  $pressed: boolean
  $shadowless: boolean
  $shape?: 'circle' | 'square'
  $size?: 'extraSmall' | 'small' | 'medium'
  $variant: 'primary' | 'secondary' | 'action' | 'transparent'
  $type?: NativeButtonProps['type']
  $center: boolean | undefined
  $tone: Tone
}

const getAccentColour = (
  mode: 'light' | 'dark',
  tone: Tone,
  accent:
    | 'accent'
    | 'accentText'
    | 'accentGradient'
    | 'accentSecondary'
    | 'accentSecondaryHover',
) => {
  if (tone === 'accent') {
    return tokens.colors[mode][accent]
  }

  switch (accent) {
    case 'accent':
      return tokens.colors[mode][tone]
    case 'accentText':
      return tokens.colors.base.white
    case 'accentGradient':
      return tokens.colors[mode].gradients[tone]
    case 'accentSecondary':
      return `rgba(${tokens.accentsRaw[mode][tone]}, ${tokens.shades[mode][accent]})`
    case 'accentSecondaryHover':
      return `rgba(${tokens.accentsRaw[mode][tone]}, ${tokens.shades[mode][accent]})`
    default:
      return ``
  }
}

const ButtonElement = styled.button<ButtonElement>`
  align-items: center;
  cursor: pointer;
  display: flex;
  gap: ${tokens.space['4']};
  justify-content: center;
  transition-propery: all;
  transition-duration: ${tokens.transitionDuration['150']};
  transition-timing-function: ${tokens.transitionTimingFunction['inOut']};
  letter-spacing: ${tokens.letterSpacings['-0.01']};
  width: 100%;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.05);
  }

  &:active {
    transform: translateY(0px);
    filter: brightness(1);
  }

  ${({ theme, disabled, $center, $pressed, $shadowless }) => `
    ${disabled ? `cursor: not-allowed` : ``};
    ${$center ? `position: relative` : ``};
    ${$pressed ? `filter: brightness(0.95)` : ``};
    ${$shadowless ? `box-shadow: none !important` : ``};
    
    box-shadow: ${tokens.shadows['0.25']} ${tokens.colors[theme.mode].grey};
    
    &:disabled {
      background-color: ${tokens.colors[theme.mode].grey};
      transform: translateY(0px);
      filter: brightness(1);
    }
  `}

  border-radius: ${tokens.radii.extraLarge};
  font-size: ${tokens.fontSizes.large};
  padding: ${tokens.space['3.5']} ${tokens.space['4']};

  ${({ $size }) => {
    switch ($size) {
      case 'extraSmall':
        return `
          border-radius: ${tokens.radii.large};
          font-size: ${tokens.fontSizes.small};
          padding: ${tokens.space['2']};
        `
      case 'small':
        return `
          border-radius: ${tokens.radii.large};
          font-size: ${tokens.fontSizes.small};
          height: ${tokens.space['10']};
          padding: 0 ${tokens.space['4']};
        `
      case 'medium':
        return ``
      default:
        return ``
    }
  }}
  ${({ theme, $variant, $tone }) => {
    switch ($variant) {
      case 'primary':
        return `
          color: ${getAccentColour(theme.mode, $tone, 'accentText')};
          background: ${getAccentColour(theme.mode, $tone, 'accent')};
        `
      case 'secondary':
        return `
          color: ${tokens.colors[theme.mode].textSecondary};
          background: ${tokens.colors[theme.mode].grey};
        `
      case 'action':
        return `
          color: ${getAccentColour(theme.mode, $tone, 'accentText')};
          background: ${getAccentColour(theme.mode, $tone, 'accentGradient')};
        `
      case 'transparent':
        return `
          color: ${tokens.colors[theme.mode].textTertiary};
          
          &:hover {
              background-color: ${tokens.colors[theme.mode].foregroundTertiary};
          }
          
          &:active {
              background-color: ${tokens.colors[theme.mode].foregroundTertiary};
          }
        `
      default:
        return ``
    }
  }}
  ${({ $size, $shape }) => {
    switch ($shape) {
      case 'circle':
        return `
          border-radius: ${tokens.radii.full};
        `
      case 'square':
        return `border-radius: ${
          $size === 'small' ? tokens.radii['large'] : tokens.radii['2xLarge']
        };`
      default:
        return ``
    }
  }}

  ${({ $size, $center }) => {
    if ($size === 'medium' && $center) {
      return `
        padding-left: ${tokens.space['14']};
        padding-right: ${tokens.space['14']};
      `
    }
    return ''
  }}

  ${({ theme, $shadowless, $pressed, $variant }) => {
    if ($shadowless && $pressed && $variant === 'transparent') {
      return `
        background-color: ${tokens.colors[theme.mode].backgroundSecondary};
      `
    }
    return ''
  }}
`

const PrefixContainer = styled.div<GetCenterProps>`
  ${getCenterProps}
`

const LoadingContainer = styled.div``

const LabelContainer = styled(Typography)`
  color: inherit;
  font-size: inherit;
  font-weight: ${tokens.fontWeights['semiBold']};
`

export type Props = BaseProps &
  (WithTone | WithoutTone) &
  (WithoutAnchor | WithAnchor)

export const Button = React.forwardRef(
  (
    {
      center,
      children,
      disabled,
      href,
      prefix,
      loading,
      rel,
      shape,
      size = 'medium',
      suffix,
      tabIndex,
      target,
      tone = 'accent',
      type = 'button',
      variant = 'primary',
      zIndex,
      onClick,
      pressed = false,
      shadowless = false,
      as: asProp,
    }: Props,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    const labelContent = <LabelContainer ellipsis>{children}</LabelContainer>
    let childContent: ReactNodeNoStrings
    if (shape) {
      childContent = loading ? <Spinner color="background" /> : labelContent
    } else {
      childContent = (
        <>
          {prefix && (
            <PrefixContainer {...{ center, size, side: 'left' }}>
              {prefix}
            </PrefixContainer>
          )}
          {labelContent}

          {(loading || suffix) && (
            <LoadingContainer {...{ center, size, side: 'right' }}>
              {loading ? <Spinner color="background" /> : suffix}
            </LoadingContainer>
          )}
        </>
      )
    }

    return (
      <ButtonElement
        {...{
          as: asProp as any,
          $variant: variant,
          $tone: tone,
          $size: size,
          $shape: shape,
          $shadowless: shadowless,
          $pressed: pressed,
          $center: center,
          disabled: disabled,
          href: href,
          ref: ref,
          rel: rel,
          tabIndex: tabIndex,
          target: target,
          type: type,
          onClick,
          zIndex,
          position: zIndex && 'relative',
        }}
      >
        {childContent}
      </ButtonElement>
    )
  },
)

Button.displayName = 'Button'
