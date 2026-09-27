import type {
  CollapseProps,
  TableColumnsType
} from 'antd';

import {
  App as AntdApp,
  Alert,
  Card,
  Collapse,
  Descriptions,
  Empty,
  Progress,
  Result,
  Select,
  Skeleton,
  Statistic,
  Table,
  Tag,
  Typography
} from 'antd';

import {
  DatabaseOutlined,
  InboxOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';

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
} from '../../services/api';

import BackButton
  from '../../components/ui/BackButton';

import PageHeader
  from '../../components/ui/PageHeader';

import {
  formatPeso
} from '../../utils/formatters';

import '../../styles/almacenMateriaPrimaAntd.css';


const {
  Text
} = Typography;


type MateriaPrimaLote = {
  compra_materia_prima_detalle_id:
    number;

  stock_materia_prima_lote_id:
    number;

  material_id: number;
  material: string;

  color_id: number;
  color: string;

  descripcion_item?:
    string | null;

  unidad_medida_id:
    number;
  unidad: string;

  precio_unitario: number;
  subtotal: number;

  cantidad_inicial: number;
  cantidad_consumida: number;
  cantidad_disponible: number;
};


type Lote = {
  compra_materia_prima_id:
    number;

  nombre_lote: string;
  fecha_compra: string;

  numero_documento?:
    string | null;

  moneda_codigo: string;

  descripcion?:
    string | null;

  proveedor_id: number;
  proveedor_ruc: string;
  proveedor: string;

  cantidad_inicial_total:
    number;

  cantidad_consumida_total:
    number;

  cantidad_disponible_total:
    number;

  cantidad_materias_primas:
    number;

  registrado_por:
    string;

  created_at?:
    string | null;

  detalles:
    MateriaPrimaLote[];
};


type Movimiento = {
  movimiento_materia_prima_id:
    number;

  tipo_movimiento: string;
  cantidad: number;

  fecha_movimiento:
    string;

  observacion?:
    string | null;

  material_id: number;
  material: string;

  color_id: number;
  color: string;

  unidad: string;

  registrado_por:
    string;
};


type Paginacion = {
  page: number;
  limit: number;
  total: number;
  totalPaginas: number;
};


const tipoMovimientoTexto = (
  tipo: string
) => {
  switch (tipo) {
    case 'ENTRADA_COMPRA':
      return 'Entrada por compra';

    case 'SALIDA_PRODUCCION':
      return 'Salida por producción';

    case 'SALIDA_MERMA':
      return 'Salida por merma';

    case 'AJUSTE_ENTRADA':
      return 'Ajuste de entrada';

    case 'AJUSTE_SALIDA':
      return 'Ajuste de salida';

    default:
      return tipo;
  }
};


const esEntrada = (
  tipo: string
) =>
  tipo === 'ENTRADA_COMPRA' ||
  tipo === 'AJUSTE_ENTRADA';


function AlmacenMateriaPrimaLoteDetalle() {
  const {
    stock_materia_prima_lote_id:
      compra_materia_prima_id
  } = useParams();

  const {
    message
  } = AntdApp.useApp();

  const [
    lote,
    setLote
  ] = useState<
    Lote | null
  >(null);

  const [
    movimientos,
    setMovimientos
  ] = useState<
    Movimiento[]
  >([]);

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    cargandoMovimientos,
    setCargandoMovimientos
  ] = useState(false);

  const [
    historialCargado,
    setHistorialCargado
  ] = useState(false);

  const [
    tipoMovimiento,
    setTipoMovimiento
  ] = useState('');

  const [
    page,
    setPage
  ] = useState(1);

  const [
    paginacion,
    setPaginacion
  ] = useState<Paginacion>({
    page: 1,
    limit: 10,
    total: 0,
    totalPaginas: 1
  });

  const [
    errorCarga,
    setErrorCarga
  ] = useState('');


  const cargarLote =
    useCallback(
      async () => {
        const data =
          await apiFetch(
            `/almacen-materia-prima/lotes/${compra_materia_prima_id}`
          );

        setLote(
          data.lote
        );
      },
      [
        compra_materia_prima_id
      ]
    );


  const cargarMovimientos =
    useCallback(
      async (
        pagina: number,
        tipo: string
      ) => {
        setCargandoMovimientos(
          true
        );

        try {
          const params =
            new URLSearchParams();

          params.set(
            'page',
            String(pagina)
          );

          params.set(
            'limit',
            '10'
          );

          if (tipo) {
            params.set(
              'tipo_movimiento',
              tipo
            );
          }


          const data =
            await apiFetch(
              `/almacen-materia-prima/lotes/${compra_materia_prima_id}/movimientos?${params.toString()}`
            );


          setMovimientos(
            data.movimientos ||
            []
          );

          setPaginacion(
            data.paginacion
          );

          setHistorialCargado(
            true
          );

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudo cargar el historial del lote'
          );

        } finally {
          setCargandoMovimientos(
            false
          );
        }
      },
      [
        compra_materia_prima_id,
        message
      ]
    );


  useEffect(() => {
    const iniciar =
      async () => {
        setCargando(true);
        setErrorCarga('');

        try {
          await cargarLote();

        } catch (error) {
          const mensaje =
            error instanceof Error
              ? error.message
              : 'No se pudo cargar el lote';

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
    cargarLote,
    message
  ]);


  useEffect(() => {
    if (
      !historialCargado
    ) {
      return;
    }

    cargarMovimientos(
      page,
      tipoMovimiento
    );
  }, [
    cargarMovimientos,
    historialCargado,
    page,
    tipoMovimiento
  ]);


  const porcentajeDisponible =
    useMemo(
      () => {
        if (!lote) {
          return 0;
        }

        const total =
          Number(
            lote
              .cantidad_inicial_total ||
            0
          );

        const disponible =
          Number(
            lote
              .cantidad_disponible_total ||
            0
          );

        if (
          total <= 0
        ) {
          return 0;
        }

        return Math.max(
          0,
          Math.min(
            100,
            (
              disponible /
              total
            ) *
            100
          )
        );
      },
      [
        lote
      ]
    );


  const detalleColumns:
    TableColumnsType<
      MateriaPrimaLote
    > = [
    {
      title: 'Material',
      dataIndex:
        'material',
      key:
        'material',
      minWidth: 180,

      render: (
        value: string
      ) => (
        <Text strong>
          {value}
        </Text>
      )
    },

    {
      title: 'Color',
      dataIndex:
        'color',
      key:
        'color',
      width: 150
    },

    {
      title: 'Comprado',
      key: 'comprado',
      width: 150,

      render: (
        _,
        item
      ) =>
        `${formatPeso(item.cantidad_inicial)} ${item.unidad}`
    },

    {
      title: 'Consumido',
      key: 'consumido',
      width: 150,

      render: (
        _,
        item
      ) =>
        `${formatPeso(item.cantidad_consumida)} ${item.unidad}`
    },

    {
      title: 'Disponible',
      key: 'disponible',
      width: 220,

      render: (
        _,
        item
      ) => {
        const total =
          Number(
            item
              .cantidad_inicial ||
            0
          );

        const disponible =
          Number(
            item
              .cantidad_disponible ||
            0
          );

        const porcentaje =
          total > 0
            ? Math.max(
                0,
                Math.min(
                  100,
                  (
                    disponible /
                    total
                  ) *
                  100
                )
              )
            : 0;


        return (
          <div className="gd-almacen-mp-stock-cell">

            <Text
              strong
              type={
                disponible > 0
                  ? 'success'
                  : undefined
              }
            >
              {
                formatPeso(
                  disponible
                )
              } {
                item.unidad
              }
            </Text>

            <Progress
              percent={
                Number(
                  porcentaje
                    .toFixed(2)
                )
              }
              showInfo={false}
              size="small"
            />

          </div>
        );
      }
    }
  ];


  const movimientoColumns:
    TableColumnsType<
      Movimiento
    > = [
    {
      title: 'Fecha',
      dataIndex:
        'fecha_movimiento',
      key:
        'fecha_movimiento',
      width: 175,

      render: (
        value: string
      ) => {
        const fecha =
          new Date(
            value
          );

        return Number.isNaN(
          fecha.getTime()
        )
          ? value
          : fecha.toLocaleString(
              'es-PE'
            );
      }
    },

    {
      title:
        'Materia prima',
      key:
        'materia_prima',
      minWidth: 210,

      render: (
        _,
        item
      ) => (
        <div className="gd-almacen-mp-provider-cell">

          <Text strong>
            {item.material}
          </Text>

          <Text
            type="secondary"
          >
            {item.color}
          </Text>

        </div>
      )
    },

    {
      title: 'Tipo',
      dataIndex:
        'tipo_movimiento',
      key:
        'tipo_movimiento',
      width: 190,

      render: (
        value: string
      ) => (
        <Tag
          color={
            esEntrada(
              value
            )
              ? 'success'
              : 'warning'
          }
        >
          {
            tipoMovimientoTexto(
              value
            )
          }
        </Tag>
      )
    },

    {
      title: 'Movimiento',
      key: 'movimiento',
      width: 160,

      render: (
        _,
        item
      ) => (
        <Text
          strong
          type={
            esEntrada(
              item
                .tipo_movimiento
            )
              ? 'success'
              : 'danger'
          }
        >
          {
            esEntrada(
              item
                .tipo_movimiento
            )
              ? '+'
              : '-'
          }
          {
            formatPeso(
              item.cantidad
            )
          } {
            item.unidad
          }
        </Text>
      )
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
        'lg'
      ]
    },

    {
      title: 'Observación',
      dataIndex:
        'observacion',
      key:
        'observacion',
      minWidth: 230,

      render: (
        value?:
          string | null
      ) =>
        value || '-'
    }
  ];


  const collapseItems:
    CollapseProps['items'] = [
    {
      key: 'movimientos',

      label:
        'Historial de movimientos',

      children:
        (
          <>
            <div className="gd-almacen-mp-history-toolbar">

              <div>
                <Text strong>
                  Movimientos del lote
                </Text>

                <br />

                <Text
                  type="secondary"
                >
                  Entradas y salidas registradas sobre las materias primas de esta compra.
                </Text>
              </div>


              <Select
                value={
                  tipoMovimiento
                }
                className="gd-almacen-mp-history-filter"
                options={[
                  {
                    value: '',
                    label: 'Todos'
                  },
                  {
                    value:
                      'ENTRADA_COMPRA',
                    label:
                      'Entrada por compra'
                  },
                  {
                    value:
                      'SALIDA_PRODUCCION',
                    label:
                      'Salida por producción'
                  },
                  {
                    value:
                      'SALIDA_MERMA',
                    label:
                      'Salida por merma'
                  },
                  {
                    value:
                      'AJUSTE_ENTRADA',
                    label:
                      'Ajuste de entrada'
                  },
                  {
                    value:
                      'AJUSTE_SALIDA',
                    label:
                      'Ajuste de salida'
                  }
                ]}
                onChange={(
                  value
                ) => {
                  setPage(1);
                  setTipoMovimiento(
                    value
                  );
                }}
              />

            </div>


            <Table<
              Movimiento
            >
              rowKey="movimiento_materia_prima_id"
              columns={
                movimientoColumns
              }
              dataSource={
                movimientos
              }
              loading={
                cargandoMovimientos
              }
              scroll={{
                x: 1050
              }}
              locale={{
                emptyText:
                  <Empty
                    image={
                      Empty
                        .PRESENTED_IMAGE_SIMPLE
                    }
                    description="No existen movimientos para el filtro seleccionado"
                  />
              }}
              pagination={{
                current:
                  paginacion.page,

                pageSize:
                  paginacion.limit,

                total:
                  paginacion.total,

                showSizeChanger:
                  false,

                showTotal: (
                  total
                ) =>
                  `${total} movimiento(s)`,

                onChange: (
                  nuevaPagina
                ) =>
                  setPage(
                    nuevaPagina
                  )
              }}
            />
          </>
        )
    }
  ];


  if (
    cargando
  ) {
    return (
      <div className="gd-almacen-mp-page">

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
    !lote
  ) {
    return (
      <div className="gd-almacen-mp-page">

        <BackButton
          to="/gestion/almacen/materia-prima"
          label="Volver al almacén"
        />


        <Result
          status="error"
          title="No se pudo cargar el lote"
          subTitle={
            errorCarga ||
            'Lote no encontrado'
          }
        />

      </div>
    );
  }


  return (
    <div className="gd-almacen-mp-page">

      <BackButton
        to="/gestion/almacen/materia-prima"
        label="Volver al almacén"
      />


      <PageHeader
        title={
          lote.nombre_lote
        }
        description="Existencias y movimientos de las materias primas pertenecientes a esta compra."
        extra={
          lote
            .cantidad_disponible_total >
          0
            ? (
                <Tag color="success">
                  Con stock
                </Tag>
              )
            : (
                <Tag>
                  Agotado
                </Tag>
              )
        }
      />


      <div className="gd-almacen-mp-detail-stats">

        <Card>
          <Statistic
            title="Comprado"
            value={
              Number(
                lote
                  .cantidad_inicial_total ||
                0
              )
            }
            precision={2}
            suffix="KG"
            prefix={
              <ShoppingCartOutlined />
            }
          />
        </Card>


        <Card>
          <Statistic
            title="Consumido"
            value={
              Number(
                lote
                  .cantidad_consumida_total ||
                0
              )
            }
            precision={2}
            suffix="KG"
            prefix={
              <DatabaseOutlined />
            }
          />
        </Card>


        <Card>
          <Statistic
            title="Disponible"
            value={
              Number(
                lote
                  .cantidad_disponible_total ||
                0
              )
            }
            precision={2}
            suffix="KG"
            prefix={
              <InboxOutlined />
            }
          />
        </Card>

      </div>


      <Card
        title="Datos del lote"
        className="gd-almacen-mp-section-card"
      >

        <Descriptions
          column={{
            xs: 1,
            sm: 2,
            lg: 3
          }}
          items={[
            {
              key: 'proveedor',
              label: 'Proveedor',
              children:
                lote.proveedor
            },

            {
              key: 'ruc',
              label: 'RUC',
              children:
                lote
                  .proveedor_ruc
            },

            {
              key: 'fecha',
              label: 'Fecha de compra',
              children:
                lote
                  .fecha_compra
                  ?.slice(
                    0,
                    10
                  ) ||
                '-'
            },

            {
              key: 'documento',
              label: 'Documento',
              children:
                lote
                  .numero_documento ||
                '-'
            },

            {
              key: 'moneda',
              label: 'Moneda',
              children:
                lote
                  .moneda_codigo
            },

            {
              key: 'usuario',
              label: 'Registrado por',
              children:
                lote
                  .registrado_por
            },

            {
              key: 'materias',
              label:
                'Materias primas',
              children:
                lote
                  .cantidad_materias_primas
            },

            {
              key: 'descripcion',
              label: 'Descripción',
              span: 2,
              children:
                lote.descripcion ||
                'Sin descripción'
            }
          ]}
        />


        <div className="gd-almacen-mp-global-progress">

          <div className="gd-almacen-mp-global-progress-head">

            <Text>
              Stock disponible del lote
            </Text>

            <Text strong>
              {
                formatPeso(
                  lote
                    .cantidad_disponible_total
                )
              } / {
                formatPeso(
                  lote
                    .cantidad_inicial_total
                )
              } KG
            </Text>

          </div>


          <Progress
            percent={
              Number(
                porcentajeDisponible
                  .toFixed(2)
              )
            }
            status={
              Number(
                lote
                  .cantidad_disponible_total
              ) <= 0
                ? 'exception'
                : 'active'
            }
          />

        </div>

      </Card>


      {
        Number(
          lote
            .cantidad_disponible_total
        ) <= 0 &&
        (
          <Alert
            type="warning"
            showIcon
            message="Este lote ya no tiene stock disponible."
            description="Se mantiene visible porque forma parte del historial de compras, producción y mermas."
            className="gd-almacen-mp-section-card"
          />
        )
      }


      <Card
        title="Materias primas del lote"
        extra={
          <Text
            type="secondary"
          >
            {
              lote
                .detalles
                .length
            } materia(s) prima(s)
          </Text>
        }
        className="gd-almacen-mp-table-card"
      >

        <Table<
          MateriaPrimaLote
        >
          rowKey="compra_materia_prima_detalle_id"
          columns={
            detalleColumns
          }
          dataSource={
            lote.detalles
          }
          pagination={false}
          scroll={{
            x: 820
          }}
        />

      </Card>


      <Collapse
        items={
          collapseItems
        }
        className="gd-almacen-mp-history-collapse"
        onChange={(
          keys
        ) => {
          const abierto =
            Array.isArray(
              keys
            )
              ? keys.includes(
                  'movimientos'
                )
              : keys ===
                'movimientos';

          if (
            abierto &&
            !historialCargado
          ) {
            cargarMovimientos(
              1,
              tipoMovimiento
            );
          }
        }}
      />

    </div>
  );
}


export default AlmacenMateriaPrimaLoteDetalle;
