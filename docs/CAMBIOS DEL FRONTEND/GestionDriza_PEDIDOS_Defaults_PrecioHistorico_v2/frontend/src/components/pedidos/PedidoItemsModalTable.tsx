import type {
  TableColumnsType
} from 'antd';

import {
  Alert,
  App as AntdApp,
  Button,
  Card,
  Empty,
  Grid,
  List,
  Modal,
  Space,
  Table,
  Tag,
  Typography
} from 'antd';

import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined
} from '@ant-design/icons';

import {
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';

import {
  apiFetch
} from '../../services/api';

import PedidoItemsEditor, {
  detallePedidoVacio,
  type DetallePedidoForm
} from './PedidoItemsEditor';

import {
  formatCantidad,
  formatMonto
} from '../../utils/formatters';

import '../../styles/pedidosAntd.css';


const {
  Text
} = Typography;


type FeedbackTipo =
  | 'success'
  | 'error'
  | 'info'
  | 'warning';


type Props = {
  detalles:
    DetallePedidoForm[];

  setDetalles: (
    detalles:
      DetallePedidoForm[]
  ) => void;

  tipos: any[];
  medidas: any[];
  colores: any[];
  materiales: any[];
  unidades: any[];

  clienteId:
    number | null;

  procesando?: boolean;

  onFeedback?: (
    tipo: FeedbackTipo,
    mensaje: string
  ) => void;
};


const clonarDetalle = (
  detalle:
    DetallePedidoForm
): DetallePedidoForm => ({
  ...detalle
});


type PrecioReferencia = {
  precio_unitario: number;
  moneda_codigo: string;
  fecha_precio: string;
};


const normalizarTexto = (
  valor: unknown
) =>
  String(valor || '')
    .trim()
    .toLocaleUpperCase('es-PE');


function PedidoItemsModalTable({
  detalles,
  setDetalles,

  tipos,
  medidas,
  colores,
  materiales,
  unidades,

  clienteId,

  procesando = false,
  onFeedback
}: Props) {
  const screens =
    Grid.useBreakpoint();

  const {
    modal
  } = AntdApp.useApp();

  const [
    abierto,
    setAbierto
  ] = useState(false);

  const [
    detalleModal,
    setDetalleModal
  ] = useState<
    DetallePedidoForm | null
  >(null);

  const [
    indiceEditando,
    setIndiceEditando
  ] = useState<
    number | null
  >(null);


  const [
    consultandoPrecio,
    setConsultandoPrecio
  ] = useState(false);

  const [
    precioReferencia,
    setPrecioReferencia
  ] = useState<
    PrecioReferencia | null
  >(null);

  const [
    sinPrecioHistorico,
    setSinPrecioHistorico
  ] = useState(false);

  const ultimaClavePrecioRef =
    useRef<string | null>(null);

  const solicitudPrecioRef =
    useRef(0);


  const buscarIdNombre = (
    items: any[],
    nombre: string
  ) => {
    const esperado =
      normalizarTexto(nombre);

    const exacto =
      items.find(
        (item) =>
          normalizarTexto(
            item.nombre
          ) === esperado
      );

    const aproximado =
      exacto ||
      items.find(
        (item) =>
          normalizarTexto(
            item.nombre
          ).includes(
            esperado
          )
      );

    return aproximado
      ? String(
          aproximado.id
        )
      : '';
  };


  const buscarIdUnidad = (
    codigo: string
  ) => {
    const esperada =
      normalizarTexto(codigo);

    const unidad =
      unidades.find(
        (item) =>
          normalizarTexto(
            item.codigo
          ) === esperada
      );

    return unidad
      ? String(
          unidad
            .unidad_medida_id
        )
      : '';
  };


  const crearDetallePredeterminado =
    (): DetallePedidoForm => {
      const unidadKg =
        buscarIdUnidad('KG');

      return {
        ...detallePedidoVacio,

        tipo_producto_id:
          buscarIdNombre(
            tipos,
            'DRIZA'
          ),

        material_id:
          buscarIdNombre(
            materiales,
            'POLIPROPILENO'
          ),

        color_id:
          buscarIdNombre(
            colores,
            'BLANCO'
          ),

        unidad_medida_id:
          unidadKg,

        unidad_presentacion_id:
          unidadKg
      };
    };


  const crearClavePrecio = (
    detalle:
      DetallePedidoForm | null,
    clienteActual =
      clienteId
  ) => {
    if (
      !clienteActual ||
      !detalle ||
      !detalle.tipo_producto_id ||
      !detalle.medida_id ||
      !detalle.color_id ||
      !detalle.material_id
    ) {
      return null;
    }

    return [
      clienteActual,
      detalle.tipo_producto_id,
      detalle.medida_id,
      detalle.color_id,
      detalle.material_id
    ].join('|');
  };


  const buscarNombre = (
    items: any[],
    id: string
  ) => {
    if (!id) {
      return '-';
    }

    return (
      items.find(
        (item) =>
          String(item.id) ===
          String(id)
      )?.nombre ||
      '-'
    );
  };


  const buscarUnidad = (
    id: string
  ) => {
    if (!id) {
      return '-';
    }

    return (
      unidades.find(
        (item) =>
          String(
            item.unidad_medida_id
          ) ===
          String(id)
      )?.codigo ||
      '-'
    );
  };


  const descripcionProducto = (
    detalle:
      DetallePedidoForm
  ) => {
    return [
      buscarNombre(
        tipos,
        detalle.tipo_producto_id
      ),
      buscarNombre(
        materiales,
        detalle.material_id
      ),
      buscarNombre(
        medidas,
        detalle.medida_id
      ),
      buscarNombre(
        colores,
        detalle.color_id
      )
    ]
      .filter(
        (valor) =>
          valor &&
          valor !== '-'
      )
      .join(' · ') ||
      'Producto pendiente';
  };


  const validarDetalle = (
    item:
      DetallePedidoForm
  ) => {
    if (
      !item.tipo_producto_id ||
      !item.medida_id ||
      !item.color_id ||
      !item.material_id
    ) {
      return (
        'Selecciona tipo, medida, color y material'
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
        'La cantidad total debe ser mayor a 0'
      );
    }

    if (
      !item.unidad_medida_id
    ) {
      return (
        'Selecciona la unidad del producto'
      );
    }

    if (
      item.cantidad_presentacion !==
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
          'La presentación debe ser mayor a 0'
        );
      }

      if (
        !item
          .unidad_presentacion_id
      ) {
        return (
          'El producto debe tener una unidad de presentación'
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
        'El precio unitario debe ser mayor a 0'
      );
    }

    if (
      ![
        'PEN',
        'USD'
      ].includes(
        item.moneda_codigo
      )
    ) {
      return (
        'Selecciona una moneda válida'
      );
    }

    return null;
  };


  const abrirNuevo = () => {
    if (procesando) {
      return;
    }

    if (!clienteId) {
      onFeedback?.(
        'warning',
        'Selecciona primero un cliente para poder recuperar su último precio'
      );
      return;
    }

    ultimaClavePrecioRef.current =
      null;

    solicitudPrecioRef.current +=
      1;

    setConsultandoPrecio(false);
    setPrecioReferencia(null);
    setSinPrecioHistorico(false);

    setIndiceEditando(
      null
    );

    setDetalleModal(
      crearDetallePredeterminado()
    );

    setAbierto(true);
  };


  const abrirEdicion = (
    index: number
  ) => {
    if (procesando) {
      return;
    }

    const detalle =
      clonarDetalle(
        detalles[index]
      );

    ultimaClavePrecioRef.current =
      crearClavePrecio(
        detalle
      );

    solicitudPrecioRef.current +=
      1;

    setConsultandoPrecio(false);
    setPrecioReferencia(null);
    setSinPrecioHistorico(false);

    setIndiceEditando(
      index
    );

    setDetalleModal(
      detalle
    );

    setAbierto(true);
  };


  const cerrarModal = () => {
    if (procesando) {
      return;
    }

    solicitudPrecioRef.current +=
      1;

    setAbierto(false);
    setDetalleModal(null);
    setIndiceEditando(null);
    setConsultandoPrecio(false);
    setPrecioReferencia(null);
    setSinPrecioHistorico(false);
    ultimaClavePrecioRef.current =
      null;
  };


  useEffect(() => {
    if (
      !abierto ||
      !detalleModal ||
      !clienteId
    ) {
      return;
    }

    const clave =
      crearClavePrecio(
        detalleModal
      );

    if (!clave) {
      setConsultandoPrecio(false);
      setPrecioReferencia(null);
      setSinPrecioHistorico(false);
      ultimaClavePrecioRef.current =
        null;
      return;
    }

    if (
      ultimaClavePrecioRef.current ===
      clave
    ) {
      return;
    }

    ultimaClavePrecioRef.current =
      clave;

    const solicitud =
      ++solicitudPrecioRef.current;

    setConsultandoPrecio(true);
    setPrecioReferencia(null);
    setSinPrecioHistorico(false);

    setDetalleModal(
      (actual) => {
        if (
          !actual ||
          crearClavePrecio(
            actual
          ) !== clave
        ) {
          return actual;
        }

        return {
          ...actual,
          precio_unitario: '',
          moneda_codigo: 'PEN'
        };
      }
    );

    const params =
      new URLSearchParams({
        cliente_id:
          String(clienteId),
        tipo_producto_id:
          detalleModal
            .tipo_producto_id,
        medida_id:
          detalleModal.medida_id,
        color_id:
          detalleModal.color_id,
        material_id:
          detalleModal.material_id
      });

    apiFetch(
      `/clientes/precios/ultimo?${params.toString()}`
    )
      .then((data) => {
        if (
          solicitud !==
          solicitudPrecioRef.current
        ) {
          return;
        }

        const precio =
          data.precio;

        if (!precio) {
          setPrecioReferencia(null);
          setSinPrecioHistorico(true);
          return;
        }

        const referencia:
          PrecioReferencia = {
          precio_unitario:
            Number(
              precio.precio_unitario
            ),
          moneda_codigo:
            String(
              precio.moneda_codigo
            ).toUpperCase(),
          fecha_precio:
            String(
              precio.fecha_precio
            )
        };

        setDetalleModal(
          (actual) => {
            if (
              !actual ||
              crearClavePrecio(
                actual
              ) !== clave
            ) {
              return actual;
            }

            return {
              ...actual,
              precio_unitario:
                String(
                  referencia
                    .precio_unitario
                ),
              moneda_codigo:
                referencia
                  .moneda_codigo
            };
          }
        );

        setPrecioReferencia(
          referencia
        );
        setSinPrecioHistorico(false);
      })
      .catch((error) => {
        if (
          solicitud !==
          solicitudPrecioRef.current
        ) {
          return;
        }

        setPrecioReferencia(null);
        setSinPrecioHistorico(false);

        onFeedback?.(
          'warning',
          error instanceof Error
            ? error.message
            : 'No se pudo consultar el último precio del cliente'
        );
      })
      .finally(() => {
        if (
          solicitud ===
          solicitudPrecioRef.current
        ) {
          setConsultandoPrecio(false);
        }
      });
  }, [
    abierto,
    clienteId,
    detalleModal?.tipo_producto_id,
    detalleModal?.medida_id,
    detalleModal?.color_id,
    detalleModal?.material_id
  ]);


  /*
   * El aviso del precio histórico es informativo.
   * El precio ya queda copiado en el formulario, por lo que
   * podemos ocultar el mensaje después de unos segundos sin
   * perder ningún dato ni alterar el valor autocompletado.
   */
  useEffect(() => {
    if (
      !abierto ||
      consultandoPrecio ||
      (
        !precioReferencia &&
        !sinPrecioHistorico
      )
    ) {
      return;
    }

    const temporizador =
      window.setTimeout(
        () => {
          setPrecioReferencia(null);
          setSinPrecioHistorico(false);
        },
        4500
      );

    return () =>
      window.clearTimeout(
        temporizador
      );
  }, [
    abierto,
    consultandoPrecio,
    precioReferencia,
    sinPrecioHistorico
  ]);


  const guardarModal = () => {
    if (
      procesando ||
      !detalleModal
    ) {
      return;
    }

    const error =
      validarDetalle(
        detalleModal
      );

    if (error) {
      onFeedback?.(
        'error',
        error
      );

      return;
    }

    if (
      indiceEditando ===
      null
    ) {
      setDetalles([
        ...detalles,
        clonarDetalle(
          detalleModal
        )
      ]);

      onFeedback?.(
        'success',
        'Producto agregado al pedido'
      );

    } else {
      setDetalles(
        detalles.map(
          (
            item,
            index
          ) =>
            index ===
            indiceEditando
              ? clonarDetalle(
                  detalleModal
                )
              : item
        )
      );

      onFeedback?.(
        'success',
        'Producto actualizado'
      );
    }

    solicitudPrecioRef.current +=
      1;

    setAbierto(false);
    setDetalleModal(null);
    setIndiceEditando(null);
    setConsultandoPrecio(false);
    setPrecioReferencia(null);
    setSinPrecioHistorico(false);
    ultimaClavePrecioRef.current =
      null;
  };


  const quitar = (
    index: number
  ) => {
    if (procesando) {
      return;
    }

    const detalle =
      detalles[index];

    modal.confirm({
      title:
        'Quitar producto',

      content:
        `¿Deseas quitar ${descripcionProducto(detalle)} del pedido?`,

      okText:
        'Quitar',

      cancelText:
        'Cancelar',

      okButtonProps: {
        danger: true,
        icon:
          <DeleteOutlined />
      },

      onOk: () => {
        setDetalles(
          detalles.filter(
            (
              _,
              i
            ) =>
              i !== index
          )
        );

        onFeedback?.(
          'success',
          'Producto quitado del pedido'
        );
      }
    });
  };


  const totalesMoneda =
    useMemo(
      () => {
        const totales:
          Record<
            string,
            number
          > = {};

        for (
          const detalle
          of detalles
        ) {
          const moneda =
            detalle
              .moneda_codigo ||
            'PEN';

          const subtotal =
            Number(
              detalle
                .cantidad_pedida ||
              0
            ) *
            Number(
              detalle
                .precio_unitario ||
              0
            );

          totales[moneda] =
            (
              totales[moneda] ||
              0
            ) +
            subtotal;
        }

        return totales;
      },
      [
        detalles
      ]
    );


  const columns:
    TableColumnsType<
      DetallePedidoForm
    > = [
    {
      title: 'Producto',
      key: 'producto',
      minWidth: 260,

      render: (
        _,
        detalle,
        index
      ) => (
        <div className="gd-pedido-draft-product-cell">
          <Text strong>
            {descripcionProducto(detalle)}
          </Text>

          <Text
            type="secondary"
          >
            Producto {index + 1}
          </Text>
        </div>
      )
    },

    {
      title: 'Cantidad',
      key: 'cantidad',
      width: 145,

      render: (
        _,
        detalle
      ) => (
        <Text>
          {
            formatCantidad(
              Number(
                detalle
                  .cantidad_pedida ||
                0
              )
            )
          } {
            buscarUnidad(
              detalle
                .unidad_medida_id
            )
          }
        </Text>
      )
    },

    {
      title: 'Presentación',
      key: 'presentacion',
      width: 155,

      render: (
        _,
        detalle
      ) =>
        detalle
          .cantidad_presentacion
          ? (
              <Text>
                {
                  formatCantidad(
                    Number(
                      detalle
                        .cantidad_presentacion
                    )
                  )
                } {
                  buscarUnidad(
                    detalle
                      .unidad_presentacion_id ||
                    detalle
                      .unidad_medida_id
                  )
                }
              </Text>
            )
          : (
              <Text
                type="secondary"
              >
                Sin presentación
              </Text>
            )
    },

    {
      title: 'Precio',
      key: 'precio',
      width: 140,

      render: (
        _,
        detalle
      ) => (
        <Space
          size={6}
        >
          <Text>
            {
              formatMonto(
                Number(
                  detalle
                    .precio_unitario ||
                  0
                )
              )
            }
          </Text>

          <Tag>
            {
              detalle
                .moneda_codigo
            }
          </Tag>
        </Space>
      )
    },

    {
      title: 'Subtotal',
      key: 'subtotal',
      width: 150,

      render: (
        _,
        detalle
      ) => (
        <Text strong>
          {
            formatMonto(
              Number(
                detalle
                  .cantidad_pedida ||
                0
              ) *
              Number(
                detalle
                  .precio_unitario ||
                0
              )
            )
          } {
            detalle
              .moneda_codigo
          }
        </Text>
      )
    },

    {
      title: 'Acciones',
      key: 'acciones',
      width: 160,
      fixed: 'right',

      render: (
        _,
        __,
        index
      ) => (
        <Space
          size={4}
        >
          <Button
            type="text"
            icon={
              <EditOutlined />
            }
            disabled={
              procesando
            }
            onClick={() =>
              abrirEdicion(
                index
              )
            }
          >
            Editar
          </Button>

          <Button
            type="text"
            danger
            icon={
              <DeleteOutlined />
            }
            disabled={
              procesando
            }
            onClick={() =>
              quitar(
                index
              )
            }
          />
        </Space>
      )
    }
  ];


  const esMovil =
    !screens.md;


  return (
    <>
      <Card
        title="Productos del pedido"
        extra={
          <Button
            type="primary"
            icon={
              <PlusOutlined />
            }
            disabled={
              procesando
            }
            onClick={
              abrirNuevo
            }
          >
            Agregar producto
          </Button>
        }
        className="gd-pedido-products-card gd-pedido-draft-card"
      >

        {
          detalles.length === 0
            ? (
                <Empty
                  image={
                    Empty
                      .PRESENTED_IMAGE_SIMPLE
                  }
                  description="Aún no agregaste productos al pedido"
                >
                  <Button
                    type="primary"
                    ghost
                    icon={
                      <PlusOutlined />
                    }
                    disabled={
                      procesando
                    }
                    onClick={
                      abrirNuevo
                    }
                  >
                    Agregar primer producto
                  </Button>
                </Empty>
              )
            : esMovil
              ? (
                  <List
                    className="gd-pedido-mobile-list"
                    dataSource={
                      detalles
                    }
                    renderItem={(
                      detalle,
                      index
                    ) => {
                      const subtotal =
                        Number(
                          detalle
                            .cantidad_pedida ||
                          0
                        ) *
                        Number(
                          detalle
                            .precio_unitario ||
                          0
                        );

                      return (
                        <List.Item>
                          <Card
                            size="small"
                            className="gd-pedido-mobile-item"
                          >
                            <div className="gd-pedido-mobile-item-head">
                              <div className="gd-pedido-mobile-product">
                                <Text strong>
                                  Producto {index + 1}
                                </Text>

                                <Text>
                                  {
                                    descripcionProducto(
                                      detalle
                                    )
                                  }
                                </Text>
                              </div>

                              <Tag>
                                {
                                  detalle
                                    .moneda_codigo
                                }
                              </Tag>
                            </div>

                            <div className="gd-pedido-mobile-grid">
                              <div>
                                <Text
                                  type="secondary"
                                >
                                  Cantidad
                                </Text>

                                <Text strong>
                                  {
                                    formatCantidad(
                                      Number(
                                        detalle
                                          .cantidad_pedida ||
                                        0
                                      )
                                    )
                                  } {
                                    buscarUnidad(
                                      detalle
                                        .unidad_medida_id
                                    )
                                  }
                                </Text>
                              </div>

                              <div>
                                <Text
                                  type="secondary"
                                >
                                  Presentación
                                </Text>

                                <Text strong>
                                  {
                                    detalle
                                      .cantidad_presentacion
                                      ? `${formatCantidad(Number(detalle.cantidad_presentacion))} ${buscarUnidad(detalle.unidad_presentacion_id || detalle.unidad_medida_id)}`
                                      : '-'
                                  }
                                </Text>
                              </div>

                              <div>
                                <Text
                                  type="secondary"
                                >
                                  Precio
                                </Text>

                                <Text strong>
                                  {
                                    formatMonto(
                                      Number(
                                        detalle
                                          .precio_unitario ||
                                        0
                                      )
                                    )
                                  } {
                                    detalle
                                      .moneda_codigo
                                  }
                                </Text>
                              </div>

                              <div>
                                <Text
                                  type="secondary"
                                >
                                  Subtotal
                                </Text>

                                <Text strong>
                                  {
                                    formatMonto(
                                      subtotal
                                    )
                                  } {
                                    detalle
                                      .moneda_codigo
                                  }
                                </Text>
                              </div>
                            </div>

                            <div className="gd-pedido-mobile-actions">
                              <Button
                                icon={
                                  <EditOutlined />
                                }
                                disabled={
                                  procesando
                                }
                                onClick={() =>
                                  abrirEdicion(
                                    index
                                  )
                                }
                              >
                                Editar
                              </Button>

                              <Button
                                danger
                                icon={
                                  <DeleteOutlined />
                                }
                                disabled={
                                  procesando
                                }
                                onClick={() =>
                                  quitar(
                                    index
                                  )
                                }
                              >
                                Quitar
                              </Button>
                            </div>
                          </Card>
                        </List.Item>
                      );
                    }}
                  />
                )
              : (
                  <Table<DetallePedidoForm>
                    rowKey={(
                      _,
                      index
                    ) =>
                      String(
                        index
                      )
                    }
                    columns={
                      columns
                    }
                    dataSource={
                      detalles
                    }
                    pagination={false}
                    scroll={{
                      x: 1050
                    }}
                    className="gd-pedido-draft-table"
                  />
                )
        }


        {
          detalles.length > 0 &&
          (
            <div className="gd-pedido-draft-summary">
              <Text
                type="secondary"
              >
                {
                  detalles.length
                } producto(s) preparado(s)
              </Text>

              <Space
                wrap
                size={8}
              >
                {
                  Object.entries(
                    totalesMoneda
                  ).map(
                    ([
                      moneda,
                      total
                    ]) => (
                      <Tag
                        key={
                          moneda
                        }
                      >
                        Total {moneda}: {
                          formatMonto(
                            total
                          )
                        }
                      </Tag>
                    )
                  )
                }
              </Space>
            </div>
          )
        }

      </Card>


      <Modal
        open={abierto}
        title={
          indiceEditando ===
          null
            ? 'Agregar producto al pedido'
            : `Editar producto ${indiceEditando + 1}`
        }
        width={
          screens.md
            ? 980
            : 'calc(100vw - 24px)'
        }
        centered
        maskClosable={false}
        keyboard={
          !procesando
        }
        closable={
          !procesando
        }
        onCancel={
          cerrarModal
        }
        styles={{
          body: {
            maxHeight:
              screens.md
                ? '72vh'
                : '76vh',
            overflowY:
              'auto',
            paddingRight: 4
          }
        }}
        footer={
          <Space
            className="gd-pedido-modal-footer"
          >
            <Button
              disabled={
                procesando
              }
              onClick={
                cerrarModal
              }
            >
              Cancelar
            </Button>

            <Button
              type="primary"
              disabled={
                procesando ||
                !detalleModal
              }
              onClick={
                guardarModal
              }
            >
              {
                indiceEditando ===
                null
                  ? 'Agregar producto'
                  : 'Guardar cambios'
              }
            </Button>
          </Space>
        }
        className="gd-pedido-product-modal"
      >

        {
          consultandoPrecio &&
          (
            <Alert
              type="info"
              showIcon
              message="Buscando el último precio de este producto para el cliente"
              className="gd-pedido-price-reference"
            />
          )
        }

        {
          !consultandoPrecio &&
          precioReferencia &&
          (
            <Alert
              type="success"
              showIcon
              message={
                `Precio más reciente: ${formatMonto(precioReferencia.precio_unitario)} ${precioReferencia.moneda_codigo}`
              }
              description={
                `Se completó automáticamente con el precio del ${precioReferencia.fecha_precio.slice(0, 10)}. Puedes modificarlo si este pedido tendrá otro precio.`
              }
              className="gd-pedido-price-reference"
            />
          )
        }

        {
          !consultandoPrecio &&
          sinPrecioHistorico &&
          (
            <Alert
              type="warning"
              showIcon
              message="Este cliente no tiene un precio anterior para este producto"
              description="Ingresa el precio manualmente. Al registrar el pedido quedará guardado en el historial del cliente."
              className="gd-pedido-price-reference"
            />
          )
        }

        {
          detalleModal &&
          (
            <PedidoItemsEditor
              detalles={[
                detalleModal
              ]}
              setDetalles={(
                nuevos
              ) => {
                if (
                  nuevos[0]
                ) {
                  setDetalleModal(
                    clonarDetalle(
                      nuevos[0]
                    )
                  );
                }
              }}
              tipos={tipos}
              medidas={medidas}
              colores={colores}
              materiales={
                materiales
              }
              unidades={
                unidades
              }
              titulo="Datos del producto"
              permitirAgregar={false}
              permitirQuitar={false}
              procesando={
                procesando
              }
            />
          )
        }

      </Modal>
    </>
  );
}


export default PedidoItemsModalTable;
