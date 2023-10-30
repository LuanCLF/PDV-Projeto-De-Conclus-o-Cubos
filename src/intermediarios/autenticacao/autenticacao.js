const jwt = require("jsonwebtoken");
const { obterUsuarioId } = require("../../provedor/usuarioQuerys/queryFuncoes");

const hash = process.env.SENHA_JWT;

const autenticacao = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      mensagem: "Não autorizado",
    });
  }

  const token = authorization.replace("Bearer ", "").trim();

  let id;
  try {
    const { id: idUsuario } = jwt.verify(token, hash);
    id = idUsuario;
  } catch (error) {
    return res.status(401).json({
      mensagem: "Usuario não autenticado",
    });
  }
  const usuarioExiste = await obterUsuarioId(id);

  if (!usuarioExiste) {
    return res.status(404).json({
      mensagem: "Usuario não encontrado",
    });
  }

  const { senha: _, ...usuario } = usuarioExiste;

  req.usuario = usuario;

  next();
};

module.exports = autenticacao;
