'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      Usuario.hasMany(models.Objeto, { foreignKey: 'usuarioId', as: 'objetos' });
      Usuario.hasMany(models.Solicitud, { foreignKey: 'solicitanteId', as: 'solicitudesEnviadas' });
      Usuario.hasMany(models.Solicitud, { foreignKey: 'propietarioId', as: 'solicitudesRecibidas' });
    }
  }
  Usuario.init({
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [6, 100] }
    }
  }, { sequelize, modelName: 'Usuario', tableName: 'Usuarios' });
  return Usuario;
};