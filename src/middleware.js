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
      const { id } = action.result
      const {
        productFeatures: { planName },
      } = getState()
      if (window && window.FS && window.FS.identify) {
        window.FS.identify(id, {
          pricingPlan_str: planName,
        })
      }
      break
    default:
      break
  }
}
