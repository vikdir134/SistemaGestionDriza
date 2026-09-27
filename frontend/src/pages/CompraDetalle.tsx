import type {
  TableColumnsType
} from 'antd';

import {
  App as AntdApp,
  Card,
  Descriptions,
  Empty,
  Result,
  Skeleton,
  Space,
  Statistic,
  Table,
  Tag,
  Typography
} from 'antd';

import {
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
} from '../services/api';

import BackButton
  from '../components/ui/BackButton';

import PageHeader
  from '../components/ui/PageHeader';

import {
  formatCantidad,
  formatMonto,
  formatPrecio
} from '../utils/formatters';

import '../styles/comprasGeneralesAntd.css';


const {
  Text
} = Typography;


type CompraDetalleItem = {
  compra_detalle_id: number;

  producto_id?:
    number | null;

  material_id?:
    number | null;

  material?:
    string | null;

  descripcion_item:
    string;

  cantidad:
    number;

  unidad_medida_id:
    number;

  unidad:
    string;

  precio_unitario:
    number;

  subtotal:
    number;
};


type Compra = {
  compra_id: number;
  proveedor_id: number;

  ruc: string;
  razon_social: string;
  direccion?:
    string | null;

  fecha_compra:
    string;

  numero_documento?:
    string | null;

  monto_total:
    number;

  moneda_codigo:
    'PEN' | 'USD';

  descripcion?:
    string | null;

  created_at?:
    string | null;

  registrado_por:
    string;

  detalles:
    CompraDetalleItem[];
};


function CompraDetalle() {
  const {
    compra_id
  } = useParams();

  const {
    message
  } = AntdApp.useApp();

  const [
    compra,
    setCompra
  ] = useState<
    Compra | null
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
              `/compras/${compra_id}`
            );

          setCompra(
            data.compra
          );

        } catch (error) {
          const mensaje =
            error instanceof Error
              ? error.message
              : 'No se pudo cargar la compra';

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
    compra_id,
    message
  ]);


  const tieneMaterialHistorico =
    useMemo(
      () =>
        Boolean(
          compra?.detalles.some(
            (item) =>
              item.material_id ||
              item.material
          )
        ),
      [
        compra
      ]
    );


  const columns:
    TableColumnsType<
      CompraDetalleItem
    > = [
    {
      title: 'Descripción',
      dataIndex:
        'descripcion_item',
      key:
        'descripcion_item',
      minWidth: 260,

      render: (
        value: string
      ) => (
        <Text strong>
          {value || '-'}
        </Text>
      )
    },

    ...(tieneMaterialHistorico
      ? [
          {
            title:
              'Material registrado',
            dataIndex:
              'material',
            key:
              'material',
            width: 180,

            render: (
              value?:
                string | null
            ) =>
              value
                ? (
                    <Tag color="default">
                      {value}
                    </Tag>
                  )
                : '-'
          }
        ]
      : []
    ),

    {
      title: 'Cantidad',
      key: 'cantidad',
      width: 150,

      render: (
        _,
        item
      ) =>
        `${formatCantidad(item.cantidad)} ${item.unidad}`
    },

    {
      title:
        'Precio unitario',
      dataIndex:
        'precio_unitario',
      key:
        'precio_unitario',
      width: 160,

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
      <div className="gd-compras-page">

        <Skeleton
          active
          paragraph={{
            rows: 10
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
      <div className="gd-compras-page">

        <BackButton
          to="/gestion/compras"
          label="Volver a compras"
        />


        <Result
          status="error"
          title="No se pudo cargar la compra"
          subTitle={
            errorCarga ||
            'Compra no encontrada'
          }
        />

      </div>
    );
  }


  return (
    <div className="gd-compras-page">

      <BackButton
        to="/gestion/compras"
        label="Volver a compras"
      />


      <PageHeader
        title={
          compra.numero_documento
            ? `Compra · ${compra.numero_documento}`
            : 'Detalle de compra'
        }
        description={
          `${compra.razon_social} · ${compra.ruc}`
        }
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


      <Card
        title="Datos de la compra"
        className="gd-compras-register-card"
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
              key: 'moneda',
              label: 'Moneda',
              children:
                compra
                  .moneda_codigo ===
                'PEN'
                  ? 'Soles (PEN)'
                  : 'Dólares (USD)'
            },

            {
              key: 'usuario',
              label: 'Registrado por',
              children:
                compra
                  .registrado_por
            },

            {
              key: 'direccion',
              label: 'Dirección del proveedor',
              span: 3,
              children:
                compra.direccion ||
                '-'
            },

            {
              key: 'descripcion',
              label: 'Descripción general',
              span: 3,
              children:
                compra.descripcion ||
                'Sin descripción general'
            }
          ]}
        />

      </Card>


      <Card
        title="Ítems de compra"
        extra={
          <Text
            type="secondary"
          >
            {
              compra
                .detalles
                .length
            } ítem(s)
          </Text>
        }
        className="gd-compras-table-card"
      >

        <Table<
          CompraDetalleItem
        >
          rowKey="compra_detalle_id"
          columns={columns}
          dataSource={
            compra.detalles
          }
          pagination={false}
          scroll={{
            x:
              tieneMaterialHistorico
                ? 900
                : 720
          }}
          locale={{
            emptyText:
              <Empty
                image={
                  Empty
                    .PRESENTED_IMAGE_SIMPLE
                }
                description="La compra no tiene ítems registrados"
              />
          }}
        />

      </Card>


      <Card
        className="gd-compra-detail-total-card"
      >

        <Space
          className="gd-compra-detail-total-space"
          wrap
        >

          <Statistic
            title="Ítems"
            value={
              compra
                .detalles
                .length
            }
          />


          <Statistic
            title="Total de compra"
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
            prefix={
              <ShoppingCartOutlined />
            }
          />

        </Space>

      </Card>

    </div>
  );
}


export default CompraDetalle;
