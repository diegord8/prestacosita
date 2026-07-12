'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Solicitud extends Model {
    static associate(models) {
      Solicitud.belongsTo(models.Objeto, { foreignKey: 'objetoId', as: 'objeto' });
      Solicitud.belongsTo(models.Usuario, { foreignKey: 'solicitanteId', as: 'solicitante' });
      Solicitud.belongsTo(models.Usuario, { foreignKey: 'propietarioId', as: 'propietario' });
    }
  }
  Solicitud.init({
    objetoId: { type: DataTypes.INTEGER, allowNull: false },
    solicitanteId: { type: DataTypes.INTEGER, allowNull: false },
    propietarioId: { type: DataTypes.INTEGER, allowNull: false },
    fechaInicio: { type: DataTypes.DATEONLY, allowNull: false },
    fechaFin: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        esPosterior(value) {
          if (value < this.fechaInicio) {
            throw new Error('La fecha fin debe ser igual o posterior a la fecha inicio');
          }
        }
      }
    },
    estado: {
      type: DataTypes.ENUM('pendiente', 'aprobada', 'rechazada', 'cancelada'),
      allowNull: false,
      defaultValue: 'pendiente'
    }
  }, { sequelize, modelName: 'Solicitud', tableName: 'Solicitudes' });
  return Solicitud;
};