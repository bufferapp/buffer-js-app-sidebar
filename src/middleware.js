import {
  actions as dataFetchActions,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch'

const maxRandomValue = 10 * 7
const getRandomInt = () => {
  return Math.floor(Math.random() * Math.floor(maxRandomValue))
}

const identifyUser = (id, planName) => {
  window.FS.identify(id, {
    pricingPlan_str: planName,
  })
}

export default ({ dispatch, getState }) => next => action => {
  next(action)
  switch (action.type) {
    case 'APP_INIT':
      dispatch(
        dataFetchActions.fetch({
          name: 'user',
        }),
      )
      break
    case `user_${dataFetchActionTypes.FETCH_SUCCESS}`:
      const { id } = action.result
      const {
        productFeatures: { planName },
      } = getState()
      if (window && window.FS && window.FS.identify) {
        if (planName === 'free') {
          // Validation to track 1 out of 10 free users
          if (getRandomInt() === 1) {
            identifyUser(id, planName)
          }
        } else {
          identifyUser(id, planName)
        }
      }
      break
    default:
      break
  }
}
