const moment = require('moment')

const getCurrentDate = () => moment().format('DD/MM/YYYY')

module.exports = getCurrentDate