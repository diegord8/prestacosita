'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Solicitudes', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      objetoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Objetos', key: 'id' },
        onDelete: 'CASCADE'
      },
      solicitanteId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Usuarios', key: 'id' },
        onDelete: 'CASCADE'
      },
      propietarioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Usuarios', key: 'id' },
        onDelete: 'CASCADE'
      },
      fechaInicio: { type: Sequelize.DATEONLY, allowNull: false },
      fechaFin: { type: Sequelize.DATEONLY, allowNull: false },
      estado: {
        type: Sequelize.ENUM('pendiente', 'aprobada', 'rechazada', 'cancelada'),
        allowNull: false,
        defaultValue: 'pendiente'
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Solicitudes');
  }
};