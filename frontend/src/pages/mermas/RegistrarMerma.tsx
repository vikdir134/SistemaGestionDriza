import {
  App as AntdApp,
  Alert,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Progress,
  Row,
  Select,
  Skeleton,
  Space,
  Statistic
} from 'antd';

import {
  DeleteOutlined,
  PlusOutlined,
  SaveOutlined
} from '@ant-design/icons';

import dayjs, {
  Dayjs
} from 'dayjs';

import {
  useEffect,
  useMemo,
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

import BackButton
  from '../../components/ui/BackButton';

import PageHeader
  from '../../components/ui/PageHeader';

import {
  formatPeso
} from '../../utils/formatters';

import '../../styles/mermasAntd.css';


const {
  TextArea
} = Input;


type Disponibilidad = {
  material_id: number;
  material: string;

  color_id: number;
  color: string;

  unidad_medida_id: number;
  unidad: string;

  cantidad_disponible: number;
};


type DetalleMerma = {
  local_id: string;

  material_id?:
    number;

  color_id?:
    number;

  cantidad?:
    number;

  observacion:
    string;
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
    'merma',
    Date.now(),
    Math.random()
      .toString(36)
      .slice(2)
  ].join('-');
};


const nuevoLocalId =
  () => {
    if (
      typeof crypto !==
        'undefined' &&
      typeof crypto.randomUUID ===
        'function'
    ) {
      return crypto.randomUUID();
    }

    return [
      Date.now(),
      Math.random()
        .toString(36)
        .slice(2)
    ].join('-');
  };


const crearDetalle =
  (): DetalleMerma => ({
    local_id:
      nuevoLocalId(),

    material_id:
      undefined,

    color_id:
      undefined,

    cantidad:
      undefined,

    observacion:
      ''
  });


function RegistrarMerma() {
  const navigate =
    useNavigate();

  const {
    message,
    modal
  } = AntdApp.useApp();

  const [
    fechaMerma,
    setFechaMerma
  ] = useState<
    Dayjs | null
  >(
    dayjs()
  );

  const [
    observacion,
    setObservacion
  ] = useState('');

  const [
    disponibilidad,
    setDisponibilidad
  ] = useState<
    Disponibilidad[]
  >([]);

  const [
    detalles,
    setDetalles
  ] = useState<
    DetalleMerma[]
  >([
    crearDetalle()
  ]);

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    idempotencyKey
  ] = useState(
    nuevaKey
  );

  const {
    procesando,
    intentarBloquear,
    liberar
  } = useBloqueoAccion();


  useEffect(() => {
    const cargar =
      async () => {
        setCargando(true);

        try {
          const data =
            await apiFetch(
              '/mermas/disponibilidad'
            );


          setDisponibilidad(
            (
              data.items ||
              []
            ).map(
              (item: any) => ({
                ...item,

                cantidad_disponible:
                  Number(
                    item
                      .cantidad_disponible ||
                    0
                  )
              })
            )
          );

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudo consultar la materia prima disponible'
          );

        } finally {
          setCargando(false);
        }
      };

    cargar();
  }, [
    message
  ]);


  const materiales =
    useMemo(
      () => {
        const mapa =
          new Map<
            number,
            string
          >();


        disponibilidad.forEach(
          (item) =>
            mapa.set(
              Number(
                item.material_id
              ),
              item.material
            )
        );


        return Array.from(
          mapa.entries()
        ).map(
          ([
            value,
            label
          ]) => ({
            value,
            label
          })
        );
      },
      [
        disponibilidad
      ]
    );


  const coloresParaMaterial =
    (
      materialId?:
        number
    ) => {
      if (
        !materialId
      ) {
        return [];
      }


      return disponibilidad
        .filter(
          (item) =>
            Number(
              item.material_id
            ) ===
            Number(
              materialId
            )
        )
        .map(
          (item) => ({
            value:
              Number(
                item.color_id
              ),

            label:
              item.color
          })
        );
    };


  const obtenerStock =
    (
      detalle:
        DetalleMerma
    ) => {
      if (
        !detalle.material_id ||
        !detalle.color_id
      ) {
        return null;
      }


      return disponibilidad.find(
        (item) =>
          Number(
            item.material_id
          ) ===
            Number(
              detalle.material_id
            ) &&
          Number(
            item.color_id
          ) ===
            Number(
              detalle.color_id
            )
      ) || null;
    };


  const actualizarDetalle =
    (
      index: number,
      cambios:
        Partial<
          DetalleMerma
        >
    ) => {
      if (
        procesando
      ) {
        return;
      }

      setDetalles(
        (actuales) =>
          actuales.map(
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


  const totalMerma =
    useMemo(
      () =>
        detalles.reduce(
          (
            total,
            detalle
          ) =>
            total +
            Number(
              detalle.cantidad ||
              0
            ),
          0
        ),
      [
        detalles
      ]
    );


  const validar =
    () => {
      if (
        !fechaMerma
      ) {
        return (
          'La fecha de merma es obligatoria'
        );
      }


      if (
        disponibilidad.length ===
        0
      ) {
        return (
          'No hay materia prima disponible para registrar una merma'
        );
      }


      const usados =
        new Set<string>();


      for (
        let index = 0;
        index <
        detalles.length;
        index++
      ) {
        const detalle =
          detalles[index];


        if (
          !detalle.material_id ||
          !detalle.color_id
        ) {
          return (
            `Completa el material y color de la materia prima ${index + 1}`
          );
        }


        const stock =
          obtenerStock(
            detalle
          );


        if (!stock) {
          return (
            `La materia prima ${index + 1} no tiene stock disponible`
          );
        }


        const clave =
          `${detalle.material_id}:${detalle.color_id}`;


        if (
          usados.has(
            clave
          )
        ) {
          return (
            'No se puede repetir la misma materia prima en una sola merma'
          );
        }


        usados.add(
          clave
        );


        const cantidad =
          Number(
            detalle.cantidad ||
            0
          );


        if (
          !Number.isFinite(
            cantidad
          ) ||
          cantidad <= 0
        ) {
          return (
            `La cantidad de la materia prima ${index + 1} debe ser mayor a 0`
          );
        }


        if (
          cantidad >
          Number(
            stock
              .cantidad_disponible
          ) +
          0.000001
        ) {
          return (
            `La cantidad de la materia prima ${index + 1} supera el stock disponible`
          );
        }


        if (
          detalle.observacion
            .trim()
            .length >
          300
        ) {
          return (
            `La observación de la materia prima ${index + 1} no puede superar 300 caracteres`
          );
        }
      }


      if (
        observacion
          .trim()
          .length >
        500
      ) {
        return (
          'La observación general no puede superar 500 caracteres'
        );
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

        throw new Error(
          error
        );
      }


      if (
        !intentarBloquear()
      ) {
        return;
      }


      try {
        const data =
          await apiFetch(
            '/mermas',
            {
              method: 'POST',

              headers: {
                'Idempotency-Key':
                  idempotencyKey
              },

              body:
                JSON.stringify({
                  fecha_merma:
                    fechaMerma!
                      .format(
                        'YYYY-MM-DD'
                      ),

                  observacion:
                    observacion
                      .trim() ||
                    null,

                  detalles:
                    detalles.map(
                      (detalle) => ({
                        material_id:
                          Number(
                            detalle
                              .material_id
                          ),

                        color_id:
                          Number(
                            detalle
                              .color_id
                          ),

                        cantidad:
                          Number(
                            detalle
                              .cantidad
                          ),

                        observacion:
                          detalle
                            .observacion
                            .trim() ||
                          null
                      })
                    )
                })
            }
          );


        if (
          data.reutilizada
        ) {
          message.info(
            'La merma ya había sido registrada. Se recuperó el registro existente sin descontar stock nuevamente.'
          );

        } else {
          message.success(
            'Merma registrada correctamente'
          );
        }


        navigate(
          `/gestion/mermas/${data.merma.merma_id}`,
          {
            replace: true
          }
        );

      } catch (error) {
        liberar();

        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudo registrar la merma'
        );

        throw error;
      }
    };


  const solicitarRegistro =
    () => {
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
          'Registrar merma',

        content:
          `Se descontarán ${formatPeso(totalMerma)} KG de materia prima. El sistema consumirá automáticamente primero los lotes con stock más antiguo.`,

        okText:
          'Registrar merma',

        cancelText:
          'Cancelar',

        okButtonProps: {
          icon:
            <SaveOutlined />
        },

        onOk:
          registrar
      });
    };


  if (
    cargando
  ) {
    return (
      <div className="gd-merma-page">

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
    <div className="gd-merma-page">

      <BackButton
        to="/gestion/mermas"
        label="Volver a mermas"
      />


      <PageHeader
        title="Registrar merma"
        description="Registra materia prima perdida o deteriorada para descontarla automáticamente del almacén."
      />


      {
        disponibilidad.length ===
          0 &&
        (
          <Alert
            type="warning"
            showIcon
            message="No hay materia prima con stock disponible."
            description="Para registrar una merma debe existir stock de materia prima en el almacén."
            className="gd-merma-section-card"
          />
        )
      }


      <Card
        title="Datos de la merma"
        className="gd-merma-section-card"
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
              label="Fecha"
              required
            >
              <DatePicker
                size="large"
                value={
                  fechaMerma
                }
                format="YYYY-MM-DD"
                className="gd-full-width"
                disabled={
                  procesando
                }
                onChange={(
                  value
                ) =>
                  setFechaMerma(
                    value
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
              label="Observación general"
            >
              <TextArea
                rows={3}
                maxLength={500}
                showCount
                value={
                  observacion
                }
                placeholder="Ejemplo: Material deteriorado durante manipulación"
                disabled={
                  procesando
                }
                onChange={(e) =>
                  setObservacion(
                    e.target.value
                  )
                }
              />
            </Form.Item>
          </Col>

        </Row>

      </Card>


      <Card
        title="Materia prima afectada"
        extra={
          <Button
            type="primary"
            ghost
            icon={
              <PlusOutlined />
            }
            disabled={
              procesando ||
              disponibilidad.length ===
                0
            }
            onClick={() =>
              setDetalles([
                ...detalles,
                crearDetalle()
              ])
            }
          >
            Agregar materia prima
          </Button>
        }
        className="gd-merma-section-card"
      >

        <Alert
          type="info"
          showIcon
          message="El sistema aplicará FIFO automáticamente."
          description="No necesitas escoger un lote. Al registrar la merma se descontará primero el stock disponible más antiguo del Material + Color seleccionado."
          className="gd-merma-main-rule"
        />


        <Space
          direction="vertical"
          size={16}
          className="gd-merma-items-space"
        >

          {
            detalles.map(
              (
                detalle,
                index
              ) => {
                const stock =
                  obtenerStock(
                    detalle
                  );

                const disponible =
                  Number(
                    stock
                      ?.cantidad_disponible ||
                    0
                  );

                const cantidad =
                  Number(
                    detalle.cantidad ||
                    0
                  );

                const saldo =
                  Math.max(
                    0,
                    disponible -
                    cantidad
                  );

                const porcentajeSaldo =
                  disponible > 0
                    ? Math.max(
                        0,
                        Math.min(
                          100,
                          (
                            saldo /
                            disponible
                          ) *
                          100
                        )
                      )
                    : 0;


                return (
                  <Card
                    key={
                      detalle.local_id
                    }
                    size="small"
                    title={
                      `Materia prima ${index + 1}`
                    }
                    extra={
                      <Button
                        type="text"
                        danger
                        icon={
                          <DeleteOutlined />
                        }
                        disabled={
                          procesando ||
                          detalles.length ===
                            1
                        }
                        onClick={() => {
                          if (
                            detalles.length ===
                            1
                          ) {
                            message.warning(
                              'La merma debe tener al menos una materia prima'
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
                        }}
                      >
                        Quitar
                      </Button>
                    }
                    className="gd-merma-item-card"
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
                          label="Material"
                          required
                        >
                          <Select
                            value={
                              detalle
                                .material_id
                            }
                            showSearch
                            optionFilterProp="label"
                            placeholder="Selecciona"
                            disabled={
                              procesando
                            }
                            options={
                              materiales
                            }
                            onChange={(
                              value
                            ) =>
                              actualizarDetalle(
                                index,
                                {
                                  material_id:
                                    value,

                                  color_id:
                                    undefined,

                                  cantidad:
                                    undefined
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
                                .color_id
                            }
                            showSearch
                            optionFilterProp="label"
                            placeholder="Selecciona"
                            disabled={
                              procesando ||
                              !detalle
                                .material_id
                            }
                            options={
                              coloresParaMaterial(
                                detalle
                                  .material_id
                              )
                            }
                            onChange={(
                              value
                            ) =>
                              actualizarDetalle(
                                index,
                                {
                                  color_id:
                                    value,

                                  cantidad:
                                    undefined
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
                          label="Cantidad perdida"
                          required
                          extra={
                            stock
                              ? `Disponible: ${formatPeso(disponible)} KG`
                              : undefined
                          }
                        >
                          <InputNumber
                            value={
                              detalle.cantidad
                            }
                            min={0.01}
                            max={
                              stock
                                ? disponible
                                : undefined
                            }
                            precision={2}
                            step={0.01}
                            addonAfter="KG"
                            className="gd-full-width"
                            placeholder="0.00"
                            disabled={
                              procesando ||
                              !stock
                            }
                            onChange={(
                              value
                            ) =>
                              actualizarDetalle(
                                index,
                                {
                                  cantidad:
                                    value ===
                                    null
                                      ? undefined
                                      : Number(
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
                          label="Observación"
                        >
                          <Input
                            value={
                              detalle
                                .observacion
                            }
                            maxLength={300}
                            placeholder="Opcional"
                            disabled={
                              procesando
                            }
                            onChange={(e) =>
                              actualizarDetalle(
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


                    {
                      stock &&
                      (
                        <>
                          <Row
                            gutter={[
                              12,
                              12
                            ]}
                            className="gd-merma-stock-summary"
                          >

                            <Col
                              xs={24}
                              sm={8}
                            >
                              <Card
                                size="small"
                              >
                                <Statistic
                                  title="Disponible"
                                  value={
                                    disponible
                                  }
                                  precision={2}
                                  suffix="KG"
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
                                  title="Merma"
                                  value={
                                    cantidad
                                  }
                                  precision={2}
                                  suffix="KG"
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
                                  title="Saldo estimado"
                                  value={
                                    saldo
                                  }
                                  precision={2}
                                  suffix="KG"
                                />
                              </Card>
                            </Col>

                          </Row>


                          <Progress
                            percent={
                              Number(
                                porcentajeSaldo
                                  .toFixed(2)
                              )
                            }
                            status={
                              saldo <= 0
                                ? 'exception'
                                : 'active'
                            }
                            className="gd-merma-stock-progress"
                          />


                          {
                            cantidad >
                              disponible &&
                            (
                              <Alert
                                type="error"
                                showIcon
                                message="La cantidad ingresada supera el stock disponible."
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

      </Card>


      <Card
        className="gd-merma-total-card"
      >

        <div className="gd-merma-total-grid">

          <Statistic
            title="Materias primas"
            value={
              detalles.length
            }
          />


          <Statistic
            title="Total de merma"
            value={
              Number(
                totalMerma
              )
            }
            precision={2}
            suffix="KG"
          />

        </div>

      </Card>


      <div className="gd-merma-actions">

        <Space wrap>

          <Button
            onClick={() =>
              navigate(
                '/gestion/mermas'
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
            disabled={
              disponibilidad.length ===
                0
            }
            onClick={
              solicitarRegistro
            }
          >
            Registrar merma
          </Button>

        </Space>

      </div>

    </div>
  );
}


export default RegistrarMerma;
