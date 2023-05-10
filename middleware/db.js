const path = require("path");
const Sequelize = require("sequelize");
const mybatisMapper = require("mybatis-mapper");

const config = require(path.join(__dirname, '..', 'config', 'config.json')).test;
console.log("config",config);
const sequelize = new Sequelize(config.database, config.username, config.password, config);


const sqlPath = path.join(__dirname, "..", ".", `/sql`);

mybatisMapper.createMapper([`${sqlPath}/sms.xml`]);

var db = async function (req, res, next) {
  req.sequelize = sequelize;
  req.mybatisMapper = mybatisMapper;
  next();
};

module.exports = db;
