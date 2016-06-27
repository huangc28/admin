export default function renderFullPage (html, initialState) {
  return `<!doctype html>
    <html>
      <head>
        <title>Universal App</title>
      </head>
      <body>
        <div id='app'>${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script type='application/javascript' src='static/bundle.js'></script>
      </body>
    </html>
  `
}
