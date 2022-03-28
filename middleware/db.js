const path = require("path");
const Sequelize = require("sequelize");
const mybatisMapper = require("mybatis-mapper");

// const sequelize = new Sequelize("mysql://root:root@127.0.0.1:3306");
// const sequelize = new Sequelize(
//   "postgres://juandlab:juandlab13258@juandlab.cluster-c6hko0mb11bw.ap-northeast-1.rds.amazonaws.com:5432/juandlab"
// );
/*
const sequelize = new Sequelize(
  "postgres://sp:standardpass13258@sp.cluster-cfun0a43ytwh.ap-northeast-1.rds.amazonaws.com:5432/sp",
  {
    dialect: "postgres", 
    dialectOptions: {
      statement_timeout: 5000, //트랜색션 종료시간
      idle_in_transaction_session_timeout: 5000 트랜색션 잡고 아무것도 안하는시간
    },
    define: {},
    pool: {
      max: 60,
      min: 0,
      idle: 10000,
      acquire: 20000
    },
    logging: console.log,

  }
);
*/
//const dbUrl = process.env.DB_URL;
//const sequelize = new Sequelize(dbUrl);
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
