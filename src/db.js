const { dbConfig, dbOptions } = require('config')
const Sequelize = require('sequelize')

const path = require('path')
const fs = require('fs')
const humps = require('humps')
const _ = require('lodash')

const logger = require('./logger')


let models = {}

const loadModels = (filePath, db) => {
  const files = fs.readdirSync(filePath)

  files.forEach(file => {
    if (fs.statSync(path.join(filePath, file)).isDirectory()) {
      models[file] = loadModels(path.join(filePath, file), db);
    } else {
      const filename = file.split('.')[0];
      const ext = path.extname(file)
      if (ext === '.js') {
        var model = db.import(path.join(filePath, filename))
        models[humps.pascalize(model.name)] = model;
      }
    }
  });
}

const modelsPath = path.resolve(path.join(__dirname, 'models'))
logger.debug("modelsPath", modelsPath)


const db = new Sequelize(dbConfig.database, dbConfig.username,
  dbConfig.password, Object.assign(dbOptions, {
    logging: sql => {
      logger.trace("sql", sql)
    }
  })
)

const selectOne = async(sql, params) => {
  return await selectAll(sql, params).then(_.first)
}

const selectAll = async(sql, params) => {
  logger.debug("selectAll", sql, params)
  return await db.query(sql, { replacements: params, type: Sequelize.QueryTypes.SELECT })
}

const selectWithPagination = async(sql, params, resultKey) => {
  sql += `
    limit :limit offset :offset;
  `
  params.limit = _.toInteger(params.limit) || 10
  params.offset = _.toInteger(params.offset) || 0
  logger.debug("selectAllWithTotal", sql, params)
  return await db.query(sql, { replacements: params, type: Sequelize.QueryTypes.SELECT })
    .then(rows => {
      return {
        total: parseInt(_.get(_.first(rows), 'total', 0), 10),
        [resultKey]: _.map(rows, row => _.omit(row, 'total'))
      }
    })
}


const execute = async(sql, params) => {
  return await db.query(sql, { replacements: params }).spread((results, metadata) => {
    logger.debug("execute", results, metadata)
    return results
  }).catch(err => {
    logger.error("execute sql error", sql, params, err)
  })
}

loadModels(modelsPath, db)

logger.debug("load models", models)


module.exports = {
  db,
  models,
  execute,
  selectOne,
  selectAll,
  selectWithPagination,
}

