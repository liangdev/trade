module.exports = {
  listen: {
    host: "0.0.0.0",
    port: 7082
  },
  log: {
    level: "debug"
  },
  jwt: {
    secret: "trade2019",
    expiresIn: 3600000
  },
  dbConfig: {
    database: "trade",
    username: "root",
    password: "123456"
  },
  dbOptions: {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    timezone: "+08:00",
    pool: {
      max: 10,
      min: 0,
      idle: 10000
    },
    timestamps: true,
    underscored: true,
    benchmark: true
  },
  trade_pairs: [
    'btc-usd',
    'ltc-usd',
    'eth-usd',
    'etc-usd',
  ]
}

