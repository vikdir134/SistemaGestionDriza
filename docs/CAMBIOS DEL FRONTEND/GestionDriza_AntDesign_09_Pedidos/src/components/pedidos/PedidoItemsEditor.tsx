import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Statistic,
  Tag,
  Typography
} from 'antd';

import {
  DeleteOutlined,
  PlusOutlined
} from '@ant-design/icons';

import {
  formatCantidad,
  formatMonto
} from '../../utils/formatters';

import '../../styles/pedidosAntd.css';


const {
  Text
} = Typography;


export type DetallePedidoForm = {
  pedido_detalle_id?: number;

  cantidad_entregada?: number;
  cantidad_pendiente?: number;
  estado_entrega?: string;
  unidad?: string;

  tipo_producto_id: string;
  medida_id: string;
  color_id: string;
  material_id: string;

  cantidad_pedida: string;
  unidad_medida_id: string;

  cantidad_presentacion: string;
  unidad_presentacion_id: string;

  precio_unitario: string;
  moneda_codigo: string;

  descripcion_item: string;
  observacion: string;
};


export const detallePedidoVacio:
  DetallePedidoForm = {
  tipo_producto_id: '',
  medida_id: '',
  color_id: '',
  material_id: '',

  cantidad_pedida: '',
  unidad_medida_id: '',

  cantidad_presentacion: '',
  unidad_presentacion_id: '',

  precio_unitario: '',
  moneda_codigo: 'PEN',

  descripcion_item: '',
  observacion: ''
};


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

  titulo?: string;
  textoBotonAgregar?: string;

  permitirAgregar?: boolean;
  permitirQuitar?: boolean;

  bloquearEstructuraConEntrega?: boolean;
  procesando?: boolean;
  mostrarResumenEntrega?: boolean;

  onFeedback?: (
    tipo: FeedbackTipo,
    mensaje: string
  ) => void;
};


const estadoEntregaTag = (
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
    <Tag color="default">
      Pendiente
    </Tag>
  );
};


function PedidoItemsEditor({
  detalles,
  setDetalles,

  tipos,
  medidas,
  colores,
  materiales,
  unidades,

  titulo =
    'Productos del pedido',

  textoBotonAgregar =
    'Agregar producto',

  permitirAgregar = true,
  permitirQuitar = true,

  bloquearEstructuraConEntrega =
    false,

  procesando = false,

  mostrarResumenEntrega =
    false,

  onFeedback
}: Props) {

  const actualizar = (
    index: number,
    cambios:
      Partial<
        DetallePedidoForm
      >
  ) => {
    if (procesando) {
      return;
    }

    setDetalles(
      detalles.map(
        (
          detalle,
          i
        ) =>
          i === index
            ? {
                ...detalle,
                ...cambios
              }
            : detalle
      )
    );
  };


  const actualizarUnidad = (
    index: number,
    value:
      string | undefined
  ) => {
    const unidad =
      value || '';

    actualizar(
      index,
      {
        unidad_medida_id:
          unidad,

        unidad_presentacion_id:
          unidad
      }
    );
  };


  const agregarDetalle = () => {
    if (
      procesando ||
      !permitirAgregar
    ) {
      return;
    }

    setDetalles([
      ...detalles,
      {
        ...detallePedidoVacio
      }
    ]);

    onFeedback?.(
      'success',
      'Producto agregado al pedido'
    );
  };


  const quitarDetalle = (
    index: number
  ) => {
    if (
      procesando ||
      !permitirQuitar
    ) {
      return;
    }

    if (
      detalles.length === 1
    ) {
      onFeedback?.(
        'warning',
        'Debe existir al menos un producto en el pedido'
      );

      return;
    }

    setDetalles(
      detalles.filter(
        (
          _,
          i
        ) =>
          i !== index
      )
    );
  };


  return (
    <Card
      title={titulo}
      extra={
        permitirAgregar
          ? (
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
                  agregarDetalle
                }
              >
                {
                  textoBotonAgregar
                }
              </Button>
            )
          : undefined
      }
      className="gd-pedido-products-card"
    >

      <Space
        direction="vertical"
        size={16}
        className="gd-pedido-products-space"
      >

        {
          detalles.map(
            (
              detalle,
              index
            ) => {
              const cantidadEntregada =
                Number(
                  detalle
                    .cantidad_entregada ||
                  0
                );

              const cantidadPedida =
                Number(
                  detalle
                    .cantidad_pedida ||
                  0
                );

              const cantidadPendiente =
                Math.max(
                  0,
                  cantidadPedida -
                  cantidadEntregada
                );

              let estadoActual =
                'PENDIENTE';

              if (
                cantidadEntregada > 0 &&
                cantidadPedida > 0 &&
                cantidadEntregada >=
                  cantidadPedida
              ) {
                estadoActual =
                  'COMPLETO';

              } else if (
                cantidadEntregada > 0
              ) {
                estadoActual =
                  'PARCIAL';
              }

              const estructuraBloqueada =
                procesando ||
                (
                  bloquearEstructuraConEntrega &&
                  cantidadEntregada > 0
                );

              const subtotal =
                cantidadPedida *
                Number(
                  detalle
                    .precio_unitario ||
                  0
                );


              return (
                <Card
                  key={
                    detalle
                      .pedido_detalle_id ??
                    index
                  }
                  size="small"
                  title={
                    <Space
                      wrap
                      size={8}
                    >
                      <Text strong>
                        {
                          detalle
                            .pedido_detalle_id
                            ? `Producto registrado ${index + 1}`
                            : `Producto ${index + 1}`
                        }
                      </Text>

                      {
                        mostrarResumenEntrega &&
                        detalle
                          .pedido_detalle_id &&
                        estadoEntregaTag(
                          estadoActual
                        )
                      }
                    </Space>
                  }
                  extra={
                    permitirQuitar
                      ? (
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
                              quitarDetalle(
                                index
                              )
                            }
                          >
                            Quitar
                          </Button>
                        )
                      : undefined
                  }
                  className="gd-pedido-product-item"
                >

                  {
                    mostrarResumenEntrega &&
                    detalle
                      .pedido_detalle_id &&
                    (
                      <Row
                        gutter={[
                          12,
                          12
                        ]}
                        className="gd-pedido-delivery-summary"
                      >

                        <Col
                          xs={24}
                          sm={8}
                        >
                          <Card
                            size="small"
                          >
                            <Statistic
                              title="Pedido actual"
                              value={
                                cantidadPedida
                              }
                              precision={2}
                              suffix={
                                detalle.unidad
                              }
                            />
                          </Card>
                        </Col>


                        <Col
                          xs={24}
                          sm={8}
                        >
                          <Card
                            size="small"
                          >
                            <Statistic
                              title="Ya entregado"
                              value={
                                cantidadEntregada
                              }
                              precision={2}
                              suffix={
                                detalle.unidad
                              }
                            />
                          </Card>
                        </Col>


                        <Col
                          xs={24}
                          sm={8}
                        >
                          <Card
                            size="small"
                          >
                            <Statistic
                              title="Pendiente"
                              value={
                                cantidadPendiente
                              }
                              precision={2}
                              suffix={
                                detalle.unidad
                              }
                            />
                          </Card>
                        </Col>

                      </Row>
                    )
                  }


                  {
                    bloquearEstructuraConEntrega &&
                    cantidadEntregada > 0 &&
                    (
                      <Alert
                        type="warning"
                        showIcon
                        className="gd-pedido-inline-alert"
                        message="Este producto ya tiene entregas."
                        description={
                          `Ya se entregaron ${formatCantidad(cantidadEntregada)} ${detalle.unidad || ''}. Puedes modificar cantidad, presentación, precio, descripción y observación, pero la cantidad no puede quedar por debajo de lo entregado.`
                        }
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
                        sm={12}
                        lg={6}
                      >
                        <Form.Item
                          label="Tipo"
                          required
                        >
                          <Select
                            value={
                              detalle
                                .tipo_producto_id ||
                              undefined
                            }
                            showSearch
                            optionFilterProp="label"
                            placeholder="Selecciona"
                            disabled={
                              estructuraBloqueada
                            }
                            options={
                              tipos.map(
                                (item) => ({
                                  value:
                                    String(
                                      item.id
                                    ),
                                  label:
                                    item.nombre
                                })
                              )
                            }
                            onChange={(
                              value
                            ) =>
                              actualizar(
                                index,
                                {
                                  tipo_producto_id:
                                    value
                                }
                              )
                            }
                          />
                        </Form.Item>
                      </Col>


                      <Col
                        xs={24}
                        sm={12}
                        lg={6}
                      >
                        <Form.Item
                          label="Medida"
                          required
                        >
                          <Select
                            value={
                              detalle
                                .medida_id ||
                              undefined
                            }
                            showSearch
                            optionFilterProp="label"
                            placeholder="Selecciona"
                            disabled={
                              estructuraBloqueada
                            }
                            options={
                              medidas.map(
                                (item) => ({
                                  value:
                                    String(
                                      item.id
                                    ),
                                  label:
                                    item.nombre
                                })
                              )
                            }
                            onChange={(
                              value
                            ) =>
                              actualizar(
                                index,
                                {
                                  medida_id:
                                    value
                                }
                              )
                            }
                          />
                        </Form.Item>
                      </Col>


                      <Col
                        xs={24}
                        sm={12}
                        lg={6}
                      >
                        <Form.Item
                          label="Color"
                          required
                        >
                          <Select
                            value={
                              detalle
                                .color_id ||
                              undefined
                            }
                            showSearch
                            optionFilterProp="label"
                            placeholder="Selecciona"
                            disabled={
                              estructuraBloqueada
                            }
                            options={
                              colores.map(
                                (item) => ({
                                  value:
                                    String(
                                      item.id
                                    ),
                                  label:
                                    item.nombre
                                })
                              )
                            }
                            onChange={(
                              value
                            ) =>
                              actualizar(
                                index,
                                {
                                  color_id:
                                    value
                                }
                              )
                            }
                          />
                        </Form.Item>
                      </Col>


                      <Col
                        xs={24}
                        sm={12}
                        lg={6}
                      >
                        <Form.Item
                          label="Material"
                          required
                        >
                          <Select
                            value={
                              detalle
                                .material_id ||
                              undefined
                            }
                            showSearch
                            optionFilterProp="label"
                            placeholder="Selecciona"
                            disabled={
                              estructuraBloqueada
                            }
                            options={
                              materiales.map(
                                (item) => ({
                                  value:
                                    String(
                                      item.id
                                    ),
                                  label:
                                    item.nombre
                                })
                              )
                            }
                            onChange={(
                              value
                            ) =>
                              actualizar(
                                index,
                                {
                                  material_id:
                                    value
                                }
                              )
                            }
                          />
                        </Form.Item>
                      </Col>


                      <Col
                        xs={24}
                        sm={12}
                        lg={6}
                      >
                        <Form.Item
                          label="Cantidad total"
                          required
                          extra={
                            cantidadEntregada >
                            0
                              ? `Mínimo: ${formatCantidad(cantidadEntregada)} ${detalle.unidad || ''}`
                              : undefined
                          }
                        >
                          <InputNumber
                            value={
                              detalle
                                .cantidad_pedida ===
                              ''
                                ? null
                                : Number(
                                    detalle
                                      .cantidad_pedida
                                  )
                            }
                            min={
                              cantidadEntregada >
                              0
                                ? cantidadEntregada
                                : 0.01
                            }
                            precision={2}
                            step={0.01}
                            className="gd-full-width"
                            placeholder="0.00"
                            disabled={
                              procesando
                            }
                            onChange={(
                              value
                            ) =>
                              actualizar(
                                index,
                                {
                                  cantidad_pedida:
                                    value ===
                                    null
                                      ? ''
                                      : String(
                                          value
                                        )
                                }
                              )
                            }
                          />
                        </Form.Item>
                      </Col>


                      <Col
                        xs={24}
                        sm={12}
                        lg={6}
                      >
                        <Form.Item
                          label="Unidad"
                          required
                        >
                          <Select
                            value={
                              detalle
                                .unidad_medida_id ||
                              undefined
                            }
                            placeholder="Selecciona"
                            disabled={
                              estructuraBloqueada
                            }
                            options={
                              unidades.map(
                                (item) => ({
                                  value:
                                    String(
                                      item
                                        .unidad_medida_id
                                    ),
                                  label:
                                    item.codigo
                                })
                              )
                            }
                            onChange={(
                              value
                            ) =>
                              actualizarUnidad(
                                index,
                                value
                              )
                            }
                          />
                        </Form.Item>
                      </Col>


                      <Col
                        xs={24}
                        sm={12}
                        lg={6}
                      >
                        <Form.Item
                          label="Presentación"
                        >
                          <InputNumber
                            value={
                              detalle
                                .cantidad_presentacion ===
                              ''
                                ? null
                                : Number(
                                    detalle
                                      .cantidad_presentacion
                                  )
                            }
                            min={0.01}
                            precision={2}
                            step={0.01}
                            className="gd-full-width"
                            placeholder="0.00"
                            disabled={
                              procesando
                            }
                            onChange={(
                              value
                            ) =>
                              actualizar(
                                index,
                                {
                                  cantidad_presentacion:
                                    value ===
                                    null
                                      ? ''
                                      : String(
                                          value
                                        )
                                }
                              )
                            }
                          />
                        </Form.Item>
                      </Col>


                      <Col
                        xs={24}
                        sm={12}
                        lg={6}
                      >
                        <Form.Item
                          label="Unidad presentación"
                        >
                          <Select
                            value={
                              detalle
                                .unidad_presentacion_id ||
                              undefined
                            }
                            placeholder="Igual a unidad"
                            disabled
                            options={
                              unidades.map(
                                (item) => ({
                                  value:
                                    String(
                                      item
                                        .unidad_medida_id
                                    ),
                                  label:
                                    item.codigo
                                })
                              )
                            }
                          />
                        </Form.Item>
                      </Col>


                      <Col
                        xs={24}
                        sm={12}
                        lg={6}
                      >
                        <Form.Item
                          label="Precio unitario"
                          required
                        >
                          <InputNumber
                            value={
                              detalle
                                .precio_unitario ===
                              ''
                                ? null
                                : Number(
                                    detalle
                                      .precio_unitario
                                  )
                            }
                            min={0.01}
                            precision={2}
                            step={0.01}
                            className="gd-full-width"
                            placeholder="0.00"
                            disabled={
                              procesando
                            }
                            onChange={(
                              value
                            ) =>
                              actualizar(
                                index,
                                {
                                  precio_unitario:
                                    value ===
                                    null
                                      ? ''
                                      : String(
                                          value
                                        )
                                }
                              )
                            }
                          />
                        </Form.Item>
                      </Col>


                      <Col
                        xs={24}
                        sm={12}
                        lg={6}
                      >
                        <Form.Item
                          label="Moneda"
                          required
                        >
                          <Select
                            value={
                              detalle
                                .moneda_codigo
                            }
                            disabled={
                              estructuraBloqueada
                            }
                            options={[
                              {
                                value:
                                  'PEN',
                                label:
                                  'Soles (PEN)'
                              },
                              {
                                value:
                                  'USD',
                                label:
                                  'Dólares (USD)'
                              }
                            ]}
                            onChange={(
                              value
                            ) =>
                              actualizar(
                                index,
                                {
                                  moneda_codigo:
                                    value
                                }
                              )
                            }
                          />
                        </Form.Item>
                      </Col>


                      <Col
                        xs={24}
                        sm={12}
                        lg={6}
                      >
                        <Form.Item
                          label="Subtotal"
                        >
                          <Input
                            value={
                              formatMonto(
                                subtotal
                              )
                            }
                            suffix={
                              detalle
                                .moneda_codigo
                            }
                            disabled
                          />
                        </Form.Item>
                      </Col>


                      <Col
                        xs={24}
                        lg={12}
                      >
                        <Form.Item
                          label="Descripción del producto"
                        >
                          <Input
                            value={
                              detalle
                                .descripcion_item
                            }
                            maxLength={300}
                            disabled={
                              procesando
                            }
                            placeholder="Opcional"
                            onChange={(e) =>
                              actualizar(
                                index,
                                {
                                  descripcion_item:
                                    e.target
                                      .value
                                }
                              )
                            }
                          />
                        </Form.Item>
                      </Col>


                      <Col
                        xs={24}
                        lg={12}
                      >
                        <Form.Item
                          label="Observación"
                        >
                          <Input
                            value={
                              detalle
                                .observacion
                            }
                            maxLength={300}
                            disabled={
                              procesando
                            }
                            placeholder="Opcional"
                            onChange={(e) =>
                              actualizar(
                                index,
                                {
                                  observacion:
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

                </Card>
              );
            }
          )
        }

      </Space>

    </Card>
  );
}


export default PedidoItemsEditor;
