const Router = require('koa-router')
const jwt = require('jsonwebtoken')
const config = require('config')
const userServices = require('../services/user')


const sign = user => {
  const token = jwt.sign({
    id: user.id
  }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn
  })
  return token
}



const router = new Router({
  prefix: '/auth'
})




/**
 * @api {post} /auth/signup signup
 * @apiVersion 1.0.0
 * @apiName signup
 * @apiGroup auth
 * @apiUse General
 *
 * @apiParam {string} phone
 * @apiParam {string} password
 *
 * @apiSuccess {Bool}  success
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
{
    "id": 3,
    "phone": "13625002109",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTM1NDI3MDIwLCJleHAiOjE1MzkwMjcwMjB9.GUFjOXNI-Z_qLIudRw4AuMjj4Ze30mvTo3QVLKBpgbs"
}
 */
router.post('/signup', async ctx => {
  const { phone, password } = ctx.request.body
  const user = await userServices.signup(phone, password)
  ctx.body = {
    id: user.id,
    phone: user.phone,
    token: sign(user),
  }
})


/**
 * @api {post} /auth/signin signin
 * @apiVersion 1.0.0
 * @apiName signin
 * @apiGroup auth
 * @apiUse General
 *
 * @apiParam {string} phone
 * @apiParam {string} password
 *
 * @apiSuccess {string}  token
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
{
    "id": 3,
    "phone": "13625002109",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTM1NDI3MDIwLCJleHAiOjE1MzkwMjcwMjB9.GUFjOXNI-Z_qLIudRw4AuMjj4Ze30mvTo3QVLKBpgbs"
}
 *
 *
 */
router.post('/signin', async ctx => {
  const { phone, password } = ctx.request.body
  const user = await userServices.signin(phone, password)
  ctx.body = {
    id: user.id,
    phone: user.phone,
    token: sign(user),
  }
})

module.exports = router

