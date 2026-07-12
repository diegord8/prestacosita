'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Objeto extends Model {
    static associate(models) {
      Objeto.belongsTo(models.Usuario, { foreignKey: 'usuarioId', as: 'usuario' });
      Objeto.hasMany(models.Solicitud, { foreignKey: 'objetoId', as: 'solicitudes' });
    }
  }
  Objeto.init({
    nombre: { type: DataTypes.STRING(150), allowNull: false },
    descripcion: DataTypes.TEXT,
    categoria: {
      type: DataTypes.ENUM('Herramientas', 'Deportes', 'Cocina', 'Electrónica', 'Ropa', 'Jardín'),
      allowNull: false
    },
    imagen: DataTypes.TEXT,
    usuarioId: { type: DataTypes.INTEGER, allowNull: false },
    rating: {
      type: DataTypes.DECIMAL(2, 1),
      allowNull: false,
      defaultValue: 0,
      validate: { min: 0, max: 5 }
    }
  }, { sequelize, modelName: 'Objeto', tableName: 'Objetos' });
  return Objeto;
};