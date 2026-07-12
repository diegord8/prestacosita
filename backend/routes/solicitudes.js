const router = require('express').Router();
const { Op } = require('sequelize');
const { Solicitud, Objeto, Usuario } = require('../models');

const incluirTodo = [
  { model: Objeto, as: 'objeto', attributes: ['nombre'] },
  { model: Usuario, as: 'solicitante', attributes: ['nombre'] },
  { model: Usuario, as: 'propietario', attributes: ['nombre'] }
];

const formatear = (s) => ({
  ...s.toJSON(),
  objetoNombre: s.objeto.nombre,
  solicitanteNombre: s.solicitante.nombre,
  propietarioNombre: s.propietario.nombre
});

// GET /api/solicitudes
router.get('/', async (req, res) => {
  const solicitudes = await Solicitud.findAll({ include: incluirTodo, order: [['id', 'ASC']] });
  res.json(solicitudes.map(formatear));
});

// POST /api/solicitudes  (crear, nace pendiente)
router.post('/', async (req, res) => {
  try {
    const { objetoId, solicitanteId, propietarioId, fechaInicio, fechaFin } = req.body;
    const solicitud = await Solicitud.create({
      objetoId, solicitanteId, propietarioId, fechaInicio, fechaFin
    });
    res.status(201).json(solicitud);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// PUT /api/solicitudes/:id/cancelar  (solo si está pendiente)
router.put('/:id/cancelar', async (req, res) => {
  const solicitud = await Solicitud.findByPk(req.params.id);
  if (!solicitud) return res.status(404).json({ error: 'Solicitud no encontrada' });
  if (solicitud.estado !== 'pendiente') {
    return res.status(400).json({ error: 'Solo se pueden cancelar solicitudes pendientes' });
  }
  await solicitud.update({ estado: 'cancelada' });
  res.json(solicitud);
});

// PUT /api/solicitudes/:id/aprobar  (con validación de conflicto de fechas)
router.put('/:id/aprobar', async (req, res) => {
  const solicitud = await Solicitud.findByPk(req.params.id);
  if (!solicitud) return res.status(404).json({ error: 'Solicitud no encontrada' });

  const conflicto = await Solicitud.findOne({
    where: {
      objetoId: solicitud.objetoId,
      estado: 'aprobada',
      id: { [Op.ne]: solicitud.id },
      fechaInicio: { [Op.lte]: solicitud.fechaFin },
      fechaFin: { [Op.gte]: solicitud.fechaInicio }
    }
  });
  if (conflicto) {
    return res.status(400).json({ error: 'Ya existe un préstamo aprobado en esas fechas' });
  }

  await solicitud.update({ estado: 'aprobada' });
  res.json(solicitud);
});

// PUT /api/solicitudes/:id/rechazar
router.put('/:id/rechazar', async (req, res) => {
  const solicitud = await Solicitud.findByPk(req.params.id);
  if (!solicitud) return res.status(404).json({ error: 'Solicitud no encontrada' });
  await solicitud.update({ estado: 'rechazada' });
  res.json(solicitud);
});

module.exports = router;