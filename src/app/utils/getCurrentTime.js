const moment = require('moment-timezone')

const getCurrentTime = () => moment().tz('America/Sao_Paulo').format('HH:mm')

module.exports = getCurrentTime