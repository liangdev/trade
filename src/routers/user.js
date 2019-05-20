const Router = require('koa-router')
const { JWTAuthentication } = require('../middleware')
const userServices = require('../services/user')
const orderServices = require('../services/order')


const router = new Router({
  prefix: '/user'
})

router.use(JWTAuthentication)




/**
 * @api {get} /user/info getUserInfo
 * @apiVersion 1.0.0
 * @apiName getUserInfo
 * @apiGroup user
 * @apiUse GeneralAuth
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
{
    "id": 3,
    "nickname": "",
    "phone": "13625002109"
}
 */
router.get('/info', async ctx => {
  const { id } = ctx.state.user
  const user = await userServices.findUserById(id)
  ctx.body = user
})

/**
 * @api {get} /user/orders getUserOrders
 * @apiVersion 1.0.0
 * @apiName getUserOrders
 * @apiParam {string} symbol
 * @apiParam {string="buy","sell"} type
 * @apiParam {string="REQUEST","CANCEL","COMPLETE"} status
 * @apiGroup user
 * @apiUse GeneralAuth
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
{
    "orders": [
        {
            "id": 11,
            "user_id": 1,
            "symbol": "btc",
            "price": 200,
            "type": "buy",
            "status": "CANCEL",
            "created_at": "2019-05-20T02:55:58.000Z",
            "updated_at": "2019-05-20T05:45:57.000Z"
        }
    ]
}
 */
router.get('/orders', async ctx => {
  const { id } = ctx.state.user
  const { symbol, type, status } = ctx.request.query
  const orders = await orderServices.getOrders(id, symbol, type, status)
  ctx.body = { orders }
})

module.exports = router

