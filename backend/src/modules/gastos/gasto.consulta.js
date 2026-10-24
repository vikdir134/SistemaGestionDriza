// El mismo conjunto filtrado alimenta el detalle, los totales y las categorías.
const GASTOS_SQL = `
WITH GastosFiltrados AS (
  SELECT g.*, tg.nombre AS tipo_gasto,
    p.razon_social AS proveedor, p.ruc AS proveedor_ruc,
    creador.nombre_completo AS registrado_por,
    actualizador.nombre_completo AS actualizado_por
  FROM finance.Gasto g
  JOIN finance.TipoGasto tg ON g.tipo_gasto_id = tg.tipo_gasto_id
  LEFT JOIN compras.Proveedor p ON g.proveedor_id = p.proveedor_id
  JOIN auth.Usuario creador ON g.created_by_usuario_id = creador.usuario_id
  LEFT JOIN auth.Usuario actualizador ON g.updated_by_usuario_id = actualizador.usuario_id
  WHERE g.activo = 1
    AND (@inicio IS NULL OR g.fecha_gasto >= @inicio)
    AND (@fin IS NULL OR g.fecha_gasto < @fin)
    AND (@tipo_gasto_id IS NULL OR g.tipo_gasto_id = @tipo_gasto_id)
    AND (@proveedor_id IS NULL OR g.proveedor_id = @proveedor_id)
    AND (@moneda_codigo IS NULL OR g.moneda_codigo = @moneda_codigo)
    AND (@q IS NULL OR tg.nombre LIKE @q OR p.razon_social LIKE @q
      OR p.ruc LIKE @q OR g.descripcion LIKE @q OR g.comprobante LIKE @q)
)
SELECT
  ISNULL((SELECT * FROM GastosFiltrados
    ORDER BY fecha_gasto DESC, created_at DESC, gasto_id DESC
    OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY
    FOR JSON PATH), '[]') AS gastos_json,
  (SELECT COUNT(*) FROM GastosFiltrados) AS total,
  ISNULL((SELECT moneda_codigo, COUNT(*) AS cantidad, SUM(monto) AS total
    FROM GastosFiltrados GROUP BY moneda_codigo ORDER BY moneda_codigo
    FOR JSON PATH), '[]') AS resumen_json,
  ISNULL((SELECT tipo_gasto_id, tipo_gasto, moneda_codigo, COUNT(*) AS cantidad, SUM(monto) AS total
    FROM GastosFiltrados GROUP BY tipo_gasto_id, tipo_gasto, moneda_codigo
    ORDER BY moneda_codigo, SUM(monto) DESC, tipo_gasto
    FOR JSON PATH), '[]') AS categorias_json;
`;

function limitesMes(mes) {
  if (!mes) return { inicio: null, fin: null };
  if (typeof mes !== 'string' || !/^[1-9]\d{3}-(0[1-9]|1[0-2])$/.test(mes) || mes > '9998-12') {
    throw new Error('El mes debe tener el formato AAAA-MM y ser válido.');
  }
  const [year, month] = mes.split('-').map(Number);
  return {
    inicio: new Date(Date.UTC(year, month - 1, 1)),
    fin: new Date(Date.UTC(year, month, 1))
  };
}

module.exports = { GASTOS_SQL, limitesMes };
