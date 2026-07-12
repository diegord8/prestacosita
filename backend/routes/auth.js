const router = require('express').Router();
const { Usuario } = require('../models');

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const existe = await Usuario.findOne({ where: { email } });
    if (existe) {
      return res.status(400).json({ error: 'Ya existe una cuenta con ese email' });
    }
    const usuario = await Usuario.create({ nombre, email, password });
    res.status(201).json({ id: usuario.id, nombre: usuario.nombre, email: usuario.email });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ where: { email, password } });
  if (!usuario) {
    return res.status(401).json({ error: 'Email o contraseña incorrectos' });
  }
  res.json({ id: usuario.id, nombre: usuario.nombre, email: usuario.email });
});

// PUT /api/auth/usuarios/:id  (editar perfil)
router.put('/usuarios/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    await usuario.update(req.body);
    res.json({ id: usuario.id, nombre: usuario.nombre, email: usuario.email });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;