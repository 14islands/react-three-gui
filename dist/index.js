
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-three-gui.cjs.production.min.js')
} else {
  module.exports = require('./react-three-gui.cjs.development.js')
}
