import * as React from 'react'
import styled, { DefaultTheme } from 'styled-components'

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
  theme: DefaultTheme,
  tone: Tone,
  accent:
    | 'accent'
    | 'accentText'
    | 'accentGradient'
    | 'accentSecondary'
    | 'accentSecondaryHover',
) => {
  if (tone === 'accent') {
    return theme.colors[accent]
  }

  switch (accent) {
    case 'accent':
      return theme.colors[tone]
    case 'accentText':
      return theme.colors.white
    case 'accentGradient':
      return theme.colors.gradients[tone]
    case 'accentSecondary':
      return `rgba(${theme.accentsRaw[tone]}, ${theme.shades[accent]})`
    case 'accentSecondaryHover':
      return `rgba(${theme.accentsRaw[tone]}, ${theme.shades[accent]})`
    default:
      return ``
  }
}

const ButtonElement = styled.button<ButtonElement>`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  transition-propery: all;

  ${({ theme }) => `
  gap: ${theme.space['4']};
  transition-duration: ${theme.transitionDuration['150']};
  transition-timing-function: ${theme.transitionTimingFunction['inOut']};
  letter-spacing: ${theme.letterSpacings['-0.01']};
  width: 100%;
  `}

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
    
    box-shadow: ${theme.shadows['0.25']} ${theme.colors.grey};
    
    &:disabled {
      background-color: ${theme.colors.grey};
      transform: translateY(0px);
      filter: brightness(1);
    }

    border-radius: ${theme.radii.extraLarge};
    font-size: ${theme.fontSizes.large};
    padding: ${theme.space['3.5']} ${theme.space['4']};
  `}

  ${({ $size, theme }) => {
    switch ($size) {
      case 'extraSmall':
        return `
          border-radius: ${theme.radii.large};
          font-size: ${theme.fontSizes.small};
          padding: ${theme.space['2']};
        `
      case 'small':
        return `
          border-radius: ${theme.radii.large};
          font-size: ${theme.fontSizes.small};
          height: ${theme.space['10']};
          padding: 0 ${theme.space['4']};
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
          color: ${getAccentColour(theme, $tone, 'accentText')};
          background: ${getAccentColour(theme, $tone, 'accent')};
        `
      case 'secondary':
        return `
          color: ${theme.colors.textSecondary};
          background: ${theme.colors.grey};
        `
      case 'action':
        return `
          color: ${getAccentColour(theme, $tone, 'accentText')};
          background: ${getAccentColour(theme, $tone, 'accentGradient')};
        `
      case 'transparent':
        return `
          color: ${theme.colors.textTertiary};
          
          &:hover {
              background-color: ${theme.colors.foregroundTertiary};
          }
          
          &:active {
              background-color: ${theme.colors.foregroundTertiary};
          }
        `
      default:
        return ``
    }
  }}
  ${({ $size, $shape, theme }) => {
    switch ($shape) {
      case 'circle':
        return `
          border-radius: ${theme.radii.full};
          padding: 0;
        `
      case 'square':
        return `
        border-radius: ${
          $size === 'small' ? theme.radii['large'] : theme.radii['2xLarge']
        };
        padding: 0;
        `
      default:
        return ``
    }
  }}

  ${({ $size, $center, theme }) => {
    if ($size === 'medium' && $center) {
      return `
        padding-left: ${theme.space['14']};
        padding-right: ${theme.space['14']};
      `
    }
    return ''
  }}

  ${({ theme, $shadowless, $pressed, $variant }) => {
    if ($shadowless && $pressed && $variant === 'transparent') {
      return `
        background-color: ${theme.colors.backgroundSecondary};
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
  ${({ theme }) => `
  color: inherit;
  font-size: inherit;
  font-weight: ${theme.fontWeights['semiBold']};
  `}
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
