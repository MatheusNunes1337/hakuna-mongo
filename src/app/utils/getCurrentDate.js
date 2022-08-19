const moment = require('moment-timezone')

const getCurrentDate = () => moment().tz('America/Sao_Paulo').format('DD/MM/YYYY')

module.exports = getCurrentDate