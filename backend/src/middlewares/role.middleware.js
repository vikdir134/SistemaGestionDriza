const permitirRoles = (...rolesPermitidos) => {
  return (req, res, next) => {
    const rolesUsuario = req.usuario?.roles || [];

    const tienePermiso = rolesUsuario.some((rol) =>
      rolesPermitidos.includes(rol)
    );

    if (!tienePermiso) {
      return res.status(403).json({
        mensaje: 'No tienes permisos para realizar esta acción'
      });
    }

    next();
  };
};

module.exports = {
  permitirRoles
};