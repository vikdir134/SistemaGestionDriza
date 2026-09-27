import {
  App as AntdApp,
  Alert,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Progress,
  Row,
  Select,
  Skeleton,
  Space,
  Tag,
  Typography
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
  formatCantidad,
  formatPeso
} from '../../utils/formatters';

import '../../styles/produccionesAntd.css';


const {
  Text,
  Title
} = Typography;

const {
  TextArea
} = Input;


type Opcion = {
  id: number;
  nombre: string;
};


type OpcionesProducto = {
  tipos: Opcion[];
  materiales: Opcion[];
  medidas: Opcion[];
  colores: Opcion[];
};


type Componente = {
  producto_composicion_detalle_id:
    number;

  material:
    string;

  color:
    string;

  porcentaje:
    number;
};


type Composicion = {
  producto_composicion_id:
    number;

  version_numero:
    number;

  detalles:
    Componente[];
};


type Producto = {
  producto_id: number;
  tipo_producto: string;
  material: string;
  medida: string;
  color: string;

  composicion_vigente:
    Composicion | null;
};


type DetalleProduccionForm = {
  local_id: string;

  tipo_producto_id:
    number | null;

  material_id:
    number | null;

  medida_id:
    number | null;

  color_id:
    number | null;

  opciones:
    OpcionesProducto;

  producto:
    Producto | null;

  buscandoProducto:
    boolean;

  cantidad_producida:
    number | null;

  cantidad_presentacion:
    number | null;

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
    'produccion',
    Date.now(),
    Math.random()
      .toString(36)
      .slice(2)
  ].join('-');
};


const nuevoLocalId = () => {
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


const crearDetalle = (
  tipos:
    Opcion[]
): DetalleProduccionForm => ({
  local_id:
    nuevoLocalId(),

  tipo_producto_id:
    null,

  material_id:
    null,

  medida_id:
    null,

  color_id:
    null,

  opciones: {
    tipos,
    materiales: [],
    medidas: [],
    colores: []
  },

  producto:
    null,

  buscandoProducto:
    false,

  cantidad_producida:
    null,

  cantidad_presentacion:
    null,

  observacion:
    ''
});


function RegistrarProduccion() {
  const navigate =
    useNavigate();

  const {
    message,
    modal
  } = AntdApp.useApp();

  const [
    fechaProduccion,
    setFechaProduccion
  ] = useState<Dayjs | null>(
    dayjs()
  );

  const [
    observacion,
    setObservacion
  ] = useState('');

  const [
    tiposBase,
    setTiposBase
  ] = useState<Opcion[]>([]);

  const [
    unidadKgId,
    setUnidadKgId
  ] = useState<
    number | null
  >(null);

  const [
    detalles,
    setDetalles
  ] = useState<
    DetalleProduccionForm[]
  >([]);

  const [
    cargandoInicial,
    setCargandoInicial
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
        setCargandoInicial(
          true
        );

        try {
          const [
            opcionesData,
            unidadesData
          ] = await Promise.all([
            apiFetch(
              '/productos-terminados/opciones'
            ),

            apiFetch(
              '/catalogos/unidades-medida'
            )
          ]);


          const tipos:
            Opcion[] =
            opcionesData.tipos ||
            [];


          const unidadKg =
            (
              unidadesData.unidades ||
              []
            ).find(
              (item: any) =>
                String(
                  item.codigo
                ).toUpperCase() ===
                'KG'
            );


          if (!unidadKg) {
            throw new Error(
              'No se encontró la unidad KG en el catálogo'
            );
          }


          setTiposBase(
            tipos
          );

          setUnidadKgId(
            Number(
              unidadKg
                .unidad_medida_id
            )
          );

          setDetalles([
            crearDetalle(
              tipos
            )
          ]);

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudieron cargar los datos para registrar producción'
          );

        } finally {
          setCargandoInicial(
            false
          );
        }
      };

    cargar();
  }, [
    message
  ]);


  const actualizarDetalle = (
    index: number,
    cambios:
      Partial<
        DetalleProduccionForm
      >
  ) => {
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


  const cargarOpciones =
    async (
      params:
        Record<
          string,
          string
        >
    ) => {
      const query =
        new URLSearchParams(
          params
        );

      return apiFetch(
        `/productos-terminados/opciones?${query.toString()}`
      );
    };


  const cambiarTipo =
    async (
      index: number,
      valor:
        number | null
    ) => {
      actualizarDetalle(
        index,
        {
          tipo_producto_id:
            valor,

          material_id:
            null,

          medida_id:
            null,

          color_id:
            null,

          producto:
            null,

          buscandoProducto:
            Boolean(valor),

          opciones: {
            tipos:
              tiposBase,
            materiales: [],
            medidas: [],
            colores: []
          }
        }
      );


      if (!valor) {
        return;
      }


      try {
        const data =
          await cargarOpciones({
            tipo_producto_id:
              String(valor)
          });


        actualizarDetalle(
          index,
          {
            buscandoProducto:
              false,

            opciones: {
              tipos:
                tiposBase,

              materiales:
                data.materiales ||
                [],

              medidas: [],
              colores: []
            }
          }
        );

      } catch (error) {
        actualizarDetalle(
          index,
          {
            buscandoProducto:
              false
          }
        );

        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudieron cargar los materiales'
        );
      }
    };


  const cambiarMaterial =
    async (
      index: number,
      valor:
        number | null
    ) => {
      const detalle =
        detalles[index];


      actualizarDetalle(
        index,
        {
          material_id:
            valor,

          medida_id:
            null,

          color_id:
            null,

          producto:
            null,

          buscandoProducto:
            Boolean(valor),

          opciones: {
            ...detalle.opciones,
            medidas: [],
            colores: []
          }
        }
      );


      if (
        !valor ||
        !detalle
          .tipo_producto_id
      ) {
        return;
      }


      try {
        const data =
          await cargarOpciones({
            tipo_producto_id:
              String(
                detalle
                  .tipo_producto_id
              ),

            material_id:
              String(valor)
          });


        actualizarDetalle(
          index,
          {
            buscandoProducto:
              false,

            opciones: {
              ...detalle.opciones,

              medidas:
                data.medidas ||
                [],

              colores: []
            }
          }
        );

      } catch (error) {
        actualizarDetalle(
          index,
          {
            buscandoProducto:
              false
          }
        );

        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudieron cargar las medidas'
        );
      }
    };


  const cambiarMedida =
    async (
      index: number,
      valor:
        number | null
    ) => {
      const detalle =
        detalles[index];


      actualizarDetalle(
        index,
        {
          medida_id:
            valor,

          color_id:
            null,

          producto:
            null,

          buscandoProducto:
            Boolean(valor),

          opciones: {
            ...detalle.opciones,
            colores: []
          }
        }
      );


      if (
        !valor ||
        !detalle
          .tipo_producto_id ||
        !detalle.material_id
      ) {
        return;
      }


      try {
        const data =
          await cargarOpciones({
            tipo_producto_id:
              String(
                detalle
                  .tipo_producto_id
              ),

            material_id:
              String(
                detalle.material_id
              ),

            medida_id:
              String(valor)
          });


        actualizarDetalle(
          index,
          {
            buscandoProducto:
              false,

            opciones: {
              ...detalle.opciones,

              colores:
                data.colores ||
                []
            }
          }
        );

      } catch (error) {
        actualizarDetalle(
          index,
          {
            buscandoProducto:
              false
          }
        );

        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudieron cargar los colores'
        );
      }
    };


  const cambiarColor =
    async (
      index: number,
      valor:
        number | null
    ) => {
      const detalle =
        detalles[index];


      actualizarDetalle(
        index,
        {
          color_id:
            valor,

          producto:
            null,

          buscandoProducto:
            Boolean(valor)
        }
      );


      if (
        !valor ||
        !detalle
          .tipo_producto_id ||
        !detalle
          .material_id ||
        !detalle
          .medida_id
      ) {
        return;
      }


      try {
        const opcionesData =
          await cargarOpciones({
            tipo_producto_id:
              String(
                detalle
                  .tipo_producto_id
              ),

            material_id:
              String(
                detalle.material_id
              ),

            medida_id:
              String(
                detalle.medida_id
              ),

            color_id:
              String(valor)
          });


        if (
          !opcionesData.producto
            ?.producto_id
        ) {
          actualizarDetalle(
            index,
            {
              buscandoProducto:
                false,

              producto:
                null
            }
          );

          message.warning(
            'No existe un producto terminado con esa selección'
          );

          return;
        }


        const productoData =
          await apiFetch(
            `/productos-terminados/${opcionesData.producto.producto_id}`
          );


        actualizarDetalle(
          index,
          {
            buscandoProducto:
              false,

            producto:
              productoData
                .producto
          }
        );

      } catch (error) {
        actualizarDetalle(
          index,
          {
            buscandoProducto:
              false,

            producto:
              null
          }
        );

        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudo cargar el producto'
        );
      }
    };


  const agregarProducto = () => {
    if (
      procesando ||
      detalles.length >= 50
    ) {
      return;
    }

    setDetalles(
      (actuales) => [
        ...actuales,
        crearDetalle(
          tiposBase
        )
      ]
    );
  };


  const quitarProducto = (
    index: number
  ) => {
    if (
      procesando
    ) {
      return;
    }

    if (
      detalles.length ===
      1
    ) {
      message.warning(
        'La producción debe tener al menos un producto'
      );

      return;
    }

    setDetalles(
      (actuales) =>
        actuales.filter(
          (
            _,
            i
          ) =>
            i !== index
        )
    );
  };


  const totalProducido =
    useMemo(
      () =>
        detalles.reduce(
          (
            total,
            detalle
          ) =>
            total +
            Number(
              detalle
                .cantidad_producida ||
              0
            ),
          0
        ),
      [
        detalles
      ]
    );


  const validar = () => {
    if (
      !fechaProduccion
    ) {
      return (
        'La fecha de producción es obligatoria'
      );
    }


    if (
      !unidadKgId
    ) {
      return (
        'No se pudo determinar la unidad KG'
      );
    }


    if (
      detalles.length === 0
    ) {
      return (
        'La producción debe tener al menos un producto'
      );
    }


    for (
      let i = 0;
      i < detalles.length;
      i++
    ) {
      const detalle =
        detalles[i];


      if (
        !detalle.producto
      ) {
        return (
          `Completa la selección del producto ${i + 1}`
        );
      }


      if (
        !detalle.producto
          .composicion_vigente
      ) {
        return (
          `El producto ${i + 1} no tiene una composición vigente`
        );
      }


      const cantidad =
        Number(
          detalle
            .cantidad_producida ||
          0
        );


      const presentacion =
        Number(
          detalle
            .cantidad_presentacion ||
          0
        );


      if (
        cantidad <= 0
      ) {
        return (
          `La cantidad producida del producto ${i + 1} debe ser mayor a 0`
        );
      }


      if (
        presentacion <= 0
      ) {
        return (
          `La presentación del producto ${i + 1} debe ser mayor a 0`
        );
      }


      /*
       * La UI trabaja con 2 decimales.
       * El backend conserva su validación definitiva.
       */
      const cantidadCent =
        Math.round(
          cantidad * 100
        );

      const presentacionCent =
        Math.round(
          presentacion * 100
        );


      if (
        presentacionCent <= 0 ||
        cantidadCent %
          presentacionCent !==
          0
      ) {
        return (
          `La cantidad producida del producto ${i + 1} debe ser múltiplo de su presentación`
        );
      }
    }


    return null;
  };


  const registrar =
    async () => {
      if (
        !intentarBloquear()
      ) {
        return;
      }


      try {
        const data =
          await apiFetch(
            '/producciones',
            {
              method: 'POST',

              headers: {
                'Idempotency-Key':
                  idempotencyKey
              },

              body:
                JSON.stringify({
                  fecha_produccion:
                    fechaProduccion!
                      .format(
                        'YYYY-MM-DD'
                      ),

                  observacion:
                    observacion
                      .trim() ||
                    null,

                  detalles:
                    detalles.map(
                      (
                        detalle
                      ) => ({
                        producto_id:
                          Number(
                            detalle
                              .producto!
                              .producto_id
                          ),

                        cantidad_producida:
                          Number(
                            detalle
                              .cantidad_producida
                          ),

                        cantidad_presentacion:
                          Number(
                            detalle
                              .cantidad_presentacion
                          ),

                        unidad_presentacion_id:
                          unidadKgId,

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
            'La producción ya había sido registrada. Se recuperó el registro existente sin duplicar stock.'
          );

        } else {
          message.success(
            'Producción registrada correctamente'
          );
        }


        navigate(
          `/gestion/producciones/${data.produccion.produccion_id}`,
          {
            replace: true
          }
        );

      } catch (error) {
        liberar();

        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudo registrar la producción'
        );
      }
    };


  const solicitarRegistro = () => {
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
        'Registrar producción',

      content:
        `Se registrarán ${detalles.length} producto(s) por un total de ${formatPeso(totalProducido)} KG. Esta operación descontará materia prima por FIFO e ingresará el producto terminado al almacén.`,

      okText:
        'Registrar producción',

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
    cargandoInicial
  ) {
    return (
      <div className="gd-produccion-page">

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
    <div className="gd-produccion-page">

      <BackButton
        to="/gestion/producciones"
        label="Volver a producción"
      />


      <PageHeader
        title="Registrar producción"
        description="Registra los productos fabricados y el ingreso al almacén de producto terminado."
      />


      <Card
        title="Datos de producción"
        className="gd-produccion-section-card"
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
              md={8}
            >

              <Form.Item
                label="Fecha de producción"
                required
              >
                <DatePicker
                  size="large"
                  value={
                    fechaProduccion
                  }
                  onChange={
                    setFechaProduccion
                  }
                  format="YYYY-MM-DD"
                  className="gd-full-width"
                  disabled={
                    procesando
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
                <TextArea
                  rows={3}
                  value={
                    observacion
                  }
                  maxLength={500}
                  showCount
                  placeholder="Observación general de la producción"
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

        </Form>

      </Card>


      <Card
        title="Productos fabricados"
        extra={
          <Button
            type="primary"
            ghost
            icon={
              <PlusOutlined />
            }
            onClick={
              agregarProducto
            }
            disabled={
              procesando ||
              detalles.length >= 50
            }
          >
            Agregar producto
          </Button>
        }
        className="gd-produccion-section-card"
      >

        <Space
          direction="vertical"
          size={18}
          className="gd-produccion-products-space"
        >

          {
            detalles.map(
              (
                detalle,
                index
              ) => {
                const composicion =
                  detalle.producto
                    ?.composicion_vigente;

                const cantidadProducida =
                  Number(
                    detalle
                      .cantidad_producida ||
                    0
                  );

                const presentacion =
                  Number(
                    detalle
                      .cantidad_presentacion ||
                    0
                  );

                const numeroPresentaciones =
                  cantidadProducida > 0 &&
                  presentacion > 0
                    ? cantidadProducida /
                      presentacion
                    : 0;


                return (
                  <Card
                    key={
                      detalle.local_id
                    }
                    size="small"
                    title={
                      `Producto ${index + 1}`
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
                        onClick={() =>
                          quitarProducto(
                            index
                          )
                        }
                      >
                        Quitar
                      </Button>
                    }
                    className="gd-produccion-product-card"
                  >

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
                          xl={6}
                        >

                          <Form.Item
                            label="Tipo"
                            required
                          >
                            <Select
                              value={
                                detalle
                                  .tipo_producto_id
                              }
                              placeholder="Selecciona el tipo"
                              showSearch
                              optionFilterProp="label"
                              loading={
                                detalle
                                  .buscandoProducto
                              }
                              disabled={
                                procesando
                              }
                              options={
                                detalle
                                  .opciones
                                  .tipos
                                  .map(
                                    (
                                      item
                                    ) => ({
                                      value:
                                        item.id,
                                      label:
                                        item.nombre
                                    })
                                  )
                              }
                              onChange={(
                                value
                              ) =>
                                cambiarTipo(
                                  index,
                                  value
                                )
                              }
                              allowClear
                            />
                          </Form.Item>

                        </Col>


                        <Col
                          xs={24}
                          sm={12}
                          xl={6}
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
                              placeholder="Selecciona el material"
                              showSearch
                              optionFilterProp="label"
                              disabled={
                                procesando ||
                                !detalle
                                  .tipo_producto_id ||
                                detalle
                                  .buscandoProducto
                              }
                              options={
                                detalle
                                  .opciones
                                  .materiales
                                  .map(
                                    (
                                      item
                                    ) => ({
                                      value:
                                        item.id,
                                      label:
                                        item.nombre
                                    })
                                  )
                              }
                              onChange={(
                                value
                              ) =>
                                cambiarMaterial(
                                  index,
                                  value
                                )
                              }
                              allowClear
                            />
                          </Form.Item>

                        </Col>


                        <Col
                          xs={24}
                          sm={12}
                          xl={6}
                        >

                          <Form.Item
                            label="Medida"
                            required
                          >
                            <Select
                              value={
                                detalle
                                  .medida_id
                              }
                              placeholder="Selecciona la medida"
                              showSearch
                              optionFilterProp="label"
                              disabled={
                                procesando ||
                                !detalle
                                  .material_id ||
                                detalle
                                  .buscandoProducto
                              }
                              options={
                                detalle
                                  .opciones
                                  .medidas
                                  .map(
                                    (
                                      item
                                    ) => ({
                                      value:
                                        item.id,
                                      label:
                                        item.nombre
                                    })
                                  )
                              }
                              onChange={(
                                value
                              ) =>
                                cambiarMedida(
                                  index,
                                  value
                                )
                              }
                              allowClear
                            />
                          </Form.Item>

                        </Col>


                        <Col
                          xs={24}
                          sm={12}
                          xl={6}
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
                              placeholder="Selecciona el color"
                              showSearch
                              optionFilterProp="label"
                              disabled={
                                procesando ||
                                !detalle
                                  .medida_id ||
                                detalle
                                  .buscandoProducto
                              }
                              options={
                                detalle
                                  .opciones
                                  .colores
                                  .map(
                                    (
                                      item
                                    ) => ({
                                      value:
                                        item.id,
                                      label:
                                        item.nombre
                                    })
                                  )
                              }
                              onChange={(
                                value
                              ) =>
                                cambiarColor(
                                  index,
                                  value
                                )
                              }
                              allowClear
                            />
                          </Form.Item>

                        </Col>

                      </Row>


                      {
                        detalle
                          .buscandoProducto &&
                        (
                          <Alert
                            type="info"
                            showIcon
                            message="Consultando producto..."
                            className="gd-produccion-inline-alert"
                          />
                        )
                      }


                      {
                        detalle.producto &&
                        !composicion &&
                        (
                          <Alert
                            type="warning"
                            showIcon
                            message="Composición pendiente"
                            description="Este producto existe, pero todavía no puede producirse porque no tiene una composición vigente."
                            className="gd-produccion-inline-alert"
                          />
                        )
                      }


                      {
                        composicion &&
                        (
                          <Card
                            size="small"
                            title="Composición vigente"
                            extra={
                              <Space
                                size={6}
                              >

                                <Tag
                                  color="success"
                                >
                                  Lista para producir
                                </Tag>

                                <Tag>
                                  V{
                                    composicion
                                      .version_numero
                                  }
                                </Tag>

                              </Space>
                            }
                            className="gd-produccion-recipe-card"
                          >

                            <Row
                              gutter={[
                                12,
                                12
                              ]}
                            >

                              {
                                composicion
                                  .detalles
                                  .map(
                                    (
                                      componente
                                    ) => {
                                      const requerido =
                                        cantidadProducida >
                                        0
                                          ? (
                                              cantidadProducida *
                                              Number(
                                                componente
                                                  .porcentaje
                                              )
                                            ) /
                                            100
                                          : 0;


                                      return (
                                        <Col
                                          xs={24}
                                          md={12}
                                          key={
                                            componente
                                              .producto_composicion_detalle_id
                                          }
                                        >

                                          <div className="gd-produccion-recipe-item">

                                            <div>
                                              <Text strong>
                                                {
                                                  componente
                                                    .material
                                                }
                                              </Text>

                                              <Text
                                                type="secondary"
                                              >
                                                {
                                                  componente
                                                    .color
                                                }
                                              </Text>
                                            </div>


                                            <div className="gd-produccion-recipe-values">

                                              <Text strong>
                                                {
                                                  formatCantidad(
                                                    componente
                                                      .porcentaje
                                                  )
                                                }%
                                              </Text>

                                              {
                                                cantidadProducida >
                                                  0 &&
                                                (
                                                  <Text
                                                    type="secondary"
                                                  >
                                                    {
                                                      formatPeso(
                                                        requerido
                                                      )
                                                    } KG
                                                  </Text>
                                                )
                                              }

                                            </div>


                                            <Progress
                                              percent={
                                                Number(
                                                  componente
                                                    .porcentaje
                                                )
                                              }
                                              showInfo={
                                                false
                                              }
                                            />

                                          </div>

                                        </Col>
                                      );
                                    }
                                  )
                              }

                            </Row>

                          </Card>
                        )
                      }


                      <Divider />


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
                            label="Cantidad producida"
                            required
                          >
                            <InputNumber
                              value={
                                detalle
                                  .cantidad_producida
                              }
                              min={0.01}
                              precision={2}
                              step={0.01}
                              addonAfter="KG"
                              className="gd-full-width"
                              placeholder="0.00"
                              disabled={
                                procesando
                              }
                              onChange={(
                                value
                              ) =>
                                actualizarDetalle(
                                  index,
                                  {
                                    cantidad_producida:
                                      value
                                  }
                                )
                              }
                            />
                          </Form.Item>

                        </Col>


                        <Col
                          xs={24}
                          md={8}
                        >

                          <Form.Item
                            label="Presentación"
                            required
                            extra={
                              numeroPresentaciones >
                              0
                                ? `${formatCantidad(numeroPresentaciones)} presentación(es)`
                                : undefined
                            }
                          >
                            <InputNumber
                              value={
                                detalle
                                  .cantidad_presentacion
                              }
                              min={0.01}
                              precision={2}
                              step={0.01}
                              addonAfter="KG"
                              className="gd-full-width"
                              placeholder="0.00"
                              disabled={
                                procesando
                              }
                              onChange={(
                                value
                              ) =>
                                actualizarDetalle(
                                  index,
                                  {
                                    cantidad_presentacion:
                                      value
                                  }
                                )
                              }
                            />
                          </Form.Item>

                        </Col>


                        <Col
                          xs={24}
                          md={8}
                        >

                          <Form.Item
                            label="Observación del producto"
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
                                      e.target.value
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


      <Card
        className="gd-produccion-total-card"
      >

        <div className="gd-produccion-total">

          <div>

            <Title
              level={5}
              className="gd-produccion-total-title"
            >
              Total de producción
            </Title>

            <Text
              type="secondary"
            >
              {
                detalles.length
              } producto(s)
            </Text>

          </div>


          <Text
            strong
            className="gd-produccion-total-value"
          >
            {
              formatPeso(
                totalProducido
              )
            } KG
          </Text>

        </div>

      </Card>


      <div className="gd-produccion-actions">

        <Space
          wrap
        >

          <Button
            onClick={() =>
              navigate(
                '/gestion/producciones'
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
              cargandoInicial
            }
            onClick={
              solicitarRegistro
            }
          >
            Registrar producción
          </Button>

        </Space>

      </div>

    </div>
  );
}


export default RegistrarProduccion;
