const {
  sql
} = require('../../config/db');


const crearErrorNegocio = (
  mensaje,
  statusCode = 400
) => {
  const error =
    new Error(
      mensaje
    );

  error.statusCode =
    statusCode;

  return error;
};


/*
 * Resuelve la combinación comercial del pedido
 * contra el catálogo real de Productos terminados.
 *
 * Identidad:
 * Tipo + Material + Medida + Color
 */
const resolverProductoPedido = async ({
  transaction,
  tipo_producto_id,
  material_id,
  medida_id,
  color_id
}) => {
  const result =
    await new sql.Request(
      transaction
    )
      .input(
        'tipo_producto_id',
        sql.Int,
        tipo_producto_id
      )
      .input(
        'material_id',
        sql.Int,
        material_id
      )
      .input(
        'medida_id',
        sql.Int,
        medida_id
      )
      .input(
        'color_id',
        sql.Int,
        color_id
      )
      .query(`
        SELECT TOP (2)
          producto_id

        FROM catalog.Producto

        WHERE
          activo = 1

          AND tipo_producto_id =
              @tipo_producto_id

          AND material_id =
              @material_id

          AND medida_id =
              @medida_id

          AND color_id =
              @color_id

        ORDER BY
          producto_id ASC;
      `);


  if (
    result.recordset.length === 0
  ) {
    throw crearErrorNegocio(
      'La combinación seleccionada no existe en Productos terminados. Registra primero el producto correspondiente.',
      409
    );
  }


  if (
    result.recordset.length > 1
  ) {
    throw crearErrorNegocio(
      'Existe más de un producto activo con la misma combinación. Revisa el catálogo de Productos terminados.',
      409
    );
  }


  return Number(
    result.recordset[0]
      .producto_id
  );
};


module.exports = {
  resolverProductoPedido
};
