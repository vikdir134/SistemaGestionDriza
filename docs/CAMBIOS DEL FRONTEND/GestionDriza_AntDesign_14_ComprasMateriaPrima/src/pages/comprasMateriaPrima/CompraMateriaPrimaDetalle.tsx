import type {
  TableColumnsType
} from 'antd';

import {
  App as AntdApp,
  Alert,
  Card,
  Col,
  Descriptions,
  Empty,
  Progress,
  Result,
  Row,
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
  formatMonto,
  formatPeso,
  formatPrecio
} from '../../utils/formatters';

import '../../styles/comprasMateriaPrimaAntd.css';


const {
  Text
} = Typography;


type DetalleLote = {
  compra_materia_prima_detalle_id:
    number;

  material_id: number;
  material: string;

  color_id: number;
  color: string;

  descripcion_item?:
    string | null;

  cantidad: number;

  unidad_medida_id:
    number;

  unidad: string;

  precio_unitario:
    number;

  subtotal: number;

  stock_materia_prima_lote_id:
    number;

  cantidad_inicial:
    number;

  cantidad_disponible:
    number;
};


type CompraMateriaPrima = {
  compra_materia_prima_id:
    number;

  nombre_lote:
    string;

  proveedor_id:
    number;

  ruc: string;
  razon_social:
    string;

  direccion?:
    string | null;

  fecha_compra:
    string;

  numero_documento?:
    string | null;

  monto_total:
    number;

  moneda_codigo:
    | 'PEN'
    | 'USD';

  descripcion?:
    string | null;

  created_at?:
    string | null;

  registrado_por:
    string;

  detalles:
    DetalleLote[];
};


function CompraMateriaPrimaDetalle() {
  const {
    compra_materia_prima_id
  } = useParams();

  const {
    message
  } = AntdApp.useApp();

  const [
    compra,
    setCompra
  ] = useState<
    CompraMateriaPrima | null
  >(null);

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    errorCarga,
    setErrorCarga
  ] = useState('');


  useEffect(() => {
    const cargar =
      async () => {
        setCargando(true);
        setErrorCarga('');

        try {
          const data =
            await apiFetch(
              `/compras-materia-prima/${compra_materia_prima_id}`
            );

          setCompra(
            data.compra
          );

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

    cargar();
  }, [
    compra_materia_prima_id,
    message
  ]);


  const resumen =
    useMemo(
      () => {
        const comprado =
          (
            compra
              ?.detalles ||
            []
          ).reduce(
            (
              total,
              item
            ) =>
              total +
              Number(
                item
                  .cantidad_inicial ||
                item.cantidad ||
                0
              ),
            0
          );

        const disponible =
          (
            compra
              ?.detalles ||
            []
          ).reduce(
            (
              total,
              item
            ) =>
              total +
              Number(
                item
                  .cantidad_disponible ||
                0
              ),
            0
          );

        const consumido =
          Math.max(
            0,
            comprado -
            disponible
          );

        return {
          comprado,
          disponible,
          consumido
        };
      },
      [
        compra
      ]
    );


  const porcentajeDisponible =
    resumen.comprado > 0
      ? Math.max(
          0,
          Math.min(
            100,
            (
              resumen.disponible /
              resumen.comprado
            ) *
            100
          )
        )
      : 0;


  const columns:
    TableColumnsType<
      DetalleLote
    > = [
    {
      title: 'Materia prima',
      key: 'materia_prima',
      minWidth: 210,

      render: (
        _,
        item
      ) => (
        <div className="gd-compra-mp-material-cell">

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
      title: 'Descripción',
      dataIndex:
        'descripcion_item',
      key:
        'descripcion_item',
      minWidth: 190,
      responsive: [
        'lg'
      ],

      render: (
        value?:
          string | null
      ) =>
        value || '-'
    },

    {
      title: 'Comprado',
      key: 'comprado',
      width: 145,

      render: (
        _,
        item
      ) =>
        `${formatPeso(item.cantidad_inicial || item.cantidad)} KG`
    },

    {
      title: 'Disponible',
      key: 'disponible',
      width: 190,

      render: (
        _,
        item
      ) => {
        const inicial =
          Number(
            item
              .cantidad_inicial ||
            item.cantidad ||
            0
          );

        const disponible =
          Number(
            item
              .cantidad_disponible ||
            0
          );

        const porcentaje =
          inicial > 0
            ? Math.max(
                0,
                Math.min(
                  100,
                  (
                    disponible /
                    inicial
                  ) *
                  100
                )
              )
            : 0;


        return (
          <div className="gd-compra-mp-stock-cell">

            <Text strong>
              {
                formatPeso(
                  disponible
                )
              } KG
            </Text>

            <Progress
              percent={
                Number(
                  porcentaje
                    .toFixed(2)
                )
              }
              showInfo={
                false
              }
              size="small"
            />

          </div>
        );
      }
    },

    {
      title: 'Consumido',
      key: 'consumido',
      width: 145,

      render: (
        _,
        item
      ) => {
        const consumido =
          Math.max(
            0,
            Number(
              item
                .cantidad_inicial ||
              item.cantidad ||
              0
            ) -
            Number(
              item
                .cantidad_disponible ||
              0
            )
          );

        return (
          <Text
            type={
              consumido > 0
                ? 'warning'
                : undefined
            }
          >
            {
              formatPeso(
                consumido
              )
            } KG
          </Text>
        );
      }
    },

    {
      title:
        'Precio unitario',
      dataIndex:
        'precio_unitario',
      key:
        'precio_unitario',
      width: 165,

      render: (
        value: number
      ) =>
        `${formatPrecio(value)} ${compra?.moneda_codigo || ''}`
    },

    {
      title: 'Subtotal',
      dataIndex:
        'subtotal',
      key:
        'subtotal',
      width: 165,

      render: (
        value: number
      ) => (
        <Text strong>
          {
            formatMonto(
              value
            )
          } {
            compra
              ?.moneda_codigo
          }
        </Text>
      )
    }
  ];


  if (
    cargando
  ) {
    return (
      <div className="gd-compra-mp-page">

        <Skeleton
          active
          paragraph={{
            rows: 11
          }}
        />

      </div>
    );
  }


  if (
    errorCarga ||
    !compra
  ) {
    return (
      <div className="gd-compra-mp-page">

        <BackButton
          to="/gestion/compras-materia-prima"
          label="Volver a materia prima"
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
    <div className="gd-compra-mp-page">

      <BackButton
        to="/gestion/compras-materia-prima"
        label="Volver a materia prima"
      />


      <PageHeader
        title={
          compra.nombre_lote
        }
        description="Detalle de la compra y saldo actual de cada materia prima del lote."
        extra={
          <Tag
            color={
              compra
                .moneda_codigo ===
                'PEN'
                ? 'blue'
                : 'green'
            }
          >
            {
              compra
                .moneda_codigo
            }
          </Tag>
        }
      />


      <Row
        gutter={[
          16,
          16
        ]}
        className="gd-compra-mp-summary"
      >

        <Col
          xs={24}
          sm={12}
          xl={6}
        >
          <Card>
            <Statistic
              title="Comprado"
              value={
                resumen.comprado
              }
              precision={2}
              suffix="KG"
              prefix={
                <ShoppingCartOutlined />
              }
            />
          </Card>
        </Col>


        <Col
          xs={24}
          sm={12}
          xl={6}
        >
          <Card>
            <Statistic
              title="Disponible"
              value={
                resumen.disponible
              }
              precision={2}
              suffix="KG"
              prefix={
                <InboxOutlined />
              }
            />
          </Card>
        </Col>


        <Col
          xs={24}
          sm={12}
          xl={6}
        >
          <Card>
            <Statistic
              title="Consumido"
              value={
                resumen.consumido
              }
              precision={2}
              suffix="KG"
              prefix={
                <DatabaseOutlined />
              }
            />
          </Card>
        </Col>


        <Col
          xs={24}
          sm={12}
          xl={6}
        >
          <Card>
            <Statistic
              title="Monto total"
              value={
                Number(
                  compra
                    .monto_total
                )
              }
              precision={2}
              suffix={
                compra
                  .moneda_codigo
              }
            />
          </Card>
        </Col>

      </Row>


      <Card
        title="Datos del lote"
        className="gd-compra-mp-section-card"
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
                compra
                  .razon_social
            },

            {
              key: 'ruc',
              label: 'RUC',
              children:
                compra.ruc
            },

            {
              key: 'fecha',
              label: 'Fecha de compra',
              children:
                compra
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
                compra
                  .numero_documento ||
                '-'
            },

            {
              key: 'usuario',
              label: 'Registrado por',
              children:
                compra
                  .registrado_por
            },

            {
              key: 'registro',
              label: 'Fecha de registro',
              children:
                compra.created_at
                  ? new Date(
                      compra
                        .created_at
                    )
                      .toLocaleString(
                        'es-PE'
                      )
                  : '-'
            },

            {
              key: 'direccion',
              label:
                'Dirección del proveedor',
              span: 3,
              children:
                compra.direccion ||
                '-'
            },

            {
              key: 'descripcion',
              label: 'Descripción',
              span: 3,
              children:
                compra.descripcion ||
                'Sin descripción'
            }
          ]}
        />


        <div className="gd-compra-mp-global-progress">

          <div className="gd-compra-mp-global-progress-head">

            <Text>
              Stock disponible del lote
            </Text>

            <Text strong>
              {
                formatPeso(
                  resumen.disponible
                )
              } / {
                formatPeso(
                  resumen.comprado
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
              resumen.disponible <= 0
                ? 'exception'
                : 'active'
            }
          />

        </div>

      </Card>


      {
        resumen.disponible <= 0 &&
        (
          <Alert
            type="warning"
            showIcon
            message="Este lote ya no tiene stock disponible."
            description="El lote se conserva como parte del historial de compras y consumos."
            className="gd-compra-mp-section-card"
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
              compra
                .detalles
                .length
            } materia(s) prima(s)
          </Text>
        }
        className="gd-compra-mp-table-card"
      >

        <Table<
          DetalleLote
        >
          rowKey="compra_materia_prima_detalle_id"
          columns={columns}
          dataSource={
            compra.detalles
          }
          pagination={false}
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
                description="El lote no tiene materias primas registradas"
              />
          }}
        />

      </Card>

    </div>
  );
}


export default CompraMateriaPrimaDetalle;
