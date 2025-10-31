const express = require('express');
const fs = require('fs');
const path = require('path');
const { gerarToken, verificarToken } = require('../middleware/authMiddleware');

const router = express.Router();
const usuariosPath = path.join(__dirname, '../data/usuarios.json');

router.post('/login', (req, res) => {
  const { usuario, senha } = req.body;
  const usuarios = JSON.parse(fs.readFileSync(usuariosPath, 'utf-8'));
  const user = usuarios.find(u => u.usuario === usuario && u.senha === senha);

  if (!user) return res.status(401).json({ msg: 'Usuário ou senha inválidos' });

  const token = gerarToken({ email: user.usuario });
  return res.status(200).json({ token });
});

router.post('/renovar', verificarToken, (req, res) => {
  const token = gerarToken({ email: req.usuario.email });
  return res.status(200).json({ token });
});

module.exports = router;
