import type {
  TableColumnsType
} from 'antd';

import {
  App as AntdApp,
  Alert,
  Button,
  Card,
  Col,
  DatePicker,
  Descriptions,
  Empty,
  Form,
  Input,
  InputNumber,
  Result,
  Row,
  Skeleton,
  Space,
  Statistic,
  Table,
  Tag,
  Typography
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
  useMemo,
  useState
} from 'react';

import {
  useParams
} from 'react-router-dom';

import {
  apiFetch
} from '../services/api';

import {
  useBloqueoAccion
} from '../hooks/useBloqueoAccion';

import BackButton
  from '../components/ui/BackButton';

import PageHeader
  from '../components/ui/PageHeader';

import {
  formatCantidad
} from '../utils/formatters';

import '../styles/entregasAntd.css';


const {
  Text
} = Typography;

const {
  TextArea
} = Input;


type EstadoItem =
  | 'PENDIENTE'
  | 'PARCIAL'
  | 'COMPLETO';


type EstadoStock =
  | 'CON_STOCK'
  | 'SIN_STOCK'
  | 'SIN_PRESENTACION'
  | 'SIN_PRODUCTO';


type DetalleEntrega = {
  pedido_detalle_id: number;

  producto_id?: number | null;

  tipo_producto: string;
  material: string;
  medida: string;
  color: string;

  descripcion_item?: string | null;

  cantidad_pedida: number;
  cantidad_entregada: number;
  cantidad_pendiente: number;

  unidad_medida_id: number;
  unidad: string;

  estado_item:
    EstadoItem;

  cantidad_presentacion?:
    number | null;

  unidad_presentacion_id?:
    number | null;

  unidad_presentacion?:
    string | null;

  stock_disponible: number;

  presentaciones_disponibles?:
    number | null;

  estado_stock:
    EstadoStock;

  cantidad_entregada_input:
    number | null;

  observacion_entrega:
    string;
};


type HistorialDetalle = {
  entrega_detalle_id: number;
  cantidad_entregada: number;
  observacion?: string | null;
  producto: string;
  unidad: string;
  cantidad_presentacion?:
    number | null;
  unidad_presentacion?:
    string | null;
};


type HistorialEntrega = {
  entrega_id: number;
  fecha_entrega: string;
  created_at?: string | null;
  comentario_entrega?: string | null;
  registrado_por: string;
  detalles:
    HistorialDetalle[];
};


type PedidoEntrega = {
  pedido_id: number;
  codigo_pedido?: string | null;
  descripcion_pedido?: string | null;

  fecha_pedido: string;
  fecha_entrega_estimada?: string | null;
  estado_pedido: string;

  cliente_id: number;
  razon_social: string;
  ruc: string;
  direccion?: string | null;

  estado_entrega_general:
    EstadoItem;

  detalles:
    DetalleEntrega[];

  historial_entregas:
    HistorialEntrega[];
};


const nuevaKey = () => {
  if (
    typeof crypto !==
      'undefined' &&
    typeof crypto.randomUUID ===
      'function'
  ) {
    return crypto.randomUUID();
  }

  return [
    'entrega',
    Date.now(),
    Math.random()
      .toString(36)
      .slice(2)
  ].join('-');
};


const estadoItemTag = (
  estado: string
) => {
  if (
    estado === 'COMPLETO'
  ) {
    return (
      <Tag color="success">
        Completo
      </Tag>
    );
  }

  if (
    estado === 'PARCIAL'
  ) {
    return (
      <Tag color="warning">
        Parcial
      </Tag>
    );
  }

  return (
    <Tag color="processing">
      Pendiente
    </Tag>
  );
};


const estadoStockTag = (
  estado: EstadoStock
) => {
  if (
    estado === 'CON_STOCK'
  ) {
    return (
      <Tag color="success">
        Stock disponible
      </Tag>
    );
  }

  if (
    estado === 'SIN_STOCK'
  ) {
    return (
      <Tag color="error">
        Sin stock
      </Tag>
    );
  }

  if (
    estado === 'SIN_PRESENTACION'
  ) {
    return (
      <Tag color="warning">
        Sin presentación
      </Tag>
    );
  }

  return (
    <Tag color="error">
      Producto no configurado
    </Tag>
  );
};


const estadoStockTexto = (
  estado: EstadoStock
) => {
  if (
    estado === 'CON_STOCK'
  ) {
    return 'stock disponible';
  }

  if (
    estado === 'SIN_STOCK'
  ) {
    return 'sin stock';
  }

  if (
    estado === 'SIN_PRESENTACION'
  ) {
    return 'presentación no configurada';
  }

  return 'producto no configurado';
};


function EntregaPedidoDetalle() {
  const {
    pedido_id
  } = useParams();

  const {
    message,
    modal
  } = AntdApp.useApp();

  const [
    pedido,
    setPedido
  ] = useState<
    PedidoEntrega | null
  >(null);

  const [
    detallesEntrega,
    setDetallesEntrega
  ] = useState<
    DetalleEntrega[]
  >([]);

  const [
    fechaEntrega,
    setFechaEntrega
  ] = useState<
    Dayjs | null
  >(
    dayjs()
  );

  const [
    comentarioEntrega,
    setComentarioEntrega
  ] = useState('');

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    errorCarga,
    setErrorCarga
  ] = useState('');

  const [
    idempotencyKey,
    setIdempotencyKey
  ] = useState(
    nuevaKey
  );

  const {
    procesando:
      registrandoEntrega,

    intentarBloquear:
      bloquearEntrega,

    liberar:
      liberarEntrega
  } = useBloqueoAccion();


  const cargarPedido =
    useCallback(
      async () => {
        const data =
          await apiFetch(
            `/entregas/pedidos/${pedido_id}`
          );

        const pedidoApi:
          PedidoEntrega =
          data.pedido;

        setPedido(
          pedidoApi
        );

        setDetallesEntrega(
          pedidoApi.detalles.map(
            (item) => ({
              ...item,

              cantidad_entregada_input:
                null,

              observacion_entrega:
                ''
            })
          )
        );
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
          await cargarPedido();

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
    cargarPedido,
    message
  ]);


  const cantidadMaximaEntregable = (
    detalle:
      DetalleEntrega
  ) => {
    const pendiente =
      Number(
        detalle
          .cantidad_pendiente ||
        0
      );

    const stock =
      Number(
        detalle
          .stock_disponible ||
        0
      );

    const presentacion =
      Number(
        detalle
          .cantidad_presentacion ||
        0
      );

    if (
      presentacion <= 0
    ) {
      return 0;
    }

    const limite =
      Math.min(
        pendiente,
        stock
      );

    const unidades =
      Math.floor(
        (
          limite +
          0.000001
        ) /
        presentacion
      );

    return Number(
      (
        unidades *
        presentacion
      ).toFixed(3)
    );
  };


  const actualizarDetalle = (
    index: number,
    cambios:
      Partial<
        DetalleEntrega
      >
  ) => {
    if (
      registrandoEntrega
    ) {
      return;
    }

    setDetallesEntrega(
      (actuales) =>
        actuales.map(
          (
            item,
            i
          ) =>
            i === index
              ? {
                  ...item,
                  ...cambios
                }
              : item
        )
    );
  };


  const validarDetalle = (
    detalle:
      DetalleEntrega,
    index: number
  ) => {
    const valor =
      Number(
        detalle
          .cantidad_entregada_input ||
        0
      );

    if (
      valor <= 0
    ) {
      return null;
    }

    if (
      detalle.estado_item ===
      'COMPLETO'
    ) {
      return (
        `El producto ${index + 1} ya fue entregado completamente`
      );
    }

    if (
      detalle.estado_stock !==
      'CON_STOCK'
    ) {
      return (
        `El producto ${index + 1} no está disponible para entrega: ${estadoStockTexto(detalle.estado_stock)}`
      );
    }

    const pendiente =
      Number(
        detalle
          .cantidad_pendiente ||
        0
      );

    const stock =
      Number(
        detalle
          .stock_disponible ||
        0
      );

    const presentacion =
      Number(
        detalle
          .cantidad_presentacion ||
        0
      );

    if (
      valor >
      pendiente +
      0.000001
    ) {
      return (
        `El producto ${index + 1} solo tiene ${formatCantidad(pendiente)} ${detalle.unidad} pendientes`
      );
    }

    if (
      valor >
      stock +
      0.000001
    ) {
      return (
        `El producto ${index + 1} solo tiene ${formatCantidad(stock)} ${detalle.unidad} disponibles en almacén`
      );
    }

    if (
      presentacion <= 0
    ) {
      return (
        `El producto ${index + 1} no tiene presentación configurada`
      );
    }

    /*
     * Conservamos escala 1000 para reflejar la regla
     * histórica/backend, aunque el usuario vea e ingrese
     * normalmente 2 decimales.
     */
    const valorMil =
      Math.round(
        valor *
        1000
      );

    const presentacionMil =
      Math.round(
        presentacion *
        1000
      );

    if (
      presentacionMil <= 0 ||
      valorMil %
        presentacionMil !==
        0
    ) {
      return (
        `El producto ${index + 1} debe entregarse en múltiplos de ${formatCantidad(presentacion)} ${detalle.unidad_presentacion || detalle.unidad}`
      );
    }

    return null;
  };


  const detallesARegistrar =
    useMemo(
      () =>
        detallesEntrega.filter(
          (item) =>
            Number(
              item
                .cantidad_entregada_input ||
              0
            ) > 0
        ),
      [
        detallesEntrega
      ]
    );


  const totalesPorUnidad =
    useMemo(
      () => {
        const totales =
          new Map<
            string,
            number
          >();

        for (
          const item
          of detallesARegistrar
        ) {
          const unidad =
            item.unidad ||
            'UNID.';

          totales.set(
            unidad,
            (
              totales.get(
                unidad
              ) || 0
            ) +
            Number(
              item
                .cantidad_entregada_input ||
              0
            )
          );
        }

        return Array.from(
          totales.entries()
        ).map(
          ([
            unidad,
            total
          ]) => ({
            unidad,
            total
          })
        );
      },
      [
        detallesARegistrar
      ]
    );


  const registrarEntrega =
    async () => {
      if (
        !pedido ||
        !bloquearEntrega()
      ) {
        return;
      }

      const detalles =
        detallesARegistrar.map(
          (item) => ({
            pedido_detalle_id:
              item
                .pedido_detalle_id,

            cantidad_entregada:
              Number(
                item
                  .cantidad_entregada_input
              ),

            unidad_medida_id:
              item
                .unidad_medida_id,

            observacion:
              item
                .observacion_entrega
                .trim() ||
              null
          })
        );


      try {
        const data =
          await apiFetch(
            '/entregas',
            {
              method: 'POST',

              headers: {
                'Idempotency-Key':
                  idempotencyKey
              },

              body:
                JSON.stringify({
                  pedido_id:
                    pedido
                      .pedido_id,

                  fecha_entrega:
                    fechaEntrega
                      ? fechaEntrega
                          .format(
                            'YYYY-MM-DD'
                          )
                      : undefined,

                  comentario_entrega:
                    comentarioEntrega
                      .trim() ||
                    null,

                  detalles
                })
            }
          );


        if (
          data.reutilizada
        ) {
          message.info(
            'La entrega ya había sido registrada. Se recuperó el registro existente sin descontar stock nuevamente.'
          );

        } else {
          message.success(
            'Entrega registrada correctamente'
          );
        }


        setComentarioEntrega(
          ''
        );

        setFechaEntrega(
          dayjs()
        );

        /*
         * Nueva acción confirmada:
         * a partir de aquí sí corresponde una nueva key.
         */
        setIdempotencyKey(
          nuevaKey()
        );

        await cargarPedido();

        liberarEntrega();

      } catch (error) {
        /*
         * En error conservamos la misma Idempotency-Key
         * para que un retry no duplique la operación.
         */
        liberarEntrega();

        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudo registrar la entrega'
        );

        throw error;
      }
    };


  const solicitarRegistro =
    () => {
      if (!pedido) {
        message.error(
          'No se encontró el pedido'
        );

        return;
      }

      if (
        detallesARegistrar
          .length === 0
      ) {
        message.error(
          'Ingresa al menos una cantidad a entregar'
        );

        return;
      }

      for (
        let i = 0;
        i <
        detallesEntrega.length;
        i++
      ) {
        const error =
          validarDetalle(
            detallesEntrega[i],
            i
          );

        if (error) {
          message.error(
            error
          );

          return;
        }
      }


      const resumen =
        totalesPorUnidad
          .map(
            (item) =>
              `${formatCantidad(item.total)} ${item.unidad}`
          )
          .join(' · ');


      modal.confirm({
        title:
          'Registrar entrega',

        content:
          `Se registrarán ${detallesARegistrar.length} producto(s) por ${resumen}. Se descontará el stock de producto terminado de la presentación indicada en el pedido.`,

        okText:
          'Registrar entrega',

        cancelText:
          'Cancelar',

        okButtonProps: {
          icon:
            <SaveOutlined />
        },

        onOk:
          registrarEntrega
      });
    };


  const historialColumns:
    TableColumnsType<
      HistorialDetalle
    > = [
    {
      title: 'Producto',
      dataIndex:
        'producto',
      key:
        'producto',
      minWidth: 240,

      render: (
        value: string
      ) => (
        <Text strong>
          {value}
        </Text>
      )
    },

    {
      title:
        'Presentación',
      key:
        'presentacion',
      width: 165,

      render: (
        _,
        item
      ) =>
        item
          .cantidad_presentacion
          ? `${formatCantidad(item.cantidad_presentacion)} ${item.unidad_presentacion || ''}`
          : '-'
    },

    {
      title: 'Cantidad',
      key: 'cantidad',
      width: 150,

      render: (
        _,
        item
      ) => (
        <Text strong>
          {
            formatCantidad(
              item
                .cantidad_entregada
            )
          } {
            item.unidad
          }
        </Text>
      )
    },

    {
      title:
        'Observación',
      dataIndex:
        'observacion',
      key:
        'observacion',

      render: (
        value?:
          string | null
      ) =>
        value || '-'
    }
  ];


  const fechaHoraTexto = (
    valor?:
      string | null
  ) => {
    if (!valor) {
      return '-';
    }

    const fecha =
      new Date(
        valor
      );

    if (
      Number.isNaN(
        fecha.getTime()
      )
    ) {
      return valor;
    }

    return fecha.toLocaleString(
      'es-PE'
    );
  };


  if (
    cargando
  ) {
    return (
      <div className="gd-entrega-page">

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
      <div className="gd-entrega-page">

        <BackButton
          to="/gestion/entregas"
          label="Volver a entregas"
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


  return (
    <div className="gd-entrega-page">

      <BackButton
        to="/gestion/entregas"
        label="Volver a entregas"
      />


      <PageHeader
        title={
          pedido.codigo_pedido
            ? `Entrega · ${pedido.codigo_pedido}`
            : 'Registrar entrega'
        }
        description={
          `${pedido.razon_social} · ${pedido.ruc}`
        }
        extra={
          estadoItemTag(
            pedido
              .estado_entrega_general
          )
        }
      />


      <Card
        title="Datos del pedido"
        className="gd-entrega-section-card"
      >

        <Descriptions
          column={{
            xs: 1,
            sm: 2,
            lg: 4
          }}
          items={[
            {
              key: 'cliente',
              label: 'Cliente',
              children:
                pedido
                  .razon_social
            },

            {
              key: 'fecha',
              label: 'Fecha pedido',
              children:
                pedido
                  .fecha_pedido
                  ?.slice(
                    0,
                    10
                  ) ||
                '-'
            },

            {
              key:
                'entrega-estimada',
              label:
                'Entrega estimada',
              children:
                pedido
                  .fecha_entrega_estimada
                  ?.slice(
                    0,
                    10
                  ) ||
                '-'
            },

            {
              key: 'direccion',
              label: 'Dirección',
              children:
                pedido.direccion ||
                '-'
            },

            {
              key: 'descripcion',
              label: 'Descripción',
              span: 4,
              children:
                pedido
                  .descripcion_pedido ||
                'Sin descripción'
            }
          ]}
        />

      </Card>


      <Card
        title="Registrar nueva entrega"
        className="gd-entrega-section-card"
      >

        <Alert
          type="info"
          showIcon
          message="La cantidad entregada debe respetar la presentación solicitada en el pedido."
          description="El sistema valida el pendiente, el stock disponible y los múltiplos de presentación antes de registrar la entrega."
          className="gd-entrega-main-rule"
        />


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
              md={8}
            >

              <Form.Item
                label="Fecha de entrega"
                required
              >
                <DatePicker
                  size="large"
                  value={
                    fechaEntrega
                  }
                  format="YYYY-MM-DD"
                  className="gd-full-width"
                  disabled={
                    registrandoEntrega
                  }
                  onChange={
                    setFechaEntrega
                  }
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              md={16}
            >

              <Form.Item
                label="Comentario de entrega"
              >
                <TextArea
                  rows={3}
                  maxLength={500}
                  showCount
                  value={
                    comentarioEntrega
                  }
                  placeholder="Ejemplo: Primera entrega parcial del pedido"
                  disabled={
                    registrandoEntrega
                  }
                  onChange={(e) =>
                    setComentarioEntrega(
                      e.target.value
                    )
                  }
                />
              </Form.Item>

            </Col>

          </Row>

        </Form>


        <Space
          direction="vertical"
          size={16}
          className="gd-entrega-products-space"
        >

          {
            detallesEntrega.map(
              (
                detalle,
                index
              ) => {
                const estaCompleto =
                  detalle
                    .estado_item ===
                  'COMPLETO';

                const stock =
                  Number(
                    detalle
                      .stock_disponible ||
                    0
                  );

                const presentacion =
                  Number(
                    detalle
                      .cantidad_presentacion ||
                    0
                  );

                const maximo =
                  cantidadMaximaEntregable(
                    detalle
                  );

                const valorActual =
                  Number(
                    detalle
                      .cantidad_entregada_input ||
                    0
                  );

                const errorItem =
                  validarDetalle(
                    detalle,
                    index
                  );

                const puedeEntregar =
                  !estaCompleto &&
                  detalle.estado_stock ===
                    'CON_STOCK' &&
                  maximo > 0;


                return (
                  <Card
                    key={
                      detalle
                        .pedido_detalle_id
                    }
                    size="small"
                    title={
                      <div className="gd-entrega-product-title">

                        <Text strong>
                          {
                            detalle
                              .tipo_producto
                          }
                          {' · '}
                          {
                            detalle.material
                          }
                          {' · '}
                          {
                            detalle.medida
                          }
                          {' · '}
                          {
                            detalle.color
                          }
                        </Text>

                        <Text
                          type="secondary"
                        >
                          {
                            detalle
                              .descripcion_item ||
                            'Sin descripción específica'
                          }
                        </Text>

                      </div>
                    }
                    extra={
                      <Space
                        wrap
                        size={6}
                      >

                        {
                          estadoItemTag(
                            detalle
                              .estado_item
                          )
                        }

                        {
                          !estaCompleto &&
                          estadoStockTag(
                            detalle
                              .estado_stock
                          )
                        }

                      </Space>
                    }
                    className="gd-entrega-product-card"
                  >

                    <Row
                      gutter={[
                        12,
                        12
                      ]}
                      className="gd-entrega-product-summary"
                    >

                      <Col
                        xs={12}
                        md={8}
                        xl={4}
                      >
                        <Card
                          size="small"
                        >
                          <Statistic
                            title="Pedido"
                            value={
                              Number(
                                detalle
                                  .cantidad_pedida
                              )
                            }
                            precision={2}
                            suffix={
                              detalle.unidad
                            }
                          />
                        </Card>
                      </Col>


                      <Col
                        xs={12}
                        md={8}
                        xl={4}
                      >
                        <Card
                          size="small"
                        >
                          <Statistic
                            title="Entregado"
                            value={
                              Number(
                                detalle
                                  .cantidad_entregada
                              )
                            }
                            precision={2}
                            suffix={
                              detalle.unidad
                            }
                          />
                        </Card>
                      </Col>


                      <Col
                        xs={12}
                        md={8}
                        xl={4}
                      >
                        <Card
                          size="small"
                        >
                          <Statistic
                            title="Pendiente"
                            value={
                              Number(
                                detalle
                                  .cantidad_pendiente
                              )
                            }
                            precision={2}
                            suffix={
                              detalle.unidad
                            }
                          />
                        </Card>
                      </Col>


                      <Col
                        xs={12}
                        md={8}
                        xl={4}
                      >
                        <Card
                          size="small"
                        >
                          <Statistic
                            title="Presentación"
                            value={
                              presentacion >
                              0
                                ? presentacion
                                : 0
                            }
                            precision={2}
                            suffix={
                              presentacion >
                              0
                                ? (
                                    detalle
                                      .unidad_presentacion ||
                                    detalle.unidad
                                  )
                                : ''
                            }
                          />
                        </Card>
                      </Col>


                      <Col
                        xs={12}
                        md={8}
                        xl={4}
                      >
                        <Card
                          size="small"
                        >
                          <Statistic
                            title="Stock disponible"
                            value={
                              stock
                            }
                            precision={2}
                            suffix={
                              detalle.unidad
                            }
                          />
                        </Card>
                      </Col>


                      <Col
                        xs={12}
                        md={8}
                        xl={4}
                      >
                        <Card
                          size="small"
                        >
                          <Statistic
                            title="Presentaciones disponibles"
                            value={
                              Number(
                                detalle
                                  .presentaciones_disponibles ||
                                0
                              )
                            }
                            precision={2}
                          />
                        </Card>
                      </Col>

                    </Row>


                    {
                      estaCompleto
                        ? (
                            <Alert
                              type="success"
                              showIcon
                              message="Este producto ya fue entregado completamente."
                              className="gd-entrega-inline-alert"
                            />
                          )
                        : (
                            <>
                              {
                                detalle.estado_stock ===
                                  'SIN_PRODUCTO' &&
                                (
                                  <Alert
                                    type="error"
                                    showIcon
                                    message="Producto no configurado"
                                    description="Este producto todavía no está configurado en el catálogo de productos terminados."
                                    className="gd-entrega-inline-alert"
                                  />
                                )
                              }


                              {
                                detalle.estado_stock ===
                                  'SIN_PRESENTACION' &&
                                (
                                  <Alert
                                    type="warning"
                                    showIcon
                                    message="Presentación no configurada"
                                    description="El pedido no tiene una presentación válida configurada para este producto."
                                    className="gd-entrega-inline-alert"
                                  />
                                )
                              }


                              {
                                detalle.estado_stock ===
                                  'SIN_STOCK' &&
                                (
                                  <Alert
                                    type="error"
                                    showIcon
                                    message="Sin stock disponible"
                                    description="No existe stock disponible para esta presentación."
                                    className="gd-entrega-inline-alert"
                                  />
                                )
                              }


                              {
                                detalle.estado_stock ===
                                  'CON_STOCK' &&
                                maximo <= 0 &&
                                presentacion > 0 &&
                                (
                                  <Alert
                                    type="warning"
                                    showIcon
                                    message="Stock insuficiente para una presentación completa"
                                    description={
                                      `Hay ${formatCantidad(stock)} ${detalle.unidad} disponibles, pero la entrega debe realizarse en múltiplos de ${formatCantidad(presentacion)} ${detalle.unidad_presentacion || detalle.unidad}.`
                                    }
                                    className="gd-entrega-inline-alert"
                                  />
                                )
                              }


                              {
                                puedeEntregar &&
                                (
                                  <Alert
                                    type="info"
                                    showIcon
                                    message={
                                      `Máximo entregable: ${formatCantidad(maximo)} ${detalle.unidad}`
                                    }
                                    description={
                                      `La cantidad debe ser múltiplo de ${formatCantidad(presentacion)} ${detalle.unidad_presentacion || detalle.unidad}.`
                                    }
                                    className="gd-entrega-inline-alert"
                                  />
                                )
                              }


                              <Form
                                layout="vertical"
                                requiredMark={false}
                              >

                                <Row
                                  gutter={[
                                    14,
                                    0
                                  ]}
                                >

                                  <Col
                                    xs={24}
                                    md={8}
                                  >

                                    <Form.Item
                                      label="Cantidad a entregar"
                                    >
                                      <InputNumber
                                        value={
                                          detalle
                                            .cantidad_entregada_input
                                        }
                                        min={0}
                                        max={
                                          maximo ||
                                          undefined
                                        }
                                        step={
                                          presentacion >
                                          0
                                            ? presentacion
                                            : 0.01
                                        }
                                        precision={2}
                                        addonAfter={
                                          detalle.unidad
                                        }
                                        className="gd-full-width"
                                        placeholder={
                                          puedeEntregar
                                            ? `Máximo ${formatCantidad(maximo)}`
                                            : 'No disponible'
                                        }
                                        disabled={
                                          registrandoEntrega ||
                                          !puedeEntregar
                                        }
                                        onChange={(
                                          value
                                        ) =>
                                          actualizarDetalle(
                                            index,
                                            {
                                              cantidad_entregada_input:
                                                value
                                            }
                                          )
                                        }
                                      />
                                    </Form.Item>

                                  </Col>


                                  <Col
                                    xs={24}
                                    md={16}
                                  >

                                    <Form.Item
                                      label="Observación"
                                    >
                                      <Input
                                        value={
                                          detalle
                                            .observacion_entrega
                                        }
                                        maxLength={300}
                                        placeholder="Opcional"
                                        disabled={
                                          registrandoEntrega ||
                                          !puedeEntregar
                                        }
                                        onChange={(e) =>
                                          actualizarDetalle(
                                            index,
                                            {
                                              observacion_entrega:
                                                e.target
                                                  .value
                                            }
                                          )
                                        }
                                      />
                                    </Form.Item>

                                  </Col>

                                </Row>

                              </Form>


                              {
                                valorActual >
                                  0 &&
                                errorItem &&
                                (
                                  <Alert
                                    type="error"
                                    showIcon
                                    message={
                                      errorItem
                                    }
                                  />
                                )
                              }

                            </>
                          )
                    }

                  </Card>
                );
              }
            )
          }

        </Space>


        <div className="gd-entrega-selection-summary">

          <Card
            size="small"
          >
            <Statistic
              title="Productos seleccionados"
              value={
                detallesARegistrar
                  .length
              }
            />
          </Card>


          {
            totalesPorUnidad.map(
              (item) => (
                <Card
                  size="small"
                  key={
                    item.unidad
                  }
                >
                  <Statistic
                    title={
                      `Total ${item.unidad}`
                    }
                    value={
                      item.total
                    }
                    precision={2}
                    suffix={
                      item.unidad
                    }
                  />
                </Card>
              )
            )
          }

        </div>


        <div className="gd-entrega-actions">

          <Button
            type="primary"
            icon={
              <SaveOutlined />
            }
            loading={
              registrandoEntrega
            }
            disabled={
              detallesARegistrar
                .length === 0
            }
            onClick={
              solicitarRegistro
            }
          >
            Registrar entrega
          </Button>

        </div>

      </Card>


      <Card
        title="Historial de entregas"
        extra={
          <Text
            type="secondary"
          >
            {
              pedido
                .historial_entregas
                .length
            } entrega(s)
          </Text>
        }
        className="gd-entrega-section-card"
      >

        {
          pedido
            .historial_entregas
            .length === 0
            ? (
                <Empty
                  image={
                    Empty
                      .PRESENTED_IMAGE_SIMPLE
                  }
                  description="No hay entregas registradas para este pedido"
                />
              )
            : (
                <Space
                  direction="vertical"
                  size={16}
                  className="gd-entrega-history-space"
                >

                  {
                    pedido
                      .historial_entregas
                      .map(
                        (
                          entrega,
                          index
                        ) => (
                          <Card
                            key={
                              entrega
                                .entrega_id
                            }
                            size="small"
                            title={
                              `Entrega ${pedido.historial_entregas.length - index}`
                            }
                            extra={
                              <Tag>
                                {
                                  entrega
                                    .fecha_entrega
                                    ?.slice(
                                      0,
                                      10
                                    ) ||
                                  '-'
                                }
                              </Tag>
                            }
                            className="gd-entrega-history-card"
                          >

                            <Descriptions
                              column={{
                                xs: 1,
                                sm: 2,
                                lg: 3
                              }}
                              items={[
                                {
                                  key:
                                    'registrado',
                                  label:
                                    'Registrado por',
                                  children:
                                    entrega
                                      .registrado_por
                                },

                                {
                                  key:
                                    'fecha-registro',
                                  label:
                                    'Fecha de registro',
                                  children:
                                    fechaHoraTexto(
                                      entrega
                                        .created_at
                                    )
                                },

                                {
                                  key:
                                    'comentario',
                                  label:
                                    'Comentario',
                                  children:
                                    entrega
                                      .comentario_entrega ||
                                    '-'
                                }
                              ]}
                              className="gd-entrega-history-description"
                            />


                            <Table<
                              HistorialDetalle
                            >
                              rowKey="entrega_detalle_id"
                              columns={
                                historialColumns
                              }
                              dataSource={
                                entrega
                                  .detalles
                              }
                              pagination={
                                false
                              }
                              scroll={{
                                x: 760
                              }}
                            />

                          </Card>
                        )
                      )
                  }

                </Space>
              )
        }

      </Card>

    </div>
  );
}


export default EntregaPedidoDetalle;
