"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";

const configuraciones = require("../config/config.js");
const config = configuraciones[env];

const db = {};

if (!config) {
  throw new Error(
    `No existe configuración para el entorno: ${env}`
  );
}

const { url, ...options } = config;

if (!url) {
  throw new Error(
    `No se encontró la URL de la base de datos para el entorno: ${env}`
  );
}

const sequelize = new Sequelize(url, options);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const definirModelo = require(
      path.join(__dirname, file)
    );

    if (typeof definirModelo !== "function") {
      throw new Error(
        `El archivo models/${file} no exporta una función`
      );
    }

    const model = definirModelo(
      sequelize,
      Sequelize.DataTypes
    );

    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (typeof db[modelName].associate === "function") {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;