import React from 'react'
import PropTypes from 'prop-types'

import { geyser } from '@bufferapp/components/style/color'
import { AvatarIcon } from '@bufferapp/components'

const UserAvatar = ({ color, size }) => {
  const style = {
    height: size.height,
    width: size.width,
    position: 'relative',
  }
  const avatarStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
  }
  return (
    <div style={style}>
      <div style={avatarStyle}>
        <AvatarIcon color={color} size={size} />
      </div>
    </div>
  )
}

UserAvatar.propTypes = {
  color: PropTypes.string,
  size: PropTypes.shape({
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
  }),
}

UserAvatar.defaultProps = {
  color: geyser,
  size: {
    width: '27px',
    height: '27px',
  },
}

export default UserAvatar
