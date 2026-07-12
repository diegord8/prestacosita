require("dotenv").config();

const configuracionComun = {
  dialect: "postgres",
  logging: false,

  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

module.exports = {
  development: {
    url:
      process.env.DATABASE_URL_DIRECT ||
      process.env.DATABASE_URL,

    ...configuracionComun,
  },

  test: {
    url:
      process.env.DATABASE_URL_TEST ||
      process.env.DATABASE_URL_DIRECT ||
      process.env.DATABASE_URL,

    ...configuracionComun,
  },

  production: {
    url: process.env.DATABASE_URL,

    ...configuracionComun,
  },
};