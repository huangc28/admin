## Purpose

Implementing a server side rendering app with **React** + **Redux** + **Redux-saga** + **Express** + **Webpack**.

## Server Side Rendering

1. server is responsible for rendering initial html.

2. serve **js bundle** as public, leave the rendering to frontend.

### Install

`yarn install`

### Development

`npm run dev`. request `localhost:3005` in your browser.

### Production build

`npm run build:prod`

### Host production script on local

`npm run start:local`. request `localhost:3005` in your browser.

### Fake data

[json-server](https://github.com/typicode/json-server) use this to serve fake data to frontend. It host's a node server with basic RESTful routes.

### Environment config

[here](http://stackoverflow.com/questions/8332333/node-js-setting-up-environment-specific-configs-to-be-used-with-everyauth) is how I will be using for seperating environment configuration.

## Design & Form

I choose to use [google material-ui](http://www.material-ui.com) as the generic design for the app.

[redux-form](http://redux-form.com)

[material-ui](https://github.com/erikras/redux-form-material-ui)

**Production**

`NODE_ENV=production npm run start`

**Developement**

`NODE_ENV=development npm run dev`

**Configuration**

```
const config = () => {
  switch(this.process.NODE_ENV):
    case 'production':
      return {prod config}
    default:
      return {dev config}
}

export default config()
```