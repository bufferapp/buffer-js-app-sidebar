import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { checkA11y } from 'storybook-addon-a11y'

import AppSidebar from './index'

const translations = {}
const fakeUser = {
  loading: false,
  id: '1234',
  name: 'Hamish Macpherson',
  email: 'hamstu@gmail.com',
  avatar: '',
}

storiesOf('AppSidebar', module)
  .addDecorator(checkA11y)
  .add('should show app sidebar', () => (
    <div style={{ width: '65px', height: '100%', display: 'flex' }}>
      <AppSidebar
        activeProduct="publish"
        translations={translations}
        user={fakeUser}
        environment={'production'}
        onMenuItemClick={action('onMenuItemClick')}
        onUpgradeToProClick={action('onUpgradeToProClick')}
      />
    </div>
  ))
  .add('should show app sidebar with updgrade to Pro link', () => (
    <div style={{ width: '65px', height: '100%', display: 'flex' }}>
      <AppSidebar
        activeProduct="publish"
        translations={translations}
        user={fakeUser}
        environment={'production'}
        onMenuItemClick={action('onMenuItemClick')}
        onUpgradeToProClick={action('onUpgradeToProClick')}
        isProUpgradeUser={true}
      />
    </div>
  ))
  .add('should show app sidebar with return to classic', () => (
    <div style={{ width: '65px', height: '100%', display: 'flex' }}>
      <AppSidebar
        activeProduct="publish"
        translations={translations}
        user={fakeUser}
        environment={'production'}
        onMenuItemClick={action('onMenuItemClick')}
        onUpgradeToProClick={action('onUpgradeToProClick')}
        onReturnToClassicClick={action('onReturnToClassicClick')}
        isAbleToReturnToClassicUser={true}
      />
    </div>
  ))
  .add('should show app sidebar with all things enabled', () => (
    <div style={{ width: '65px', height: '100%', display: 'flex' }}>
      <AppSidebar
        activeProduct="publish"
        translations={translations}
        user={fakeUser}
        environment={'production'}
        onMenuItemClick={action('onMenuItemClick')}
        onUpgradeToProClick={action('onUpgradeToProClick')}
        onReturnToClassicClick={action('onReturnToClassicClick')}
        isAbleToReturnToClassicUser={true}
        isProUpgradeUser={true}
      />
    </div>
  ))
