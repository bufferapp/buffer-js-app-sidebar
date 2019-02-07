import React from 'react'
import PropTypes from 'prop-types'
import { calculateStyles } from '@bufferapp/components/lib/utils'
import { geyser } from '@bufferapp/components/style/color'
import { PseudoClassComponent } from '@bufferapp/components'

const handleOnClick = onClick => e => {
  if (onClick) {
    e.preventDefault()
    onClick(e)
  }
}

class PopoverMenuItem extends PseudoClassComponent {
  render() {
    const { href, children, subtitle, onClick, highlight } = this.props
    const mainLinkStyle = {
      display: 'block',
      color: '#fff',
      fontSize: '0.9rem',
    }
    const subtitleStyle = {
      display: 'block',
      fontSize: '.85rem',
      paddingTop: '.25rem',
    }
    const style = calculateStyles(
      {
        default: {
          display: 'block',
          color: `${geyser}`,
          textDecoration: 'none',
          padding: '.5rem 1rem',
        },
        hovered: {
          color: '#fff',
        },
      },
      {
        hovered: this.state.hovered,
      },
    )
    const listStyle = highlight ? { backgroundColor: '#1b2a3a' } : {}

    return (
      <li
        onMouseEnter={() => this.handleMouseEnter()}
        onMouseLeave={() => this.handleMouseLeave()}
        onFocus={() => this.handleFocus()}
        onBlur={() => this.handleBlur()}
        style={listStyle}
      >
        {subtitle ? (
          <a
            role="menuitem"
            href={href || '#'}
            onClick={handleOnClick(onClick)}
            style={style}
          >
            <span style={mainLinkStyle}>{children}</span>
            <span style={subtitleStyle}>{subtitle}</span>
          </a>
        ) : (
          <a
            role="menuitem"
            href={href || '#'}
            onClick={handleOnClick(onClick)}
            style={style}
          >
            <span style={mainLinkStyle}>{children}</span>
          </a>
        )}
      </li>
    )
  }
}

PopoverMenuItem.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node,
  subtitle: PropTypes.node,
  highlight: PropTypes.bool,
}

PopoverMenuItem.defaultProps = {
  highlight: false,
}

export default PopoverMenuItem
