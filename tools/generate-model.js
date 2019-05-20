var config = require('config')
var dbConfig = config.dbConfig
var dbOptions = config.dbOptions
var path = require('path')
var exec = require('child_process').exec;


var modelPath = path.join(path.dirname(__dirname), 'src', 'models')
exec(`rm ${modelPath}/*`)


var SequelizeAuto = require('sequelize-auto')
var auto = new SequelizeAuto(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbOptions.host,
  port: dbOptions.port,
  dialect: dbOptions.dialect,
  directory: modelPath,
  additional: {
    timestamps: dbOptions.timestamps,
    underscored: dbOptions.underscored,
  }
});

auto.run(function(err) {
  if (err) throw err;

  console.log(auto.tables); // table list
  console.log(auto.foreignKeys); // foreign key list
});
