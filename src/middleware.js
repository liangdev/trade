const config = require('config')
const jwt = require('koa-jwt')
const joi = require('joi')


const JWTAuthentication = jwt({ secret: config.jwt.secret })

const validate = (schemas, options) => async(ctx, next) => {
  Object.keys(schemas).forEach(key => {
    const data = ctx.request[key]
    const schema = schemas[key]
    const { error } = joi.validate(data, schema)
    if (error) {
      throw error
    }
  })
  return next()
}




module.exports = {
  JWTAuthentication,
  validate,
}

