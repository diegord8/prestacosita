const router = require('express').Router();
const { Objeto, Usuario } = require('../models');

// GET /api/objetos  (todos, con el nombre del dueño incluido)
router.get('/', async (req, res) => {
  const objetos = await Objeto.findAll({
    include: { model: Usuario, as: 'usuario', attributes: ['nombre'] },
    order: [['id', 'ASC']]
  });
  res.json(objetos.map((o) => ({
    ...o.toJSON(),
    rating: Number(o.rating),
    usuarioNombre: o.usuario.nombre
  })));
});

// POST /api/objetos  (publicar)
router.post('/', async (req, res) => {
  try {
    const { nombre, descripcion, categoria, imagen, usuarioId } = req.body;
    const objeto = await Objeto.create({ nombre, descripcion, categoria, imagen, usuarioId });
    res.status(201).json(objeto);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// PUT /api/objetos/:id  (editar)
router.put('/:id', async (req, res) => {
  try {
    const objeto = await Objeto.findByPk(req.params.id);
    if (!objeto) return res.status(404).json({ error: 'Objeto no encontrado' });
    await objeto.update(req.body);
    res.json(objeto);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// DELETE /api/objetos/:id
router.delete('/:id', async (req, res) => {
  const objeto = await Objeto.findByPk(req.params.id);
  if (!objeto) return res.status(404).json({ error: 'Objeto no encontrado' });
  await objeto.destroy();
  res.json({ mensaje: 'Objeto eliminado' });
});

module.exports = router;