'use strict';
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Objetos', [
      {
        nombre: 'Taladro Eléctrico Bosch',
        descripcion: 'Taladro eléctrico en excelente estado. Perfecto para trabajos de bricolaje en casa.',
        categoria: 'Herramientas',
        imagen: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400',
        usuarioId: 1,
        rating: 4.5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Bicicleta Montaña',
        descripcion: 'Bicicleta de montaña rodado 26, ideal para paseos por el parque.',
        categoria: 'Deportes',
        imagen: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400',
        usuarioId: 2,
        rating: 5.0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Olla Grande 10 Litros',
        descripcion: 'Olla de acero inoxidable de 10 litros. Perfecta para reuniones grandes.',
        categoria: 'Cocina',
        imagen: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400',
        usuarioId: 1,
        rating: 4.5,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('Objetos', null, {});
  }
};