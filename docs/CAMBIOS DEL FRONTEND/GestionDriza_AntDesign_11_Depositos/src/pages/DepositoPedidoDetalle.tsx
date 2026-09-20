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
  Progress,
  Result,
  Row,
  Select,
  Skeleton,
  Space,
  Statistic,
  Table,
  Tag,
  Typography
} from 'antd';

import {
  DollarOutlined,
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
  formatMonto
} from '../utils/formatters';

import '../styles/depositosAntd.css';


const {
  Text
} = Typography;

const {
  TextArea
} = Input;


type EstadoPago =
  | 'PAGADO'
  | 'PARCIAL'
  | 'SIN_PAGO';


type TotalMoneda = {
  moneda_codigo:
    'PEN' | 'USD';

  total_pedido: number;
  total_depositado: number;
  saldo_pendiente: number;

  estado_pago:
    EstadoPago;
};


type TipoDeposito = {
  tipo_deposito_id: number;
  nombre: string;
  activo: boolean;
};


type DepositoHistorial = {
  deposito_id: number;
  tipo_deposito: string;

  fecha_deposito: string;
  monto: number;

  moneda_codigo:
    'PEN' | 'USD';

  numero_operacion?:
    string | null;

  observacion?:
    string | null;

  created_at?:
    string | null;

  registrado_por:
    string;
};


type PedidoDeposito = {
  pedido_id: number;
  codigo_pedido?: string | null;

  descripcion_pedido?:
    string | null;

  fecha_pedido: string;

  fecha_entrega_estimada?:
    string | null;

  estado_pedido: string;

  cliente_id: number;
  razon_social: string;
  ruc: string;

  direccion?:
    string | null;

  estado_pago_general:
    EstadoPago;

  totales:
    TotalMoneda[];

  historial_depositos:
    DepositoHistorial[];
};


type DepositoForm = {
  tipo_deposito_id:
    number;

  fecha_deposito:
    Dayjs;

  moneda_codigo:
    'PEN' | 'USD';

  monto:
    number;

  numero_operacion?:
    string;

  observacion?:
    string;
};


const estadoPagoTag = (
  estado:
    EstadoPago
) => {
  if (
    estado === 'PAGADO'
  ) {
    return (
      <Tag color="success">
        Pagado
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
    <Tag>
      Sin pago
    </Tag>
  );
};


function DepositoPedidoDetalle() {
  const {
    pedido_id
  } = useParams();

  const {
    message,
    modal
  } = AntdApp.useApp();

  const [
    form
  ] = Form.useForm<
    DepositoForm
  >();

  const [
    pedido,
    setPedido
  ] = useState<
    PedidoDeposito | null
  >(null);

  const [
    tiposDeposito,
    setTiposDeposito
  ] = useState<
    TipoDeposito[]
  >([]);

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    errorCarga,
    setErrorCarga
  ] = useState('');

  const {
    procesando:
      registrandoDeposito,

    intentarBloquear:
      bloquearDeposito,

    liberar:
      liberarDeposito
  } = useBloqueoAccion();


  const cargarPedido =
    useCallback(
      async () => {
        const data =
          await apiFetch(
            `/depositos/pedidos/${pedido_id}`
          );

        setPedido(
          data.pedido
        );
      },
      [
        pedido_id
      ]
    );


  const cargarTiposDeposito =
    useCallback(
      async () => {
        const data =
          await apiFetch(
            '/depositos/tipos'
          );

        setTiposDeposito(
          data.tipos ||
          []
        );
      },
      []
    );


  useEffect(() => {
    const iniciar =
      async () => {
        setCargando(true);
        setErrorCarga('');

        try {
          await Promise.all([
            cargarTiposDeposito(),
            cargarPedido()
          ]);

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
    cargarTiposDeposito,
    message
  ]);


  useEffect(() => {
    form.setFieldsValue({
      fecha_deposito:
        dayjs(),

      moneda_codigo:
        'PEN'
    } as Partial<DepositoForm>);
  }, [
    form
  ]);


  const monedaSeleccionada =
    Form.useWatch(
      'moneda_codigo',
      form
    ) || 'PEN';


  const montoIngresado =
    Number(
      Form.useWatch(
        'monto',
        form
      ) || 0
    );


  const saldoSeleccionado =
    useMemo(
      () =>
        pedido?.totales.find(
          (total) =>
            total
              .moneda_codigo ===
            monedaSeleccionada
        ) || null,
      [
        monedaSeleccionada,
        pedido
      ]
    );


  const saldoPendiente =
    Number(
      saldoSeleccionado
        ?.saldo_pendiente ||
      0
    );


  const saldoDespues =
    Math.max(
      0,
      saldoPendiente -
      montoIngresado
    );


  const puedeRegistrarMoneda =
    Boolean(
      saldoSeleccionado &&
      saldoPendiente > 0
    );


  const registrarDeposito =
    async (
      values:
        DepositoForm
    ) => {
      if (
        !pedido ||
        !bloquearDeposito()
      ) {
        return;
      }

      try {
        await apiFetch(
          '/depositos',
          {
            method: 'POST',

            body:
              JSON.stringify({
                pedido_id:
                  pedido
                    .pedido_id,

                tipo_deposito_id:
                  Number(
                    values
                      .tipo_deposito_id
                  ),

                fecha_deposito:
                  values
                    .fecha_deposito
                    ?.format(
                      'YYYY-MM-DD'
                    ),

                monto:
                  Number(
                    values.monto
                  ),

                moneda_codigo:
                  values
                    .moneda_codigo,

                numero_operacion:
                  values
                    .numero_operacion
                    ?.trim() ||
                  '',

                observacion:
                  values
                    .observacion
                    ?.trim() ||
                  ''
              })
          }
        );


        message.success(
          'Depósito registrado correctamente'
        );


        form.resetFields();

        form.setFieldsValue({
          fecha_deposito:
            dayjs(),

          moneda_codigo:
            'PEN'
        } as Partial<DepositoForm>);


        await cargarPedido();


        liberarDeposito();

      } catch (error) {
        liberarDeposito();

        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudo registrar el depósito'
        );

        throw error;
      }
    };


  const solicitarRegistro =
    async () => {
      let values:
        DepositoForm;

      try {
        values =
          await form
            .validateFields();

      } catch {
        return;
      }


      const saldo =
        pedido?.totales.find(
          (total) =>
            total
              .moneda_codigo ===
            values.moneda_codigo
        );


      if (!saldo) {
        message.error(
          `El pedido no tiene un total registrado en ${values.moneda_codigo}`
        );

        return;
      }


      const monto =
        Number(
          values.monto
        );


      if (
        monto >
        Number(
          saldo
            .saldo_pendiente
        )
      ) {
        message.error(
          `El monto excede el saldo pendiente de ${formatMonto(saldo.saldo_pendiente)} ${values.moneda_codigo}`
        );

        return;
      }


      modal.confirm({
        title:
          'Registrar depósito',

        content:
          `Se registrará un depósito de ${formatMonto(monto)} ${values.moneda_codigo}. Después del registro quedará un saldo pendiente de ${formatMonto(Number(saldo.saldo_pendiente) - monto)} ${values.moneda_codigo}.`,

        okText:
          'Registrar depósito',

        cancelText:
          'Cancelar',

        okButtonProps: {
          icon:
            <SaveOutlined />
        },

        onOk: () =>
          registrarDeposito(
            values
          )
      });
    };


  const totalesColumns:
    TableColumnsType<
      TotalMoneda
    > = [
    {
      title: 'Moneda',
      dataIndex:
        'moneda_codigo',
      key:
        'moneda_codigo',
      width: 120,

      render: (
        value:
          'PEN' | 'USD'
      ) => (
        <Tag
          color={
            value === 'PEN'
              ? 'blue'
              : 'green'
          }
        >
          {
            value === 'PEN'
              ? 'Soles (PEN)'
              : 'Dólares (USD)'
          }
        </Tag>
      )
    },

    {
      title: 'Total pedido',
      dataIndex:
        'total_pedido',
      key:
        'total_pedido',
      width: 160,

      render: (
        value: number,
        row
      ) => (
        <Text strong>
          {
            formatMonto(
              value
            )
          } {
            row
              .moneda_codigo
          }
        </Text>
      )
    },

    {
      title:
        'Total depositado',
      dataIndex:
        'total_depositado',
      key:
        'total_depositado',
      width: 175,

      render: (
        value: number,
        row
      ) =>
        `${formatMonto(value)} ${row.moneda_codigo}`
    },

    {
      title:
        'Saldo pendiente',
      dataIndex:
        'saldo_pendiente',
      key:
        'saldo_pendiente',
      width: 175,

      render: (
        value: number,
        row
      ) => (
        <Text
          strong
          type={
            Number(
              value
            ) > 0
              ? 'warning'
              : 'success'
          }
        >
          {
            formatMonto(
              value
            )
          } {
            row
              .moneda_codigo
          }
        </Text>
      )
    },

    {
      title: 'Estado',
      dataIndex:
        'estado_pago',
      key:
        'estado_pago',
      width: 130,

      render: (
        value:
          EstadoPago
      ) =>
        estadoPagoTag(
          value
        )
    }
  ];


  const historialColumns:
    TableColumnsType<
      DepositoHistorial
    > = [
    {
      title: 'Tipo',
      dataIndex:
        'tipo_deposito',
      key:
        'tipo_deposito',
      width: 160
    },

    {
      title: 'Fecha',
      dataIndex:
        'fecha_deposito',
      key:
        'fecha_deposito',
      width: 125,

      render: (
        value: string
      ) =>
        value?.slice(
          0,
          10
        ) || '-'
    },

    {
      title: 'Monto',
      key: 'monto',
      width: 155,

      render: (
        _,
        deposito
      ) => (
        <Text strong>
          {
            formatMonto(
              deposito
                .monto
            )
          } {
            deposito
              .moneda_codigo
          }
        </Text>
      )
    },

    {
      title: 'Operación',
      dataIndex:
        'numero_operacion',
      key:
        'numero_operacion',
      width: 160,

      render: (
        value?:
          string | null
      ) =>
        value || '-'
    },

    {
      title:
        'Registrado por',
      dataIndex:
        'registrado_por',
      key:
        'registrado_por',
      width: 180,
      responsive: [
        'md'
      ]
    },

    {
      title: 'Observación',
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


  if (
    cargando
  ) {
    return (
      <div className="gd-deposito-page">

        <Skeleton
          active
          paragraph={{
            rows: 12
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
      <div className="gd-deposito-page">

        <BackButton
          to="/gestion/depositos"
          label="Volver a depósitos"
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
    <div className="gd-deposito-page">

      <BackButton
        to="/gestion/depositos"
        label="Volver a depósitos"
      />


      <PageHeader
        title={
          pedido.codigo_pedido
            ? `Pagos · ${pedido.codigo_pedido}`
            : 'Control de pagos'
        }
        description={
          `${pedido.razon_social} · ${pedido.ruc}`
        }
        extra={
          estadoPagoTag(
            pedido
              .estado_pago_general
          )
        }
      />


      <Card
        title="Datos del pedido"
        className="gd-deposito-section-card"
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
              key: 'entrega',
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
        title="Resumen de pago por moneda"
        className="gd-deposito-section-card"
      >

        <Table<TotalMoneda>
          rowKey="moneda_codigo"
          columns={
            totalesColumns
          }
          dataSource={
            pedido.totales
          }
          pagination={false}
          scroll={{
            x: 720
          }}
        />

      </Card>


      <Card
        title="Registrar depósito"
        className="gd-deposito-section-card"
      >

        <Form<DepositoForm>
          form={form}
          layout="vertical"
          requiredMark={false}
          disabled={
            registrandoDeposito
          }
          initialValues={{
            fecha_deposito:
              dayjs(),

            moneda_codigo:
              'PEN'
          }}
        >

          <Row
            gutter={[
              16,
              0
            ]}
          >

            <Col
              xs={24}
              md={12}
              xl={6}
            >

              <Form.Item
                label="Tipo de depósito"
                name="tipo_deposito_id"
                rules={[
                  {
                    required: true,
                    message:
                      'Selecciona el tipo de depósito'
                  }
                ]}
              >
                <Select
                  size="large"
                  showSearch
                  optionFilterProp="label"
                  placeholder="Selecciona"
                  options={
                    tiposDeposito.map(
                      (tipo) => ({
                        value:
                          tipo
                            .tipo_deposito_id,

                        label:
                          tipo.nombre
                      })
                    )
                  }
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              md={12}
              xl={6}
            >

              <Form.Item
                label="Fecha de depósito"
                name="fecha_deposito"
                rules={[
                  {
                    required: true,
                    message:
                      'Selecciona la fecha'
                  }
                ]}
              >
                <DatePicker
                  size="large"
                  format="YYYY-MM-DD"
                  className="gd-full-width"
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              md={12}
              xl={6}
            >

              <Form.Item
                label="Moneda"
                name="moneda_codigo"
                rules={[
                  {
                    required: true,
                    message:
                      'Selecciona la moneda'
                  }
                ]}
              >
                <Select
                  size="large"
                  options={[
                    {
                      value: 'PEN',
                      label:
                        'Soles (PEN)'
                    },
                    {
                      value: 'USD',
                      label:
                        'Dólares (USD)'
                    }
                  ]}
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              md={12}
              xl={6}
            >

              <Form.Item
                label="Monto"
                name="monto"
                extra={
                  saldoSeleccionado
                    ? `Saldo pendiente: ${formatMonto(saldoPendiente)} ${monedaSeleccionada}`
                    : `El pedido no tiene monto registrado en ${monedaSeleccionada}`
                }
                rules={[
                  {
                    required: true,
                    message:
                      'Ingresa el monto'
                  },
                  {
                    validator: (
                      _,
                      value
                    ) => {
                      const monto =
                        Number(
                          value ||
                          0
                        );

                      if (
                        monto <= 0
                      ) {
                        return Promise.reject(
                          new Error(
                            'El monto debe ser mayor a 0'
                          )
                        );
                      }

                      if (
                        !saldoSeleccionado
                      ) {
                        return Promise.reject(
                          new Error(
                            `El pedido no tiene monto registrado en ${monedaSeleccionada}`
                          )
                        );
                      }

                      if (
                        monto >
                        saldoPendiente
                      ) {
                        return Promise.reject(
                          new Error(
                            `El monto máximo es ${formatMonto(saldoPendiente)} ${monedaSeleccionada}`
                          )
                        );
                      }

                      return Promise.resolve();
                    }
                  }
                ]}
              >
                <InputNumber
                  size="large"
                  min={0.01}
                  max={
                    puedeRegistrarMoneda
                      ? saldoPendiente
                      : undefined
                  }
                  precision={2}
                  step={0.01}
                  prefix={
                    <DollarOutlined />
                  }
                  addonAfter={
                    monedaSeleccionada
                  }
                  className="gd-full-width"
                  placeholder="0.00"
                  disabled={
                    !puedeRegistrarMoneda
                  }
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              md={12}
            >

              <Form.Item
                label="Número de operación"
                name="numero_operacion"
                rules={[
                  {
                    max: 100,
                    message:
                      'El número de operación no puede superar 100 caracteres'
                  }
                ]}
              >
                <Input
                  size="large"
                  maxLength={100}
                  placeholder="Ejemplo: OP-001"
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              md={12}
            >

              <Form.Item
                label="Observación"
                name="observacion"
                rules={[
                  {
                    max: 300,
                    message:
                      'La observación no puede superar 300 caracteres'
                  }
                ]}
              >
                <TextArea
                  rows={3}
                  maxLength={300}
                  showCount
                  placeholder="Ejemplo: Adelanto del pedido"
                />
              </Form.Item>

            </Col>

          </Row>


          {
            saldoSeleccionado &&
            (
              <Card
                size="small"
                className="gd-deposito-balance-preview"
              >

                <Row
                  gutter={[
                    12,
                    12
                  ]}
                >

                  <Col
                    xs={24}
                    sm={8}
                  >
                    <Statistic
                      title="Saldo actual"
                      value={
                        saldoPendiente
                      }
                      precision={2}
                      suffix={
                        monedaSeleccionada
                      }
                    />
                  </Col>


                  <Col
                    xs={24}
                    sm={8}
                  >
                    <Statistic
                      title="Depósito"
                      value={
                        montoIngresado
                      }
                      precision={2}
                      suffix={
                        monedaSeleccionada
                      }
                    />
                  </Col>


                  <Col
                    xs={24}
                    sm={8}
                  >
                    <Statistic
                      title="Saldo después"
                      value={
                        saldoDespues
                      }
                      precision={2}
                      suffix={
                        monedaSeleccionada
                      }
                    />
                  </Col>

                </Row>


                <Progress
                  percent={
                    Number(
                      Math.min(
                        100,
                        saldoSeleccionado
                          .total_pedido >
                          0
                          ? (
                              (
                                Number(
                                  saldoSeleccionado
                                    .total_depositado
                                ) +
                                montoIngresado
                              ) /
                              Number(
                                saldoSeleccionado
                                  .total_pedido
                              )
                            ) *
                            100
                          : 0
                      ).toFixed(
                        2
                      )
                    )
                  }
                  status={
                    saldoDespues <= 0
                      ? 'success'
                      : 'active'
                  }
                  className="gd-deposito-payment-progress"
                />

              </Card>
            )
          }


          {
            !saldoSeleccionado &&
            (
              <Alert
                type="warning"
                showIcon
                message={
                  `Este pedido no tiene total en ${monedaSeleccionada}`
                }
                description="Selecciona una moneda utilizada por los productos del pedido."
                className="gd-deposito-inline-alert"
              />
            )
          }


          {
            saldoSeleccionado &&
            saldoPendiente <= 0 &&
            (
              <Alert
                type="success"
                showIcon
                message={
                  `El saldo en ${monedaSeleccionada} ya está pagado completamente.`
                }
                className="gd-deposito-inline-alert"
              />
            )
          }


          <div className="gd-deposito-actions">

            <Button
              type="primary"
              icon={
                <SaveOutlined />
              }
              loading={
                registrandoDeposito
              }
              disabled={
                !puedeRegistrarMoneda
              }
              onClick={
                solicitarRegistro
              }
            >
              Guardar depósito
            </Button>

          </div>

        </Form>

      </Card>


      <Card
        title="Historial de depósitos"
        extra={
          <Text
            type="secondary"
          >
            {
              pedido
                .historial_depositos
                .length
            } depósito(s)
          </Text>
        }
        className="gd-deposito-section-card"
      >

        <Table<
          DepositoHistorial
        >
          rowKey="deposito_id"
          columns={
            historialColumns
          }
          dataSource={
            pedido
              .historial_depositos
          }
          pagination={false}
          scroll={{
            x: 820
          }}
          locale={{
            emptyText:
              <Empty
                image={
                  Empty
                    .PRESENTED_IMAGE_SIMPLE
                }
                description="No hay depósitos registrados para este pedido"
              />
          }}
        />

      </Card>

    </div>
  );
}


export default DepositoPedidoDetalle;
