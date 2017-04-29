import { resolve } from 'path'

export const publicPath = resolve(__dirname, '../..', 'build')
export const staticify = require('staticify')(publicPath) // eslint-disable-line global-require

export function renderFullPage (html, initialState) {
  const cssBundle = process.env.NODE_ENV === 'production'
    ? `<link
        rel="stylesheet"
        type="text/css"
        href=${staticify.getVersionedPath('/bundle.css')}>`
    : ''

  return `<!doctype html>
    <html>
      <head>
        <title>Universal App</title>
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="description" content="Next Deal Shop ERP system">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
        ${cssBundle}
      </head>
      <body style="margin: 0;">
        <div id='app'><div>${html}</div></div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>

        <script src="https://cdn.polyfill.io/v2/polyfill.min.js" async></script>
        <script
          type='application/javascript'
          src='${staticify.getVersionedPath('/vendor.js')}'
        >
        </script>
        <script
          type='application/javascript'
          src='${staticify.getVersionedPath('/main.js')}'
        >
        </script>
      </body>
    </html>
  `
}
