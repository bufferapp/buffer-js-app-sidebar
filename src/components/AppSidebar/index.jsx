import React from 'react'
import PropTypes from 'prop-types'

import {
  PublishIcon,
  ReplyIcon,
  AnalyzeIcon,
  QuestionIcon,
  Divider,
} from '@bufferapp/components'

import { calculateStyles } from '@bufferapp/components/lib/utils'
import { sidebarBackgroundBlue } from '@bufferapp/components/style/color'
import { navbar } from '@bufferapp/components/style/zIndex'
import { logoutUrl } from '@bufferapp/session-manager'
import PopoverButton from '../PopoverButton'
import BufferLogo from '../BufferLogo'
import PopoverMenu from '../PopoverMenu'
import PopoverMenuItem from '../PopoverMenuItem'
import UserAvatar from '../UserAvatar'

const style = calculateStyles({
  default: {
    background: sidebarBackgroundBlue,
    textAlign: 'center',
    padding: '1rem 0 1rem 0',
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '65px',
    zIndex: navbar,
    position: 'sticky',
    bottom: 0,
    top: 0,
    height: 'calc(100vh - 2rem)',
  },
})

const AppSidebar = ({
  activeProduct,
  user,
  environment,
  onMenuItemClick,
  onUpgradeToProClick,
  onReturnToClassicClick,
  isProUpgradeUser,
  isAbleToReturnToClassicUser,
}) => (
  <nav style={style} aria-label="sidebar" role="menubar">
    <BufferLogo />

    <PopoverButton
      icon={<PublishIcon />}
      active={activeProduct === 'publish'}
      label="Publish"
      href="https://publish.buffer.com"
    />
    <PopoverButton
      icon={<ReplyIcon />}
      active={activeProduct === 'reply'}
      label="Reply"
      href="https://reply.buffer.com/"
      newWindow
    />
    <PopoverButton
      icon={<AnalyzeIcon />}
      active={activeProduct === 'analyze'}
      label="Analyze"
      href="https://analyze.buffer.com/"
      newWindow
    />

    {/* marginTop: auto ensures this section sticks to the bottom (flexbox) */}
    <div style={{ marginTop: 'auto', textAlign: 'center' }}>
      <PopoverButton
        icon={<QuestionIcon />}
        label="Help and Support"
        popoverPosition="above"
      >
        <PopoverMenu>
          <PopoverMenuItem href="https://buffer.com/support">Help &amp; Support</PopoverMenuItem>
          <PopoverMenuItem href="https://faq.buffer.com">FAQ</PopoverMenuItem>
          <PopoverMenuItem href="http://status.buffer.com/">
            Status
          </PopoverMenuItem>
          <PopoverMenuItem href="https://buffer.com/pricing">
            Pricing &amp; Plans
          </PopoverMenuItem>
          <PopoverMenuItem href="https://buffersurvey.typeform.com/to/ZEiVmL">
            Wishlist
          </PopoverMenuItem>
        </PopoverMenu>
      </PopoverButton>
      {!user.loading && (
        <PopoverButton
          icon={<UserAvatar />}
          label="My Account"
          popoverPosition="above"
          large
        >
          <PopoverMenu>
            <PopoverMenuItem
              href="/preferences/general"
              onClick={() => onMenuItemClick({ menuItemKey: 'preferences' })}
              newWindow
              subtitle="Notifications, time / date, apps&hellip;"
            >
              Preferences
            </PopoverMenuItem>
            {activeProduct === 'publish' &&
              isAbleToReturnToClassicUser && (
                <PopoverMenuItem
                  href="#"
                  onClick={onReturnToClassicClick}
                >
                  Switch back to classic Buffer
                </PopoverMenuItem>
              )}
            {activeProduct === 'publish' &&
              isProUpgradeUser && (
                <PopoverMenuItem href="#" onClick={onUpgradeToProClick}>
                  ★ Upgrade to Pro
                </PopoverMenuItem>
              )}
            <Divider color="sidebarBackgroundBlue" />
            <PopoverMenuItem
              href={logoutUrl({
                production: environment === 'production',
              })}
            >
              Sign out
            </PopoverMenuItem>
          </PopoverMenu>
        </PopoverButton>
      )}
    </div>
  </nav>
)

AppSidebar.propTypes = {
  // translations: PropTypes.shape({}),
  activeProduct: PropTypes.string.isRequired,
  user: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  environment: PropTypes.string.isRequired,
  onMenuItemClick: PropTypes.func.isRequired,
  onUpgradeToProClick: PropTypes.func.isRequired,
  onReturnToClassicClick: PropTypes.func.isRequired,
  isProUpgradeUser: PropTypes.bool,
  isAbleToReturnToClassicUser: PropTypes.bool,
}

AppSidebar.defaultProps = {
  activeProduct: 'publish',
  isProUpgradeUser: false,
  isAbleToReturnToClassicUser: false,
  onReturnToClassicClick: () => {},
}

export default AppSidebar
