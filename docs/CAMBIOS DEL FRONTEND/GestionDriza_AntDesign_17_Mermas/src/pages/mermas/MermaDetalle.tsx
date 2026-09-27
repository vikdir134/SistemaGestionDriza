import type {
  CollapseProps,
  TableColumnsType
} from 'antd';

import {
  App as AntdApp,
  Card,
  Collapse,
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
  CalendarOutlined,
  DatabaseOutlined,
  UserOutlined
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
  formatPeso
} from '../../utils/formatters';

import '../../styles/mermasAntd.css';


const {
  Text
} = Typography;


type ConsumoFIFO = {
  movimiento_materia_prima_id:
    number;

  stock_materia_prima_lote_id:
    number;

  cantidad:
    number;

  fecha_movimiento:
    string;

  compra_materia_prima_id:
    number;

  nombre_lote:
    string;

  fecha_compra:
    string;

  material_id:
    number;

  material:
    string;

  color_id:
    number;

  color:
    string;
};


type DetalleMerma = {
  merma_detalle_id:
    number;

  material_id:
    number;

  material:
    string;

  color_id:
    number;

  color:
    string;

  cantidad:
    number;

  unidad_medida_id:
    number;

  unidad:
    string;

  observacion?:
    string | null;

  created_at?:
    string | null;

  consumos_fifo:
    ConsumoFIFO[];
};


type Merma = {
  merma_id:
    number;

  fecha_merma:
    string;

  observacion?:
    string | null;

  created_at?:
    string | null;

  registrado_por:
    string;
};


function MermaDetalle() {
  const {
    merma_id
  } = useParams();

  const {
    message
  } = AntdApp.useApp();

  const [
    merma,
    setMerma
  ] = useState<
    Merma | null
  >(null);

  const [
    detalles,
    setDetalles
  ] = useState<
    DetalleMerma[]
  >([]);

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
              `/mermas/${merma_id}`
            );


          setMerma(
            data.merma
          );

          setDetalles(
            data.detalles ||
            []
          );

        } catch (error) {
          const mensaje =
            error instanceof Error
              ? error.message
              : 'No se pudo cargar la merma';

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
    merma_id,
    message
  ]);


  const total =
    useMemo(
      () =>
        detalles.reduce(
          (
            suma,
            item
          ) =>
            suma +
            Number(
              item.cantidad ||
              0
            ),
          0
        ),
      [
        detalles
      ]
    );


  const fifoColumns:
    TableColumnsType<
      ConsumoFIFO
    > = [
    {
      title: 'Lote',
      dataIndex:
        'nombre_lote',
      key:
        'nombre_lote',
      minWidth: 190,

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
        'Fecha de compra',
      dataIndex:
        'fecha_compra',
      key:
        'fecha_compra',
      width: 140,

      render: (
        value: string
      ) =>
        value?.slice(
          0,
          10
        ) || '-'
    },

    {
      title: 'Material',
      dataIndex:
        'material',
      key:
        'material',
      width: 170
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
      title: 'Descontado',
      dataIndex:
        'cantidad',
      key:
        'cantidad',
      width: 155,

      render: (
        value: number
      ) => (
        <Text
          strong
          type="danger"
        >
          -{
            formatPeso(
              value
            )
          } KG
        </Text>
      )
    }
  ];


  const crearCollapseItems =
    (
      item:
        DetalleMerma
    ):
      CollapseProps['items'] => [
      {
        key: 'fifo',

        label:
          (
            <Space wrap>

              <Text strong>
                Lotes afectados
              </Text>

              <Tag>
                {
                  item
                    .consumos_fifo
                    ?.length ||
                  0
                } lote(s)
              </Tag>

            </Space>
          ),

        children:
          (
            <>
              <Text
                type="secondary"
              >
                El sistema consumió primero el stock disponible más antiguo.
              </Text>


              <Table<
                ConsumoFIFO
              >
                rowKey="movimiento_materia_prima_id"
                columns={
                  fifoColumns
                }
                dataSource={
                  item
                    .consumos_fifo ||
                  []
                }
                pagination={false}
                scroll={{
                  x: 800
                }}
                className="gd-merma-fifo-table"
                locale={{
                  emptyText:
                    <Empty
                      image={
                        Empty
                          .PRESENTED_IMAGE_SIMPLE
                      }
                      description="No se encontraron lotes afectados"
                    />
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
      <div className="gd-merma-page">

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
    !merma
  ) {
    return (
      <div className="gd-merma-page">

        <BackButton
          to="/gestion/mermas"
          label="Volver a mermas"
        />


        <Result
          status="error"
          title="No se pudo cargar la merma"
          subTitle={
            errorCarga ||
            'Registro no encontrado'
          }
        />

      </div>
    );
  }


  return (
    <div className="gd-merma-page">

      <BackButton
        to="/gestion/mermas"
        label="Volver a mermas"
      />


      <PageHeader
        title="Detalle de merma"
        description="Materia prima descontada y lotes de compra afectados por FIFO."
      />


      <div className="gd-merma-detail-stats">

        <Card>
          <Statistic
            title="Fecha"
            value={
              merma
                .fecha_merma
                ?.slice(
                  0,
                  10
                ) ||
              '-'
            }
            prefix={
              <CalendarOutlined />
            }
          />
        </Card>


        <Card>
          <Statistic
            title="Materias primas"
            value={
              detalles.length
            }
            prefix={
              <DatabaseOutlined />
            }
          />
        </Card>


        <Card>
          <Statistic
            title="Total descontado"
            value={
              Number(
                total
              )
            }
            precision={2}
            suffix="KG"
          />
        </Card>


        <Card>
          <Statistic
            title="Registrado por"
            value={
              merma
                .registrado_por
            }
            prefix={
              <UserOutlined />
            }
          />
        </Card>

      </div>


      <Card
        title="Información del registro"
        className="gd-merma-section-card"
      >

        <Descriptions
          column={{
            xs: 1,
            sm: 2,
            lg: 3
          }}
          items={[
            {
              key: 'fecha',
              label: 'Fecha de merma',
              children:
                merma
                  .fecha_merma
                  ?.slice(
                    0,
                    10
                  ) ||
                '-'
            },

            {
              key: 'usuario',
              label:
                'Registrado por',
              children:
                merma
                  .registrado_por
            },

            {
              key: 'registro',
              label:
                'Fecha de registro',
              children:
                merma.created_at
                  ? new Date(
                      merma
                        .created_at
                    )
                      .toLocaleString(
                        'es-PE'
                      )
                  : '-'
            },

            {
              key:
                'observacion',
              label:
                'Observación general',
              span: 3,
              children:
                merma.observacion ||
                'Sin observación'
            }
          ]}
        />

      </Card>


      <Space
        direction="vertical"
        size={16}
        className="gd-merma-items-space"
      >

        {
          detalles.map(
            (
              item,
              index
            ) => (
              <Card
                key={
                  item
                    .merma_detalle_id
                }
                title={
                  <div className="gd-merma-detail-title">

                    <Text
                      type="secondary"
                    >
                      Materia prima {
                        index + 1
                      }
                    </Text>

                    <Text strong>
                      {
                        item.material
                      }
                      {' · '}
                      {
                        item.color
                      }
                    </Text>

                  </div>
                }
                extra={
                  <Text
                    strong
                    type="danger"
                    className="gd-merma-detail-amount"
                  >
                    -{
                      formatPeso(
                        item.cantidad
                      )
                    } {
                      item.unidad
                    }
                  </Text>
                }
                className="gd-merma-detail-card"
              >

                {
                  item.observacion &&
                  (
                    <Descriptions
                      column={1}
                      items={[
                        {
                          key:
                            'observacion',
                          label:
                            'Observación',
                          children:
                            item.observacion
                        }
                      ]}
                      className="gd-merma-detail-observation"
                    />
                  )
                }


                <Collapse
                  items={
                    crearCollapseItems(
                      item
                    )
                  }
                />

              </Card>
            )
          )
        }

      </Space>

    </div>
  );
}


export default MermaDetalle;
