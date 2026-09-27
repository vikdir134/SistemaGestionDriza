import {
  App as AntdApp,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
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
  useEffect,
  useState
} from 'react';

import {
  useNavigate
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

import '../../styles/pedidosAntd.css';


const {
  TextArea
} = Input;


function RegistrarPedido() {
  const navigate =
    useNavigate();

  const {
    message
  } = AntdApp.useApp();

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
    cargandoBase,
    setCargandoBase
  ] = useState(true);

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
    detalles,
    setDetalles
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


  useEffect(() => {
    const cargar =
      async () => {
        setCargandoBase(
          true
        );

        try {
          const [
            clientesData,
            tiposData,
            medidasData,
            coloresData,
            materialesData,
            unidadesData
          ] = await Promise.all([
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

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudieron cargar los datos del pedido'
          );

        } finally {
          setCargandoBase(
            false
          );
        }
      };

    cargar();
  }, [
    message
  ]);


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


  const validar = () => {
    if (!clienteId) {
      return (
        'Debe seleccionar un cliente'
      );
    }

    if (
      !detalles ||
      detalles.length === 0
    ) {
      return (
        'Debe registrar al menos un producto'
      );
    }

    for (
      const [
        index,
        item
      ] of detalles.entries()
    ) {
      const nombre =
        `El producto ${index + 1}`;

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
        !item.unidad_medida_id
      ) {
        return (
          `${nombre} debe tener una unidad`
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
          item.moneda_codigo
        )
      ) {
        return (
          `${nombre} debe tener una moneda válida`
        );
      }
    }

    return null;
  };


  const registrar =
    async () => {
      const error =
        validar();

      if (error) {
        message.error(
          error
        );
        return;
      }

      if (
        !intentarBloquear()
      ) {
        return;
      }

      try {
        const data =
          await apiFetch(
            '/pedidos',
            {
              method: 'POST',

              body:
                JSON.stringify({
                  cliente_id:
                    clienteId,

                  codigo_pedido:
                    codigoPedido
                      .trim() ||
                    null,

                  fecha_pedido:
                    fechaPedido
                      ? fechaPedido
                          .format(
                            'YYYY-MM-DD'
                          )
                      : undefined,

                  fecha_entrega_estimada:
                    fechaEntrega
                      ? fechaEntrega
                          .format(
                            'YYYY-MM-DD'
                          )
                      : null,

                  descripcion_pedido:
                    descripcion
                      .trim(),

                  detalles:
                    detalles.map(
                      (item) => ({
                        tipo_producto_id:
                          Number(
                            item
                              .tipo_producto_id
                          ),

                        medida_id:
                          Number(
                            item
                              .medida_id
                          ),

                        color_id:
                          Number(
                            item
                              .color_id
                          ),

                        material_id:
                          Number(
                            item
                              .material_id
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
                            .cantidad_presentacion
                            ? Number(
                                item
                                  .unidad_presentacion_id ||
                                item
                                  .unidad_medida_id
                              )
                            : null,

                        precio_unitario:
                          Number(
                            item
                              .precio_unitario
                          ),

                        moneda_codigo:
                          item
                            .moneda_codigo,

                        descripcion_item:
                          item
                            .descripcion_item
                            .trim(),

                        observacion:
                          item
                            .observacion
                            .trim()
                      })
                    )
                })
            }
          );


        message.success(
          'Pedido registrado correctamente'
        );


        navigate(
          `/gestion/pedidos/${data.pedido.pedido_id}`,
          {
            replace: true
          }
        );

      } catch (error) {
        liberar();

        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudo registrar el pedido'
        );
      }
    };


  if (
    cargandoBase
  ) {
    return (
      <div className="gd-pedido-page">

        <Skeleton
          active
          paragraph={{
            rows: 12
          }}
        />

      </div>
    );
  }


  return (
    <div className="gd-pedido-page">

      <BackButton
        to="/gestion/pedidos"
        label="Volver a pedidos"
      />


      <PageHeader
        title="Registrar pedido"
        description="Registra un pedido con uno o varios productos."
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
                  placeholder="Selecciona un cliente"
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
                extra="Opcional."
              >
                <Input
                  size="large"
                  value={
                    codigoPedido
                  }
                  maxLength={50}
                  placeholder="Ejemplo: PED-001"
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
              >
                <DatePicker
                  size="large"
                  value={
                    fechaPedido
                  }
                  format="YYYY-MM-DD"
                  className="gd-full-width"
                  placeholder="Hoy si se deja vacío"
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
                  placeholder="Ejemplo: Pedido para entrega semanal"
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
          detalles
        }
        setDetalles={
          setDetalles
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
        procesando={
          procesando
        }
        onFeedback={
          feedbackEditor
        }
      />


      <div className="gd-pedido-actions">

        <Space
          wrap
        >

          <Button
            onClick={() =>
              navigate(
                '/gestion/pedidos'
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
              registrar
            }
          >
            Guardar pedido
          </Button>

        </Space>

      </div>

    </div>
  );
}


export default RegistrarPedido;
