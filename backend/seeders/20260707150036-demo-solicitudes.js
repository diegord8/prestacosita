'use strict';
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Solicitudes', [
      {
        objetoId: 1,
        solicitanteId: 2,
        propietarioId: 1,
        fechaInicio: '2026-06-01',
        fechaFin: '2026-06-03',
        estado: 'pendiente',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        objetoId: 2,
        solicitanteId: 1,
        propietarioId: 2,
        fechaInicio: '2026-06-05',
        fechaFin: '2026-06-07',
        estado: 'aprobada',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('Solicitudes', null, {});
  }
};