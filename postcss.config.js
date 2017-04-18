module.exports = {
  plugins: [
    require('autoprefixer')({ // eslint-disable-line global-require
      browsers: ['> 1%'],
    }),
    require('postcss-flexibility')(), // eslint-disable-line global-require
  ],
}
