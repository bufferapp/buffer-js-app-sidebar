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
      const { planName } = getState().productFeatures
      if (window && window.FS && window.FS.identify) {
        window.FS.identify(action.result.id, {
          pricingPlan_str: planName || 'free',
        })
      }
      break
    default:
      break
  }
}
