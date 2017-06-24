export const getCurrentRoute = state => (
  (
    state.routing &&
    state.routing.locationBeforeTransitions &&
    state.routing.locationBeforeTransitions.pathname
  ) || ''
)