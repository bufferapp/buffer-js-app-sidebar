import {
  actions as dataFetchActions,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch'

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
      const {
        id,
        createdAt,
        plan,
        planCode,
        trial,
        is_business_user,
      } = action.result
      const {
        productFeatures: { planName },
      } = getState()
      if (window) {
        if (window.FS && window.FS.identify) {
          window.FS.identify(id, {
            pricingPlan_str: planName,
          })
        }
        if (window.Appcues) {
          if (is_business_user) {
            window.Appcues.identify(id, {
              name: id, // current user's name
              createdAt, // Unix timestamp of user signup date
              plan, // Current user’s plan type
              planCode, // Current user’s plan tier
              onTrial: trial.onTrial,
              trialLength: trial.trialLength,
              trialTimeRemaining: trial.trialTimeRemaining,
            })
          }
        }
      }
      break
    default:
      break
  }
}
