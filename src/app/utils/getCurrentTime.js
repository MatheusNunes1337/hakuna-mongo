const moment = require('moment')

const getCurrentTime = () => moment().format('HH:mm')

module.exports = getCurrentTime