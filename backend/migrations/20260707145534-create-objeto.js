'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Objetos', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      nombre: { type: Sequelize.STRING(150), allowNull: false },
      descripcion: { type: Sequelize.TEXT },
      categoria: {
        type: Sequelize.ENUM('Herramientas', 'Deportes', 'Cocina', 'Electrónica', 'Ropa', 'Jardín'),
        allowNull: false
      },
      imagen: { type: Sequelize.TEXT },
      usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Usuarios', key: 'id' },
        onDelete: 'CASCADE'
      },
      rating: { type: Sequelize.DECIMAL(2, 1), allowNull: false, defaultValue: 0 },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Objetos');
  }
};