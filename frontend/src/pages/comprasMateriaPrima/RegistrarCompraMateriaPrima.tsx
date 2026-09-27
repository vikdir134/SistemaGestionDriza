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
  formatMonto,
  formatPeso
} from '../../utils/formatters';

import '../../styles/comprasMateriaPrimaAntd.css';


const {
  TextArea
} = Input;


type CatalogoItem = {
  id: number;
  nombre: string;
};


type Proveedor = {
  proveedor_id: number;
  ruc: string;
  razon_social: string;
};


type DetalleCompraMP = {
  material_id?: number;
  color_id?: number;
  cantidad?: number;
  precio_unitario?: number;
  descripcion_item?: string;
};


type CompraMPForm = {
  nombre_lote: string;
  proveedor_id: number;
  fecha_compra: Dayjs;
  numero_documento?: string;
  moneda_codigo:
    | 'PEN'
    | 'USD';
  descripcion?: string;
  detalles:
    DetalleCompraMP[];
};


const generarIdempotencyKey =
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
      'compra-mp',
      Date.now(),
      Math.random()
        .toString(36)
        .slice(2)
    ].join('-');
  };


function RegistrarCompraMateriaPrima() {
  const navigate =
    useNavigate();

  const {
    message,
    modal
  } = AntdApp.useApp();

  const [
    form
  ] = Form.useForm<
    CompraMPForm
  >();

  const [
    proveedores,
    setProveedores
  ] = useState<
    Proveedor[]
  >([]);

  const [
    materiales,
    setMateriales
  ] = useState<
    CatalogoItem[]
  >([]);

  const [
    colores,
    setColores
  ] = useState<
    CatalogoItem[]
  >([]);

  const [
    cargandoCatalogos,
    setCargandoCatalogos
  ] = useState(true);

  const [
    idempotencyKey,
    setIdempotencyKey
  ] = useState(
    generarIdempotencyKey
  );

  const {
    procesando:
      registrandoCompra,

    intentarBloquear:
      bloquearRegistro,

    liberar:
      liberarRegistro
  } = useBloqueoAccion();


  const detallesActuales =
    Form.useWatch(
      'detalles',
      form
    ) || [];


  const monedaActual =
    Form.useWatch(
      'moneda_codigo',
      form
    ) || 'PEN';


  const montoTotal =
    useMemo(
      () =>
        detallesActuales.reduce(
          (
            total,
            detalle
          ) =>
            total +
            Number(
              detalle
                ?.cantidad ||
              0
            ) *
            Number(
              detalle
                ?.precio_unitario ||
              0
            ),
          0
        ),
      [
        detallesActuales
      ]
    );


  const pesoTotal =
    useMemo(
      () =>
        detallesActuales.reduce(
          (
            total,
            detalle
          ) =>
            total +
            Number(
              detalle
                ?.cantidad ||
              0
            ),
          0
        ),
      [
        detallesActuales
      ]
    );


  useEffect(() => {
    const cargar =
      async () => {
        setCargandoCatalogos(
          true
        );

        try {
          const [
            proveedoresData,
            materialesData,
            coloresData
          ] = await Promise.all([
            apiFetch(
              '/proveedores'
            ),

            apiFetch(
              '/catalogos/materiales'
            ),

            apiFetch(
              '/catalogos/colores'
            )
          ]);


          setProveedores(
            proveedoresData
              .proveedores ||
            []
          );

          setMateriales(
            materialesData.items ||
            []
          );

          setColores(
            coloresData.items ||
            []
          );

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudieron cargar los datos para registrar el lote'
          );

        } finally {
          setCargandoCatalogos(
            false
          );
        }
      };

    cargar();
  }, [
    message
  ]);


  const validarReglas =
    (
      values:
        CompraMPForm
    ) => {
      const usados =
        new Set<string>();

      for (
        let index = 0;
        index <
        values.detalles.length;
        index++
      ) {
        const item =
          values.detalles[
            index
          ];

        if (
          !item.material_id
        ) {
          return (
            `La materia prima ${index + 1} debe tener material`
          );
        }

        if (
          !item.color_id
        ) {
          return (
            `La materia prima ${index + 1} debe tener color`
          );
        }

        if (
          Number(
            item.cantidad ||
            0
          ) <= 0
        ) {
          return (
            `La materia prima ${index + 1} debe tener una cantidad mayor a 0`
          );
        }

        if (
          Number(
            item
              .precio_unitario ??
            -1
          ) < 0
        ) {
          return (
            `La materia prima ${index + 1} debe tener un precio válido`
          );
        }

        const clave =
          `${item.material_id}-${item.color_id}`;

        if (
          usados.has(
            clave
          )
        ) {
          return (
            `La materia prima ${index + 1} repite el mismo material y color`
          );
        }

        usados.add(
          clave
        );
      }


      if (
        montoTotal <= 0
      ) {
        return (
          'El monto total del lote debe ser mayor a 0'
        );
      }


      return null;
    };


  const registrarCompra =
    async (
      values:
        CompraMPForm
    ) => {
      if (
        !bloquearRegistro()
      ) {
        return;
      }


      try {
        const data =
          await apiFetch(
            '/compras-materia-prima',
            {
              method: 'POST',

              headers: {
                'Idempotency-Key':
                  idempotencyKey
              },

              body:
                JSON.stringify({
                  nombre_lote:
                    values
                      .nombre_lote
                      .trim(),

                  proveedor_id:
                    Number(
                      values
                        .proveedor_id
                    ),

                  fecha_compra:
                    values
                      .fecha_compra
                      .format(
                        'YYYY-MM-DD'
                      ),

                  numero_documento:
                    values
                      .numero_documento
                      ?.trim() ||
                    null,

                  moneda_codigo:
                    values
                      .moneda_codigo,

                  descripcion:
                    values
                      .descripcion
                      ?.trim() ||
                    null,

                  detalles:
                    values.detalles.map(
                      (item) => ({
                        material_id:
                          Number(
                            item.material_id
                          ),

                        color_id:
                          Number(
                            item.color_id
                          ),

                        cantidad:
                          Number(
                            item.cantidad
                          ),

                        precio_unitario:
                          Number(
                            item
                              .precio_unitario
                          ),

                        descripcion_item:
                          item
                            .descripcion_item
                            ?.trim() ||
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
            'El lote ya había sido registrado. Se recuperó el registro existente sin duplicar el stock.'
          );

        } else {
          message.success(
            'Lote registrado e ingresado al almacén correctamente'
          );
        }


        /*
         * La operación ya fue confirmada.
         * Una acción futura sí necesita una key nueva.
         */
        setIdempotencyKey(
          generarIdempotencyKey()
        );


        navigate(
          `/gestion/compras-materia-prima/${data.compra.compra_materia_prima_id}`,
          {
            replace: true
          }
        );

      } catch (error) {
        /*
         * Conservamos la misma Idempotency-Key
         * para un reintento de esta misma operación.
         */
        liberarRegistro();

        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudo registrar el lote'
        );

        throw error;
      }
    };


  const solicitarRegistro =
    async () => {
      let values:
        CompraMPForm;

      try {
        values =
          await form
            .validateFields();

      } catch {
        return;
      }


      const error =
        validarReglas(
          values
        );


      if (error) {
        message.error(
          error
        );

        return;
      }


      modal.confirm({
        title:
          'Registrar lote de materia prima',

        content:
          `Se registrarán ${values.detalles.length} materia(s) prima(s), ${formatPeso(pesoTotal)} KG en total y un monto de ${formatMonto(montoTotal)} ${values.moneda_codigo}. La operación ingresará stock al almacén de materia prima.`,

        okText:
          'Registrar lote',

        cancelText:
          'Cancelar',

        okButtonProps: {
          icon:
            <SaveOutlined />
        },

        onOk: () =>
          registrarCompra(
            values
          )
      });
    };


  if (
    cargandoCatalogos
  ) {
    return (
      <div className="gd-compra-mp-page">

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
    <div className="gd-compra-mp-page">

      <BackButton
        to="/gestion/compras-materia-prima"
        label="Volver a materia prima"
      />


      <PageHeader
        title="Registrar lote de materia prima"
        description="Registra una compra o importación de fibra e ingresa automáticamente sus materias primas al almacén."
      />


      <Card
        title="Datos del lote"
        className="gd-compra-mp-section-card"
      >

        <Form<
          CompraMPForm
        >
          form={form}
          layout="vertical"
          requiredMark={false}
          disabled={
            registrandoCompra
          }
          initialValues={{
            fecha_compra:
              dayjs(),

            moneda_codigo:
              'PEN',

            detalles: [
              {
                material_id:
                  undefined,

                color_id:
                  undefined,

                cantidad:
                  undefined,

                precio_unitario:
                  undefined,

                descripcion_item:
                  ''
              }
            ]
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
              lg={12}
            >

              <Form.Item
                label="Nombre del lote"
                name="nombre_lote"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message:
                      'Ingresa el nombre del lote'
                  },
                  {
                    max: 150,
                    message:
                      'El nombre del lote no puede superar 150 caracteres'
                  }
                ]}
              >
                <Input
                  size="large"
                  maxLength={150}
                  placeholder="Ejemplo: IMPORTACIÓN SEP 2026"
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              lg={12}
            >

              <Form.Item
                label="Proveedor"
                name="proveedor_id"
                rules={[
                  {
                    required: true,
                    message:
                      'Selecciona un proveedor'
                  }
                ]}
              >
                <Select
                  size="large"
                  showSearch
                  optionFilterProp="label"
                  placeholder="Selecciona un proveedor"
                  options={
                    proveedores.map(
                      (proveedor) => ({
                        value:
                          proveedor
                            .proveedor_id,

                        label:
                          `${proveedor.razon_social} · ${proveedor.ruc}`
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
                label="Fecha de compra"
                name="fecha_compra"
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
              sm={12}
              lg={6}
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
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
              lg={12}
            >

              <Form.Item
                label="Número de documento"
                name="numero_documento"
                rules={[
                  {
                    max: 100,
                    message:
                      'El documento no puede superar 100 caracteres'
                  }
                ]}
              >
                <Input
                  size="large"
                  maxLength={100}
                  placeholder="Factura, guía, etc."
                />
              </Form.Item>

            </Col>


            <Col
              xs={24}
            >

              <Form.Item
                label="Descripción"
                name="descripcion"
                rules={[
                  {
                    max: 400,
                    message:
                      'La descripción no puede superar 400 caracteres'
                  }
                ]}
              >
                <TextArea
                  rows={3}
                  maxLength={400}
                  showCount
                  placeholder="Observación general de la compra o importación"
                />
              </Form.Item>

            </Col>

          </Row>

        </Form>

      </Card>


      <Card
        title="Materias primas del lote"
        className="gd-compra-mp-section-card"
      >

        <Alert
          type="info"
          showIcon
          message="Cada materia prima se identifica por Material + Color y se registra en KG."
          description="No repitas el mismo material y color dentro del mismo lote."
          className="gd-compra-mp-main-rule"
        />


        <Form<
          CompraMPForm
        >
          form={form}
          layout="vertical"
          requiredMark={false}
          disabled={
            registrandoCompra
          }
        >

          <Form.List
            name="detalles"
          >
            {(
              fields,
              {
                add,
                remove
              }
            ) => (
              <Space
                direction="vertical"
                size={14}
                className="gd-compra-mp-items-space"
              >

                {
                  fields.map(
                    (
                      field,
                      index
                    ) => {
                      const item =
                        detallesActuales[
                          index
                        ] || {};

                      const subtotal =
                        Number(
                          item.cantidad ||
                          0
                        ) *
                        Number(
                          item
                            .precio_unitario ||
                          0
                        );


                      return (
                        <Card
                          key={
                            field.key
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
                                registrandoCompra ||
                                fields.length ===
                                  1
                              }
                              onClick={() => {
                                if (
                                  fields.length ===
                                  1
                                ) {
                                  message.warning(
                                    'El lote debe tener al menos una materia prima'
                                  );

                                  return;
                                }

                                remove(
                                  field.name
                                );
                              }}
                            >
                              Quitar
                            </Button>
                          }
                          className="gd-compra-mp-item-card"
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
                                name={[
                                  field.name,
                                  'material_id'
                                ]}
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      'Selecciona el material'
                                  }
                                ]}
                              >
                                <Select
                                  showSearch
                                  optionFilterProp="label"
                                  placeholder="Selecciona"
                                  options={
                                    materiales.map(
                                      (material) => ({
                                        value:
                                          material.id,

                                        label:
                                          material.nombre
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
                                label="Color"
                                name={[
                                  field.name,
                                  'color_id'
                                ]}
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      'Selecciona el color'
                                  }
                                ]}
                              >
                                <Select
                                  showSearch
                                  optionFilterProp="label"
                                  placeholder="Selecciona"
                                  options={
                                    colores.map(
                                      (color) => ({
                                        value:
                                          color.id,

                                        label:
                                          color.nombre
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
                                label="Cantidad"
                                name={[
                                  field.name,
                                  'cantidad'
                                ]}
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      'Ingresa la cantidad'
                                  }
                                ]}
                              >
                                <InputNumber
                                  min={0.01}
                                  precision={2}
                                  step={0.01}
                                  addonAfter="KG"
                                  className="gd-full-width"
                                  placeholder="0.00"
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
                                name={[
                                  field.name,
                                  'precio_unitario'
                                ]}
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      'Ingresa el precio'
                                  }
                                ]}
                              >
                                <InputNumber
                                  min={0}
                                  precision={2}
                                  step={0.01}
                                  addonAfter={
                                    monedaActual
                                  }
                                  className="gd-full-width"
                                  placeholder="0.00"
                                />
                              </Form.Item>

                            </Col>


                            <Col
                              xs={24}
                              lg={18}
                            >

                              <Form.Item
                                label="Descripción opcional"
                                name={[
                                  field.name,
                                  'descripcion_item'
                                ]}
                                rules={[
                                  {
                                    max: 300,
                                    message:
                                      'La descripción no puede superar 300 caracteres'
                                  }
                                ]}
                              >
                                <Input
                                  maxLength={300}
                                  placeholder="Ejemplo: Fibra virgen"
                                />
                              </Form.Item>

                            </Col>


                            <Col
                              xs={24}
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
                                    monedaActual
                                  }
                                  disabled
                                />
                              </Form.Item>

                            </Col>

                          </Row>

                        </Card>
                      );
                    }
                  )
                }


                <Button
                  block
                  type="dashed"
                  icon={
                    <PlusOutlined />
                  }
                  disabled={
                    registrandoCompra
                  }
                  onClick={() =>
                    add({
                      material_id:
                        undefined,

                      color_id:
                        undefined,

                      cantidad:
                        undefined,

                      precio_unitario:
                        undefined,

                      descripcion_item:
                        ''
                    })
                  }
                >
                  Agregar materia prima
                </Button>

              </Space>
            )}
          </Form.List>

        </Form>

      </Card>


      <Card
        className="gd-compra-mp-total-card"
      >

        <div className="gd-compra-mp-total-grid">

          <Statistic
            title="Materias primas"
            value={
              detallesActuales
                .length
            }
          />


          <Statistic
            title="Peso total"
            value={
              Number(
                pesoTotal
              )
            }
            precision={2}
            suffix="KG"
          />


          <Statistic
            title="Total del lote"
            value={
              Number(
                montoTotal
              )
            }
            precision={2}
            suffix={
              monedaActual
            }
          />

        </div>

      </Card>


      <div className="gd-compra-mp-actions">

        <Space
          wrap
        >

          <Button
            onClick={() =>
              navigate(
                '/gestion/compras-materia-prima'
              )
            }
            disabled={
              registrandoCompra
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
              registrandoCompra
            }
            disabled={
              cargandoCatalogos
            }
            onClick={
              solicitarRegistro
            }
          >
            Registrar lote e ingresar stock
          </Button>

        </Space>

      </div>

    </div>
  );
}


export default RegistrarCompraMateriaPrima;
