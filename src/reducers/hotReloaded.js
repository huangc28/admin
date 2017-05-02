
const INIT_STATE = {
  hasHotReloaded: false,
}

export default function hotReloadedReducer (state = INIT_STATE, action) {
  switch (action.type) {
    case 'HAS_HOT_RELOADED':
      return {
        ...state,
        hasHotReloaded: true,
      }
    default:
      return state
  }
}