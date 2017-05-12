/**
 * Client config file.
 *
 * External usage:
 *  init({ store })
 *
 *  config.store
 *  config.store.getState()
 */
const _config = {
  store: null,
}

export default _config

/**
 * @param {object} config
 */
export const init = config => {
  Object.assign(_config, config)
}