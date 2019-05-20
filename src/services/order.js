const _ = require('lodash')
const { trade_pairs } = require('config')
const { selectAll, models } = require('../db')
const { Order } = models
const { panic } = require('../error')

const types = ['buy', 'sell']

function isNumeric(num) {
  return !isNaN(num)
}

const ORDER_STATUS_REQUEST = 'REQUEST'
const ORDER_STATUS_CANCEL = 'CANCEL'
// const ORDER_STATUS_COMPLETE = 'COMPLETE'

class OrderServices {

  constructor() {}

  getProducts() {
    return {
      trade_pairs,
    }
  }

  checkSymbol(symbol) {
    for (let trade_pair of trade_pairs) {
      if (symbol === trade_pair.split('-')[0]) {
        return true
      }
    }
    panic(100005, 'invalid symbol')
  }

  async createOrder(user_id, symbol, type, price) {
    this.checkSymbol(symbol)
    if (!_.includes(types, type)) {
      panic(100005, 'invalid type')
    }
    if (!isNumeric(price)) {
      panic(100005, 'invalid price')
    }
    const order = await Order.create({
      user_id,
      symbol,
      type,
      price,
      status: ORDER_STATUS_REQUEST,
    })
    return this.formatOrder(order)
  }

  formatOrder(order) {
    return _.pick(order, ['id', 'symbol', 'type', 'price', 'status'])
  }

  async findOrder(user_id, id) {
    const order = await Order.findOne({
      where: {
        user_id,
        id,
      }
    })
    if (!order) {
      panic(1102, 'order not found')
    }
    return order
  }
  async cancelOrder(user_id, id) {
    const order = await this.findOrder(user_id, id)
    if (order.status !== ORDER_STATUS_REQUEST) {
      panic(1102, 'invalid status')
    }
    await order.update({
      status: ORDER_STATUS_CANCEL
    })
    return this.formatOrder({
      ...order.dataValues,
      status: ORDER_STATUS_CANCEL,
    })
  }

  async updateOrder(user_id, id, price) {
    const order = await this.findOrder(user_id, id)
    if (order.status !== ORDER_STATUS_REQUEST) {
      panic(1102, 'invalid status')
    }
    if (_.isEmpty(price) || !isNumeric(price)) {
      panic(100005, 'invalid price')
    }
    await order.update({
      price,
    })
    return this.formatOrder({
      ...order.dataValues,
      price,
    })
  }

  getOrders(user_id, symbol, type, status) {
    let sql = `
    select * from` + " `order` " + `
    where user_id = :user_id
    `
    if (symbol) {
      sql += ` and symbol = :symbol`
    }
    if (type) {
      sql += ` and type = :type`
    }
    if (status) {
      sql += ` and status = :status`
    }
    sql += ` order by created_at desc`
    return selectAll(sql, { user_id, symbol, type, status })
  }

  getOrderBook(symbol, type) {
    let sql = `
    select * from ` + "`order`" + `
    where status = :status
    `
    if (symbol) {
      sql += ` and symbol = :symbol`
    }
    if (type) {
      sql += ` and type = :type`
    }
    sql += ` order by price desc`
    return selectAll(sql, { status: ORDER_STATUS_REQUEST, symbol, type })
  }

}

const orderServices = new OrderServices()

module.exports = orderServices

