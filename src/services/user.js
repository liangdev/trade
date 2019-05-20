const { models } = require('../db')
const { User } = models
const { panic } = require('../error')
const bcrypt = require('bcrypt-nodejs')




class UserServices {

  constructor() {}

  async findUserByPhone(phone) {
    return await User.findOne({
      where: {
        phone
      }
    })
  }

  async findUserById(id) {
    const user = await User.findOne({
      where: {
        id
      }
    })
    return {
      phone: user.phone,
      created_at: user.created_at,
    }
  }


  async signup(phone, password) {
    const oldUser = await this.findUserByPhone(phone)
    if (oldUser) {
      panic(1001, 'phone number has beed userd')
    }
    const user = await User.create({
      phone,
      nickname: '',
      password: bcrypt.hashSync(password)
    })
    return user
  }

  async signin(phone, password) {
    const user = await this.findUserByPhone(phone)
    if (!user) {
      panic(1101, 'phone number not exist')
    }
    console.log("user", user.password, password)
    const isEqual = bcrypt.compareSync(password, user.password);
    if (!isEqual) {
      panic(1102, 'password not equal')
    }
    return user
  }



}

const userServices = new UserServices()

module.exports = userServices

