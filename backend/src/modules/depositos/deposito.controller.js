const {
  listarTiposDeposito,
  listarPedidosParaDeposito,
  obtenerPedidoParaDeposito,
  obtenerSaldoPorMoneda,
  crearDeposito
} = require('./deposito.model');

const fechaActual = () => {
  return new Date().toISOString().slice(0, 10);
};

const obtenerTiposDeposito = async (req, res) => {
  try {
    const tipos = await listarTiposDeposito();

    res.json({
      mensaje: 'Tipos de depósito obtenidos correctamente',
      tipos
    });

  } catch (error) {
    console.error('Error listar tipos de depósito:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al listar tipos de depósito'
    });
  }
};

const obtenerPedidosParaDeposito = async (req, res) => {
  try {
    const {
      cliente_id,
      q,
      page = 1,
      limit = 10
    } = req.query;

    const resultado = await listarPedidosParaDeposito({
      cliente_id: cliente_id ? Number(cliente_id) : null,
      q: q || null,
      page: Number(page),
      limit: Number(limit)
    });

    res.json({
      mensaje: 'Pedidos para depósito obtenidos correctamente',
      pedidos: resultado.pedidos,
      paginacion: resultado.paginacion
    });

  } catch (error) {
    console.error('Error listar pedidos para depósito:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al listar pedidos para depósito'
    });
  }
};

const obtenerPedidoDeposito = async (req, res) => {
  try {
    const { pedido_id } = req.params;

    const pedido = await obtenerPedidoParaDeposito(pedido_id);

    if (!pedido) {
      return res.status(404).json({
        mensaje: 'Pedido no encontrado'
      });
    }

    res.json({
      mensaje: 'Pedido para depósito obtenido correctamente',
      pedido
    });

  } catch (error) {
    console.error('Error obtener pedido para depósito:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al obtener pedido para depósito'
    });
  }
};

const registrarDeposito = async (req, res) => {
  try {
    let {
      pedido_id,
      tipo_deposito_id,
      fecha_deposito,
      monto,
      moneda_codigo,
      numero_operacion,
      observacion
    } = req.body;

    if (!pedido_id) {
      return res.status(400).json({
        mensaje: 'El pedido es obligatorio'
      });
    }

    if (!tipo_deposito_id) {
      return res.status(400).json({
        mensaje: 'El tipo de depósito es obligatorio'
      });
    }

    if (!monto || Number(monto) <= 0) {
      return res.status(400).json({
        mensaje: 'El monto debe ser mayor a 0'
      });
    }

    if (!moneda_codigo) {
      return res.status(400).json({
        mensaje: 'La moneda es obligatoria'
      });
    }

    moneda_codigo = moneda_codigo.toUpperCase();

    if (!['PEN', 'USD'].includes(moneda_codigo)) {
      return res.status(400).json({
        mensaje: 'La moneda debe ser PEN o USD'
      });
    }

    fecha_deposito = fecha_deposito || fechaActual();

    numero_operacion = numero_operacion
      ? numero_operacion.trim()
      : null;

    observacion = observacion
      ? observacion.trim()
      : null;

    const saldo = await obtenerSaldoPorMoneda({
      pedido_id,
      moneda_codigo
    });

    if (!saldo) {
      return res.status(400).json({
        mensaje: `El pedido no tiene monto registrado en moneda ${moneda_codigo}`
      });
    }

    if (Number(monto) > Number(saldo.saldo_pendiente)) {
      return res.status(400).json({
        mensaje: `El monto excede el saldo pendiente. Saldo disponible: ${saldo.saldo_pendiente} ${moneda_codigo}`
      });
    }

    const deposito = await crearDeposito({
      pedido_id,
      tipo_deposito_id,
      fecha_deposito,
      monto,
      moneda_codigo,
      numero_operacion,
      observacion,
      created_by_usuario_id: req.usuario.usuario_id
    });

    res.status(201).json({
      mensaje: 'Depósito registrado correctamente',
      deposito
    });

  } catch (error) {
    console.error('Error registrar depósito:', error.message);

    res.status(500).json({
      mensaje: 'Error interno al registrar depósito'
    });
  }
};

module.exports = {
  obtenerTiposDeposito,
  obtenerPedidosParaDeposito,
  obtenerPedidoDeposito,
  registrarDeposito
};