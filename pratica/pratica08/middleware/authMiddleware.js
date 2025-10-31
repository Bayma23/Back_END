const jwt = require('jsonwebtoken');

function gerarToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 120 });
}

function verificarToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ msg: 'Não autorizado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch {
    return res.status(401).json({ msg: 'Token inválido' });
  }
}

module.exports = { gerarToken, verificarToken };
