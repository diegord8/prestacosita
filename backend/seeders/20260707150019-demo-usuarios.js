'use strict';
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Usuarios', [
      {
        nombre: 'Carlos Rodríguez',
        email: 'carlos@gmail.com',
        password: '123456',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Ana Martínez',
        email: 'ana@gmail.com',
        password: '123456',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('Usuarios', null, {});
  }
};