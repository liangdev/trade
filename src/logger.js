const { colorConsole } = require('tracer')
const config = require('config')

console.log("config", config)

const logger = colorConsole(config.log.level)
module.exports = logger

