const Router = require('koa-router')
const { JWTAuthentication } = require('../middleware')
const orderServices = require('../services/order')


const router = new Router({
  prefix: '/order'
})

router.use(JWTAuthentication)


/**
 * @api {get} /order/products getTradePairs
 * @apiVersion 1.0.0
 * @apiName getProducts
 * @apiGroup order
 * @apiUse GeneralAuth
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
{
    "trade_pairs": [
        "btc-usd",
        "ltc-usd",
        "eth-usd",
        "etc-usd"
    ]
}
 *
 *
 */
router.get('/products', async ctx => {
  const products = await orderServices.getProducts()
  ctx.body = products
})


/**
 * @api {post} /order createOrder
 * @apiVersion 1.0.0
 * @apiName postOrder
 * @apiGroup order
 * @apiParam {string} symbol
 * @apiParam {string="buy","sell"} type
 * @apiParam {float} price
 * @apiUse GeneralAuth
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
{
    "id": 13,
    "symbol": "btc",
    "type": "buy",
    "price": "8000.2",
    "status": "REQUEST"
}
 *
 *
 */
router.post('/', async ctx => {
  const { id } = ctx.state.user
  const { symbol, type, price } = ctx.request.body
  const order = await orderServices.createOrder(id, symbol, type, price)
  ctx.body = order
})

/**
 * @api {patch} /order/:order_id updateOrder
 * @apiVersion 1.0.0
 * @apiName updateOrder
 * @apiGroup order
 * @apiParam {int} order_id
 * @apiParam {float} price
 * @apiUse GeneralAuth
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
{
    "id": 13,
    "symbol": "btc",
    "type": "buy",
    "price": "8000.2",
    "status": "REQUEST"
}
 *
 *
 */
router.patch('/:order_id', async ctx => {
  const { user } = ctx.state
  const { order_id } = ctx.params
  const { price } = ctx.request.body
  const order = await orderServices.updateOrder(user.id, order_id, price)
  ctx.body = order
})

/**
 * @api {delete} /order/:order_id cancelOrder
 * @apiVersion 1.0.0
 * @apiName cancelOrder
 * @apiGroup order
 * @apiParam {int} order_id
 * @apiUse GeneralAuth
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
{
    "id": 13,
    "symbol": "btc",
    "type": "buy",
    "price": "8000.2",
    "status": "REQUEST"
}
 *
 *
 */
router.delete('/:order_id', async ctx => {
  const { user } = ctx.state
  const { order_id } = ctx.params
  const order = await orderServices.cancelOrder(user.id, order_id)
  ctx.body = order
})

/**
 * @api {get} /order/book getOrderBook
 * @apiVersion 1.0.0
 * @apiName getOrderBook
 * @apiParam {string} symbol
 * @apiParam {string="buy","sell"} type
 * @apiGroup order
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
router.get('/book', async ctx => {
  const { symbol, type } = ctx.request.query
  const orders = await orderServices.getOrderBook(symbol, type)
  ctx.body = { orders }
})


module.exports = router

