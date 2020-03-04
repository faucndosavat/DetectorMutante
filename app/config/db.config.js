module.exports = {
    HOST: "us-cdbr-iron-east-04.cleardb.net",
    USER: "b1d5091901c725",
    PASSWORD: "70064d4a",
    DB: "heroku_b248512a8c240a2",
    dialect: "mysql",
    pool: {
      max: 1000,
      min: 0,
      acquire: 30000,
      idle: 5000
    }
  };