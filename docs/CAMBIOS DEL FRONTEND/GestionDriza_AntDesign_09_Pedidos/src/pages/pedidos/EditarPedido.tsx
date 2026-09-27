import {
  App as AntdApp,
  Alert,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Result,
  Row,
  Select,
  Skeleton,
  Space
} from 'antd';

import {
  SaveOutlined
} from '@ant-design/icons';

import dayjs, {
  Dayjs
} from 'dayjs';

import {
  useCallback,
  useEffect,
  useState
} from 'react';

import {
  useNavigate,
  useParams
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import {
  useBloqueoAccion
} from '../../hooks/useBloqueoAccion';

import PedidoItemsEditor, {
  detallePedidoVacio,
  type DetallePedidoForm
} from '../../components/pedidos/PedidoItemsEditor';

import BackButton
  from '../../components/ui/BackButton';

import PageHeader
  from '../../components/ui/PageHeader';

import {
  formatCantidad
} from '../../utils/formatters';

import '../../styles/pedidosAntd.css';


const {
  TextArea
} = Input;


const convertirDetalleExistente = (
  detalle: any
): DetallePedidoForm => ({
  pedido_detalle_id:
    Number(
      detalle
        .pedido_detalle_id
    ),

  cantidad_entregada:
    Number(
      detalle
        .cantidad_entregada ||
      0
    ),

  cantidad_pendiente:
    Number(
      detalle
        .cantidad_pendiente ||
      0
    ),

  estado_entrega:
    detalle
      .estado_entrega ||
    'PENDIENTE',

  unidad:
    detalle.unidad ||
    '',

  tipo_producto_id:
    detalle.tipo_producto_id
      ? String(
          detalle
            .tipo_producto_id
        )
      : '',

  medida_id:
    detalle.medida_id
      ? String(
          detalle
            .medida_id
        )
      : '',

  color_id:
    detalle.color_id
      ? String(
          detalle
            .color_id
        )
      : '',

  material_id:
    detalle.material_id
      ? String(
          detalle
            .material_id
        )
      : '',

  cantidad_pedida:
    detalle.cantidad_pedida !==
      null &&
    detalle.cantidad_pedida !==
      undefined
      ? String(
          detalle
            .cantidad_pedida
        )
      : '',

  unidad_medida_id:
    detalle.unidad_medida_id
      ? String(
          detalle
            .unidad_medida_id
        )
      : '',

  cantidad_presentacion:
    detalle
      .cantidad_presentacion !==
      null &&
    detalle
      .cantidad_presentacion !==
      undefined
      ? String(
          detalle
            .cantidad_presentacion
        )
      : '',

  unidad_presentacion_id:
    detalle
      .unidad_presentacion_id
      ? String(
          detalle
            .unidad_presentacion_id
        )
      : '',

  precio_unitario:
    detalle.precio_unitario !==
      null &&
    detalle.precio_unitario !==
      undefined
      ? String(
          detalle
            .precio_unitario
        )
      : '',

  moneda_codigo:
    detalle
      .moneda_codigo ||
    'PEN',

  descripcion_item:
    detalle
      .descripcion_item ||
    '',

  observacion:
    detalle.observacion ||
    ''
});


const detalleNuevoTieneDatos = (
  item:
    DetallePedidoForm
) =>
  Boolean(
    item.tipo_producto_id ||
    item.medida_id ||
    item.color_id ||
    item.material_id ||
    item.cantidad_pedida ||
    item.unidad_medida_id ||
    item.cantidad_presentacion ||
    item.precio_unitario ||
    item.descripcion_item
      .trim() ||
    item.observacion
      .trim()
  );


const validarDetalle = (
  item:
    DetallePedidoForm,

  nombre:
    string,

  validarCantidadEntregada =
    false
) => {
  if (
    !item.tipo_producto_id ||
    !item.medida_id ||
    !item.color_id ||
    !item.material_id
  ) {
    return (
      `${nombre} debe tener tipo, medida, color y material`
    );
  }

  const cantidad =
    Number(
      item.cantidad_pedida
    );

  if (
    !Number.isFinite(
      cantidad
    ) ||
    cantidad <= 0
  ) {
    return (
      `${nombre} debe tener una cantidad mayor a 0`
    );
  }

  if (
    validarCantidadEntregada
  ) {
    const entregada =
      Number(
        item
          .cantidad_entregada ||
        0
      );

    if (
      cantidad <
      entregada
    ) {
      return (
        `${nombre} no puede tener una cantidad menor a lo ya entregado (${formatCantidad(entregada)} ${item.unidad || ''})`
      );
    }
  }

  if (
    !item.unidad_medida_id
  ) {
    return (
      `${nombre} debe tener una unidad de medida`
    );
  }

  if (
    item
      .cantidad_presentacion !==
    ''
  ) {
    const presentacion =
      Number(
        item
          .cantidad_presentacion
      );

    if (
      !Number.isFinite(
        presentacion
      ) ||
      presentacion <= 0
    ) {
      return (
        `${nombre} debe tener una presentación mayor a 0`
      );
    }

    if (
      !item
        .unidad_presentacion_id
    ) {
      return (
        `${nombre} debe tener una unidad de presentación`
      );
    }
  }

  const precio =
    Number(
      item.precio_unitario
    );

  if (
    !Number.isFinite(
      precio
    ) ||
    precio <= 0
  ) {
    return (
      `${nombre} debe tener un precio mayor a 0`
    );
  }

  if (
    ![
      'PEN',
      'USD'
    ].includes(
      item
        .moneda_codigo
    )
  ) {
    return (
      `${nombre} debe tener una moneda válida`
    );
  }

  return null;
};


const convertirDetalleApi = (
  item:
    DetallePedidoForm,

  incluirId =
    false
) => ({
  ...(incluirId
    ? {
        pedido_detalle_id:
          Number(
            item
              .pedido_detalle_id
          )
      }
    : {}
  ),

  tipo_producto_id:
    Number(
      item
        .tipo_producto_id
    ),

  medida_id:
    Number(
      item.medida_id
    ),

  color_id:
    Number(
      item.color_id
    ),

  material_id:
    Number(
      item.material_id
    ),

  cantidad_pedida:
    Number(
      item
        .cantidad_pedida
    ),

  unidad_medida_id:
    Number(
      item
        .unidad_medida_id
    ),

  cantidad_presentacion:
    item
      .cantidad_presentacion
      ? Number(
          item
            .cantidad_presentacion
        )
      : null,

  unidad_presentacion_id:
    item
      .cantidad_presentacion &&
    item
      .unidad_presentacion_id
      ? Number(
          item
            .unidad_presentacion_id
        )
      : null,

  precio_unitario:
    Number(
      item.precio_unitario
    ),

  moneda_codigo:
    item.moneda_codigo,

  descripcion_item:
    item
      .descripcion_item
      .trim(),

  observacion:
    item.observacion
      .trim()
});


function EditarPedido() {
  const {
    pedido_id
  } = useParams();

  const navigate =
    useNavigate();

  const {
    message,
    modal
  } = AntdApp.useApp();

  const [
    pedido,
    setPedido
  ] = useState<any | null>(
    null
  );

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    errorCarga,
    setErrorCarga
  ] = useState('');

  const [
    clientes,
    setClientes
  ] = useState<any[]>([]);

  const [
    tipos,
    setTipos
  ] = useState<any[]>([]);

  const [
    medidas,
    setMedidas
  ] = useState<any[]>([]);

  const [
    colores,
    setColores
  ] = useState<any[]>([]);

  const [
    materiales,
    setMateriales
  ] = useState<any[]>([]);

  const [
    unidades,
    setUnidades
  ] = useState<any[]>([]);

  const [
    clienteId,
    setClienteId
  ] = useState<
    number | null
  >(null);

  const [
    codigoPedido,
    setCodigoPedido
  ] = useState('');

  const [
    fechaPedido,
    setFechaPedido
  ] = useState<
    Dayjs | null
  >(null);

  const [
    fechaEntrega,
    setFechaEntrega
  ] = useState<
    Dayjs | null
  >(null);

  const [
    descripcion,
    setDescripcion
  ] = useState('');

  const [
    motivoCambio,
    setMotivoCambio
  ] = useState('');

  const [
    detallesEditados,
    setDetallesEditados
  ] = useState<
    DetallePedidoForm[]
  >([]);

  const [
    nuevosDetalles,
    setNuevosDetalles
  ] = useState<
    DetallePedidoForm[]
  >([
    {
      ...detallePedidoVacio
    }
  ]);

  const {
    procesando,
    intentarBloquear,
    liberar
  } = useBloqueoAccion();


  const cargarDatos =
    useCallback(
      async () => {
        if (!pedido_id) {
          throw new Error(
            'Pedido no válido'
          );
        }

        const [
          pedidoData,
          clientesData,
          tiposData,
          medidasData,
          coloresData,
          materialesData,
          unidadesData
        ] = await Promise.all([
          apiFetch(
            `/pedidos/${pedido_id}`
          ),

          apiFetch(
            '/clientes/select'
          ),

          apiFetch(
            '/catalogos/tiposProducto'
          ),

          apiFetch(
            '/catalogos/medidas'
          ),

          apiFetch(
            '/catalogos/colores'
          ),

          apiFetch(
            '/catalogos/materiales'
          ),

          apiFetch(
            '/catalogos/unidades-medida'
          )
        ]);


        const actual =
          pedidoData.pedido;

        if (!actual) {
          throw new Error(
            'Pedido no encontrado'
          );
        }

        setPedido(
          actual
        );

        setClientes(
          clientesData.clientes ||
          []
        );

        setTipos(
          tiposData.items ||
          []
        );

        setMedidas(
          medidasData.items ||
          []
        );

        setColores(
          coloresData.items ||
          []
        );

        setMateriales(
          materialesData.items ||
          []
        );

        setUnidades(
          unidadesData.unidades ||
          []
        );

        setClienteId(
          Number(
            actual.cliente_id
          )
        );

        setCodigoPedido(
          actual
            .codigo_pedido ||
          ''
        );

        setFechaPedido(
          actual.fecha_pedido
            ? dayjs(
                actual
                  .fecha_pedido
              )
            : null
        );

        setFechaEntrega(
          actual
            .fecha_entrega_estimada
            ? dayjs(
                actual
                  .fecha_entrega_estimada
              )
            : null
        );

        setDescripcion(
          actual
            .descripcion_pedido ||
          ''
        );

        setMotivoCambio('');

        setDetallesEditados(
          (
            actual.detalles ||
            []
          ).map(
            convertirDetalleExistente
          )
        );

        setNuevosDetalles([
          {
            ...detallePedidoVacio
          }
        ]);
      },
      [
        pedido_id
      ]
    );


  useEffect(() => {
    const iniciar =
      async () => {
        setCargando(true);
        setErrorCarga('');

        try {
          await cargarDatos();

        } catch (error) {
          const mensaje =
            error instanceof Error
              ? error.message
              : 'No se pudo cargar el pedido';

          setErrorCarga(
            mensaje
          );

          message.error(
            mensaje
          );

        } finally {
          setCargando(false);
        }
      };

    iniciar();
  }, [
    cargarDatos,
    message
  ]);


  const validar = () => {
    if (
      pedido
        ?.estado_pedido ===
      'ENTREGADO'
    ) {
      return (
        'Un pedido completamente entregado ya no puede editarse'
      );
    }

    if (
      pedido
        ?.estado_pedido ===
      'CANCELADO'
    ) {
      return (
        'Un pedido cancelado no puede editarse'
      );
    }

    if (!clienteId) {
      return (
        'Debes seleccionar un cliente'
      );
    }

    if (!fechaPedido) {
      return (
        'Debes ingresar la fecha del pedido'
      );
    }

    if (
      !motivoCambio
        .trim()
    ) {
      return (
        'Debes ingresar el motivo del cambio'
      );
    }

    if (
      detallesEditados
        .length ===
      0
    ) {
      return (
        'El pedido debe tener al menos un producto'
      );
    }

    for (
      let index = 0;
      index <
      detallesEditados.length;
      index++
    ) {
      const item =
        detallesEditados[index];

      if (
        !item
          .pedido_detalle_id
      ) {
        return (
          `El producto registrado ${index + 1} no tiene un identificador válido`
        );
      }

      const error =
        validarDetalle(
          item,
          `El producto registrado ${index + 1}`,
          true
        );

      if (error) {
        return error;
      }
    }

    const nuevosValidos =
      nuevosDetalles.filter(
        detalleNuevoTieneDatos
      );

    for (
      let index = 0;
      index <
      nuevosValidos.length;
      index++
    ) {
      const error =
        validarDetalle(
          nuevosValidos[index],
          `El nuevo producto ${index + 1}`,
          false
        );

      if (error) {
        return error;
      }
    }

    return null;
  };


  const confirmar = async () => {
    const error =
      validar();

    if (error) {
      message.error(
        error
      );
      return;
    }

    modal.confirm({
      title:
        'Confirmar edición del pedido',

      content:
        'Se actualizarán los datos del pedido y sus productos. Las cantidades no pueden quedar por debajo de lo ya entregado y el cambio quedará registrado en el historial.',

      okText:
        'Actualizar pedido',

      cancelText:
        'Cancelar',

      onOk:
        actualizar
    });
  };


  const actualizar =
    async () => {
      if (
        !intentarBloquear()
      ) {
        return;
      }

      const error =
        validar();

      if (error) {
        liberar();

        message.error(
          error
        );

        return;
      }

      try {
        const nuevosValidos =
          nuevosDetalles.filter(
            detalleNuevoTieneDatos
          );

        await apiFetch(
          `/pedidos/${pedido_id}`,
          {
            method: 'PUT',

            body:
              JSON.stringify({
                cliente_id:
                  clienteId,

                codigo_pedido:
                  codigoPedido
                    .trim() ||
                  null,

                descripcion_pedido:
                  descripcion
                    .trim(),

                fecha_pedido:
                  fechaPedido!
                    .format(
                      'YYYY-MM-DD'
                    ),

                fecha_entrega_estimada:
                  fechaEntrega
                    ? fechaEntrega
                        .format(
                          'YYYY-MM-DD'
                        )
                    : null,

                motivo_cambio:
                  motivoCambio
                    .trim(),

                detalles_editados:
                  detallesEditados.map(
                    (item) =>
                      convertirDetalleApi(
                        item,
                        true
                      )
                  ),

                nuevos_detalles:
                  nuevosValidos.map(
                    (item) =>
                      convertirDetalleApi(
                        item,
                        false
                      )
                  )
              })
          }
        );


        message.success(
          'Pedido actualizado correctamente'
        );


        navigate(
          `/gestion/pedidos/${pedido_id}`,
          {
            replace: true
          }
        );

      } catch (error) {
        liberar();

        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudo actualizar el pedido'
        );

        throw error;
      }
    };


  const feedbackEditor = (
    tipo:
      'success' |
      'error' |
      'info' |
      'warning',

    mensaje: string
  ) => {
    message.open({
      type:
        tipo === 'warning'
          ? 'warning'
          : tipo,

      content:
        mensaje
    });
  };


  if (
    cargando
  ) {
    return (
      <div className="gd-pedido-page">

        <Skeleton
          active
          paragraph={{
            rows: 14
          }}
        />

      </div>
    );
  }


  if (
    errorCarga ||
    !pedido
  ) {
    return (
      <div className="gd-pedido-page">

        <BackButton
          to="/gestion/pedidos"
          label="Volver a pedidos"
        />


        <Result
          status="error"
          title="No se pudo cargar el pedido"
          subTitle={
            errorCarga ||
            'Pedido no encontrado'
          }
        />

      </div>
    );
  }


  if (
    pedido.estado_pedido ===
    'ENTREGADO'
  ) {
    return (
      <div className="gd-pedido-page">

        <BackButton
          to={
            `/gestion/pedidos/${pedido_id}`
          }
          label="Volver al detalle"
        />


        <Result
          status="success"
          title="Pedido completamente entregado"
          subTitle="Por seguridad ya no puede modificarse."
          extra={
            <Button
              type="primary"
              onClick={() =>
                navigate(
                  `/gestion/pedidos/${pedido_id}`
                )
              }
            >
              Ver detalle
            </Button>
          }
        />

      </div>
    );
  }


  if (
    pedido.estado_pedido ===
    'CANCELADO'
  ) {
    return (
      <div className="gd-pedido-page">

        <BackButton
          to={
            `/gestion/pedidos/${pedido_id}`
          }
          label="Volver al detalle"
        />


        <Result
          status="warning"
          title="Pedido cancelado"
          subTitle="Un pedido cancelado no puede modificarse."
        />

      </div>
    );
  }


  return (
    <div className="gd-pedido-page">

      <BackButton
        to={
          `/gestion/pedidos/${pedido_id}`
        }
        label="Volver al detalle"
      />


      <PageHeader
        title="Editar pedido"
        description="Modifica los datos del pedido, sus productos registrados o agrega productos nuevos."
      />


      <Card
        title="Datos del pedido"
        className="gd-pedido-section-card"
      >

        <Form
          layout="vertical"
          requiredMark={false}
        >

          <Row
            gutter={[
              16,
              0
            ]}
          >

            <Col
              xs={24}
              lg={12}
            >
              <Form.Item
                label="Cliente"
                required
              >
                <Select
                  size="large"
                  value={
                    clienteId ||
                    undefined
                  }
                  showSearch
                  optionFilterProp="label"
                  disabled={
                    procesando
                  }
                  options={
                    clientes.map(
                      (cliente) => ({
                        value:
                          cliente
                            .cliente_id,

                        label:
                          `${cliente.razon_social} · ${cliente.ruc}`
                      })
                    )
                  }
                  onChange={
                    setClienteId
                  }
                />
              </Form.Item>
            </Col>


            <Col
              xs={24}
              lg={12}
            >
              <Form.Item
                label="Código de pedido"
              >
                <Input
                  size="large"
                  value={
                    codigoPedido
                  }
                  maxLength={50}
                  disabled={
                    procesando
                  }
                  onChange={(e) =>
                    setCodigoPedido(
                      e.target.value
                    )
                  }
                />
              </Form.Item>
            </Col>


            <Col
              xs={24}
              md={12}
            >
              <Form.Item
                label="Fecha de pedido"
                required
              >
                <DatePicker
                  size="large"
                  value={
                    fechaPedido
                  }
                  format="YYYY-MM-DD"
                  className="gd-full-width"
                  disabled={
                    procesando
                  }
                  onChange={
                    setFechaPedido
                  }
                />
              </Form.Item>
            </Col>


            <Col
              xs={24}
              md={12}
            >
              <Form.Item
                label="Fecha de entrega estimada"
              >
                <DatePicker
                  size="large"
                  value={
                    fechaEntrega
                  }
                  format="YYYY-MM-DD"
                  className="gd-full-width"
                  disabled={
                    procesando
                  }
                  onChange={
                    setFechaEntrega
                  }
                />
              </Form.Item>
            </Col>


            <Col
              xs={24}
            >
              <Form.Item
                label="Descripción del pedido"
              >
                <TextArea
                  rows={3}
                  maxLength={500}
                  showCount
                  value={
                    descripcion
                  }
                  disabled={
                    procesando
                  }
                  onChange={(e) =>
                    setDescripcion(
                      e.target.value
                    )
                  }
                />
              </Form.Item>
            </Col>

          </Row>

        </Form>

      </Card>


      <PedidoItemsEditor
        detalles={
          detallesEditados
        }
        setDetalles={
          setDetallesEditados
        }
        tipos={tipos}
        medidas={medidas}
        colores={colores}
        materiales={
          materiales
        }
        unidades={
          unidades
        }
        titulo="Editar productos registrados"
        permitirAgregar={
          false
        }
        permitirQuitar={
          false
        }
        bloquearEstructuraConEntrega
        mostrarResumenEntrega
        procesando={
          procesando
        }
        onFeedback={
          feedbackEditor
        }
      />


      <PedidoItemsEditor
        detalles={
          nuevosDetalles
        }
        setDetalles={
          setNuevosDetalles
        }
        tipos={tipos}
        medidas={medidas}
        colores={colores}
        materiales={
          materiales
        }
        unidades={
          unidades
        }
        titulo="Agregar productos"
        textoBotonAgregar="Agregar otro producto"
        permitirAgregar
        permitirQuitar
        procesando={
          procesando
        }
        onFeedback={
          feedbackEditor
        }
      />


      <Card
        title="Motivo del cambio"
        className="gd-pedido-section-card"
      >

        <Alert
          type="info"
          showIcon
          message="El motivo quedará registrado en el historial del pedido."
          className="gd-pedido-inline-alert"
        />


        <Form
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            label="Motivo"
            required
          >
            <TextArea
              rows={3}
              maxLength={500}
              showCount
              value={
                motivoCambio
              }
              placeholder="Ejemplo: El cliente solicitó modificar la cantidad y el precio acordado."
              disabled={
                procesando
              }
              onChange={(e) =>
                setMotivoCambio(
                  e.target.value
                )
              }
            />
          </Form.Item>
        </Form>

      </Card>


      <div className="gd-pedido-actions">

        <Space
          wrap
        >

          <Button
            onClick={() =>
              navigate(
                `/gestion/pedidos/${pedido_id}`
              )
            }
            disabled={
              procesando
            }
          >
            Cancelar
          </Button>


          <Button
            type="primary"
            icon={
              <SaveOutlined />
            }
            loading={
              procesando
            }
            onClick={
              confirmar
            }
          >
            Actualizar pedido
          </Button>

        </Space>

      </div>

    </div>
  );
}


export default EditarPedido;
