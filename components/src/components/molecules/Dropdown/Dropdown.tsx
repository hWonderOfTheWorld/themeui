import * as React from 'react'
import styled from 'styled-components'

import { Button } from '../..'
import { Props as ButtonProps } from '@/src/components/atoms/Button'
import { Colors, tokens } from '@/src/tokens'
import Svg from '@/src/components/atoms/Svg'
import IconDownIndicatorSvg from '@/src/components/atoms/icons/DownIndicator.svg'

export type DropdownItem = {
  label: string
  onClick(): void
  color?: Colors
  disabled?: boolean
}

interface DropdownMenuContainer {
  opened: boolean
  inner: boolean
  shortThrow: boolean
}

const DropdownMenuContainer = styled.div<DropdownMenuContainer>`
  display: flex;
  flexdirection: column;
  justifycontent: center;
  alignitems: center;
  borderradius: medium;
  position: absolute;

  ${(p) =>
    p.opened
      ? `
    visibility: visible;
    opacity: 100;
  `
      : `
    z-index: 0;
    visibility: hidden;
    opacity: 0;
  `}

  ${(p) =>
    p.inner
      ? `
    background-color: ${tokens.colors[p.theme.mode].grey};
    border-radius: ${tokens.radii.almostExtraLarge};
    border-top-radius: none;
    box-shadow: 0;
    border-width: ${tokens.space['px']};
    border-top-width: 0;
    border-color: ${tokens.colors[p.theme.mode].borderSecondary};
    padding-top: ${tokens.space['2.5']};
    padding: 0 ${tokens.space['1.5']};
    padding-bottom: ${tokens.space['1.5']};
    margin-top: -${tokens.space['2.5']};
    transition: 0.35s all cubic-bezier(1, 0, 0.22, 1.6);
  `
      : `
    padding: ${tokens.space['1.5']};
    background-color: ${tokens.colors[p.theme.mode].groupBackground};
    box-shadow: 0.02;
    border-radius: ${tokens.radii['2xLarge']};
  `}

  ${({ opened, inner }) => {
    if (opened && !inner)
      return `
      z-index: 20;
      margin-top: ${tokens.space['1.5']};
      transition: all 0.3s cubic-bezier(1, 0, 0.22, 1.6), width 0s linear, z-index 0s linear 0.3s;
    `

    if (!opened && !inner)
      return `
        transition: all 0.3s cubic-bezier(1, 0, 0.22, 1.6), width 0s linear, z-index 0s linear 0s;
      `

    if (opened && inner)
      return `
        transition: all 0.35s cubic-bezier(1, 0, 0.22, 1.6), width 0s linear, z-index 0s linear 0.35s;
      `

    if (!opened && inner)
      return `
        transition: all 0.35s cubic-bezier(1, 0, 0.22, 1.6), width 0s linear, z-index 0s linear 0s;
      `
  }}

  ${({ opened, shortThrow }) => {
    if (!opened && shortThrow)
      return `
      margin-top: -${tokens.space['2.5']};
    `

    if (!opened && !shortThrow)
      return `
      margin-top: -${tokens.space['12']};
    `
  }}
`

interface MenuButtonProps {
  inner: boolean
  hasColor: boolean
}

const MenuButton = styled.button<MenuButtonProps>`
  align-items: center;
  cursor: pointer;
  display: flex;
  gap: ${tokens.space['4']};
  width: ${tokens.space['full']};
  height: ${tokens.space['12']};
  padding: ${tokens.space['3']};
  font-weight: ${tokens.fontWeights['semiBold']};
  transition: 0.15s all ease-in-out;
  letter-spacing: -0.01em;

  &:active {
    transform: translateY(0px);
    filter: brightness(1);
  }

  ${(p) => `
    &:disabled {
      color: ${tokens.colors[p.theme.mode].textTertiary}
    }
  `}

  ${(p) => {
    if (p.inner)
      return `
      justify-content: center;
    
      &:hover {
        color: ${tokens.colors[p.theme.mode].accent};
      }
    `

    if (!p.inner)
      return `
      justify-content: flex-start;
      
      &:hover {
        transform: translateY(-1x);
        filter: brightness(1.05);
      }
    `
  }}

  ${(p) => {
    if (p.inner && !p.hasColor)
      return `
      color: ${tokens.colors[p.theme.mode].textSecondary};  
    `
  }}
`

type DropdownMenuProps = {
  items: DropdownItem[]
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  width?: string
  inner: boolean
  align: 'left' | 'right'
  shortThrow: boolean
  keepMenuOnTop: boolean
}

const DropdownMenu = ({
  items,
  setIsOpen,
  isOpen,
  width,
  inner,
  align,
  shortThrow,
  keepMenuOnTop,
}: DropdownMenuProps) => {
  return (
    <DropdownMenuContainer
      {...{ opened: isOpen, inner, align, shortThrow }}
      style={{
        width:
          inner || (width && parseInt(width) > 100) ? `${width}px` : '150px',
        zIndex: keepMenuOnTop ? 100 : undefined,
      }}
    >
      {items.map(({ label, color, disabled, onClick }: DropdownItem) => (
        <MenuButton
          {...{ inner, hasColor: !!color, color, disabled }}
          key={label}
          onClick={() => Promise.resolve(setIsOpen(false)).then(onClick)}
        >
          {label}
        </MenuButton>
      ))}
    </DropdownMenuContainer>
  )
}

interface InnerMenuButton {
  size: 'small' | 'medium'
  open: boolean
}

const InnerMenuButton = styled.button<InnerMenuButton>`
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${tokens.space['4']};
  border-width: ${tokens.space['px']};
  font-weight: ${tokens.fontWeights['semiBold']};
  cursor: pointer;
  position: relative;

  ${(p) => `
    border-color: ${tokens.colors[p.theme.mode].borderSecondary};
  `}

  ${(p) => {
    switch (p.size) {
      case 'small':
        return `
          padding: ${tokens.space['0.5']} ${tokens.space['0.25']};
        `
      case 'medium':
        return `
          padding: ${tokens.space['2.5']} ${tokens.space['3.5']};
        `
      default:
        return ``
    }
  }}

  ${(p) => {
    if (p.open)
      return `
      border-top-radius: ${tokens.radii['almostExtraLarge']};
      border-bottom-radius: none;
      border-bottom-width: 0;
      background-color: grey;
      color: ${tokens.colors[p.theme.mode].textTertiary};
      transition: 0.35s all cubic-bezier(1, 0, 0.22, 1.6), 0.3s color ease-in-out, 0.2s border-radius ease-in-out, 0s border-width 0.1s;
      
      &:hover {
        color: ${tokens.colors[p.theme.mode].accent};
      }
      `
    if (!p.open)
      return `
      background-color: ${tokens.colors[p.theme.mode].background};
      color: ${tokens.colors[p.theme.mode].textSecondary};
      border-radius: ${tokens.radii['almostExtraLarge']};
      box-shadow: 0.02;
      transition: 0.35s all cubic-bezier(1, 0, 0.22, 1.6), 0.15s color ease-in-out, 0s border-width 0.15s, 0.15s border-color ease-in-out;
      
      &:hover {
        border-color: ${tokens.colors[p.theme.mode].border};
      }
      `
  }}
`

const Chevron = styled(Svg)<{ open: boolean }>`
  margin-left: ${tokens.space['1']};
  width: ${tokens.space['3']};
  margin-right: ${tokens.space['0.5']};
  transition-duration: ${tokens.transitionDuration['200']};
  transition-property: all;
  transition-timing-function: ${tokens.transitionTimingFunction['inOut']};
  opacity: 0.3;
  transform: rotate(0deg);

  ${(p) =>
    p.open &&
    `
      opacity: 1;
      transform: rotate(180deg);
  `}
`

type Props = {
  children?: React.ReactNode
  buttonProps?: ButtonProps
  inner?: boolean
  chevron?: boolean
  align?: 'left' | 'right'
  shortThrow?: boolean
  keepMenuOnTop?: boolean
  items: DropdownItem[]
  size?: 'small' | 'medium'
  label?: string
}

export const Dropdown = ({
  children,
  buttonProps,
  items = [],
  inner = false,
  chevron = true,
  align = 'left',
  shortThrow = false,
  keepMenuOnTop = false,
  size = 'medium',
  label,
}: Props) => {
  const dropdownRef = React.useRef<any>()

  const [isOpen, setIsOpen] = React.useState(false)

  const handleClickOutside = (e: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false)
    }
  }

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef, isOpen])

  return (
    <div
      data-testid="dropdown"
      ref={dropdownRef}
      style={{ maxWidth: tokens.space.max, position: 'relative' }}
    >
      {!children && inner && (
        <InnerMenuButton
          {...{ open: isOpen, size }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {label}
          {chevron && (
            <Chevron open={isOpen} size="3" svg={IconDownIndicatorSvg} />
          )}
        </InnerMenuButton>
      )}

      {!children && !inner && (
        <Button
          {...buttonProps}
          pressed={isOpen}
          suffix={
            chevron && (
              <Chevron open={isOpen} size="3" svg={IconDownIndicatorSvg} />
            )
          }
          zIndex="10"
          onClick={() => setIsOpen(!isOpen)}
        >
          {label}
        </Button>
      )}

      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...buttonProps,
            zindex: 10,
            onClick: () => setIsOpen(!isOpen),
          })
        }
      })}

      <DropdownMenu
        width={
          dropdownRef.current &&
          dropdownRef.current.getBoundingClientRect().width.toFixed(2)
        }
        {...{
          align,
          inner,
          isOpen,
          items,
          setIsOpen,
          shortThrow,
          keepMenuOnTop,
        }}
      />
    </div>
  )
}

Dropdown.displayName = 'Dropdown'
