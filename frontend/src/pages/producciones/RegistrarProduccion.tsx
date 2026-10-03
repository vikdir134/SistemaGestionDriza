import type { TableColumnsType } from 'antd';

import {
  App as AntdApp,
  Alert,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Empty,
  Form,
  Grid,
  Input,
  InputNumber,
  List,
  Modal,
  Progress,
  Row,
  Select,
  Skeleton,
  Space,
  Table,
  Tag,
  Typography
} from 'antd';

import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SaveOutlined
} from '@ant-design/icons';

import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { apiFetch } from '../../services/api';
import { useBloqueoAccion } from '../../hooks/useBloqueoAccion';
import BackButton from '../../components/ui/BackButton';
import PageHeader from '../../components/ui/PageHeader';
import { formatCantidad, formatPeso } from '../../utils/formatters';

import '../../styles/produccionesAntd.css';

const { Text, Title } = Typography;
const { TextArea } = Input;


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
  producto_composicion_detalle_id: number;
  material: string;
  color: string;
  porcentaje: number;
};


type Composicion = {
  producto_composicion_id: number;
  version_numero: number;
  detalles: Componente[];
};


type Producto = {
  producto_id: number;
  tipo_producto: string;
  material: string;
  medida: string;
  color: string;
  composicion_vigente: Composicion | null;
};


type DetalleProduccionForm = {
  local_id: string;
  tipo_producto_id: number | null;
  material_id: number | null;
  medida_id: number | null;
  color_id: number | null;
  opciones: OpcionesProducto;
  producto: Producto | null;
  buscandoProducto: boolean;
  cantidad_producida: number | null;
  cantidad_presentacion: number | null;
  observacion: string;
};


const nuevaKey = () => {
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
  ) {
    return crypto.randomUUID();
  }

  return [
    'produccion',
    Date.now(),
    Math.random().toString(36).slice(2)
  ].join('-');
};


const nuevoLocalId = () => {
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
  ) {
    return crypto.randomUUID();
  }

  return [
    Date.now(),
    Math.random().toString(36).slice(2)
  ].join('-');
};


const crearDetalle = (
  tipos: Opcion[]
): DetalleProduccionForm => ({
  local_id: nuevoLocalId(),
  tipo_producto_id: null,
  material_id: null,
  medida_id: null,
  color_id: null,
  opciones: {
    tipos,
    materiales: [],
    medidas: [],
    colores: []
  },
  producto: null,
  buscandoProducto: false,
  cantidad_producida: null,
  cantidad_presentacion: null,
  observacion: ''
});


const nombreProducto = (
  detalle: DetalleProduccionForm
) => {
  if (!detalle.producto) {
    return 'Producto pendiente';
  }

  return [
    detalle.producto.tipo_producto,
    detalle.producto.medida,
    detalle.producto.color
  ].filter(Boolean).join(' · ');
};


function RegistrarProduccion() {
  const navigate = useNavigate();
  const screens = Grid.useBreakpoint();

  const {
    message,
    modal
  } = AntdApp.useApp();

  const [fechaProduccion, setFechaProduccion] =
    useState<Dayjs | null>(dayjs());

  const [observacion, setObservacion] =
    useState('');

  const [tiposBase, setTiposBase] =
    useState<Opcion[]>([]);

  const [unidadKgId, setUnidadKgId] =
    useState<number | null>(null);

  const [detalles, setDetalles] =
    useState<DetalleProduccionForm[]>([]);

  const [cargandoInicial, setCargandoInicial] =
    useState(true);

  const [modalProductoAbierto, setModalProductoAbierto] =
    useState(false);

  const [detalleModal, setDetalleModal] =
    useState<DetalleProduccionForm | null>(null);

  const [localIdEditando, setLocalIdEditando] =
    useState<string | null>(null);

  const [idempotencyKey] = useState(nuevaKey);

  const {
    procesando,
    intentarBloquear,
    liberar
  } = useBloqueoAccion();


  useEffect(() => {
    const cargar = async () => {
      setCargandoInicial(true);

      try {
        const [opcionesData, unidadesData] = await Promise.all([
          apiFetch('/productos-terminados/opciones'),
          apiFetch('/catalogos/unidades-medida')
        ]);

        const tipos: Opcion[] =
          opcionesData.tipos || [];

        const unidadKg = (
          unidadesData.unidades || []
        ).find(
          (item: any) =>
            String(item.codigo).toUpperCase() === 'KG'
        );

        if (!unidadKg) {
          throw new Error(
            'No se encontró la unidad KG en el catálogo'
          );
        }

        setTiposBase(tipos);
        setUnidadKgId(
          Number(unidadKg.unidad_medida_id)
        );
      } catch (error) {
        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudieron cargar los datos para registrar producción'
        );
      } finally {
        setCargandoInicial(false);
      }
    };

    cargar();
  }, [message]);


  const cargarOpciones = async (
    params: Record<string, string>
  ) => {
    const query = new URLSearchParams(params);

    return apiFetch(
      `/productos-terminados/opciones?${query.toString()}`
    );
  };


  const actualizarDetalleModal = (
    cambios: Partial<DetalleProduccionForm>
  ) => {
    setDetalleModal((actual) =>
      actual
        ? {
            ...actual,
            ...cambios
          }
        : actual
    );
  };


  const cambiarTipo = async (
    valor: number | null
  ) => {
    actualizarDetalleModal({
      tipo_producto_id: valor,
      material_id: null,
      medida_id: null,
      color_id: null,
      producto: null,
      buscandoProducto: Boolean(valor),
      opciones: {
        tipos: tiposBase,
        materiales: [],
        medidas: [],
        colores: []
      }
    });

    if (!valor) {
      return;
    }

    try {
      const data = await cargarOpciones({
        tipo_producto_id: String(valor)
      });

      setDetalleModal((actual) => {
        if (
          !actual ||
          actual.tipo_producto_id !== valor
        ) {
          return actual;
        }

        return {
          ...actual,
          buscandoProducto: false,
          opciones: {
            tipos: tiposBase,
            materiales: data.materiales || [],
            medidas: [],
            colores: []
          }
        };
      });
    } catch (error) {
      actualizarDetalleModal({
        buscandoProducto: false
      });

      message.error(
        error instanceof Error
          ? error.message
          : 'No se pudieron cargar los materiales'
      );
    }
  };


  const cambiarMaterial = async (
    valor: number | null
  ) => {
    const actual = detalleModal;

    if (!actual) {
      return;
    }

    actualizarDetalleModal({
      material_id: valor,
      medida_id: null,
      color_id: null,
      producto: null,
      buscandoProducto: Boolean(valor),
      opciones: {
        ...actual.opciones,
        medidas: [],
        colores: []
      }
    });

    if (
      !valor ||
      !actual.tipo_producto_id
    ) {
      return;
    }

    try {
      const data = await cargarOpciones({
        tipo_producto_id:
          String(actual.tipo_producto_id),
        material_id: String(valor)
      });

      setDetalleModal((detalle) => {
        if (
          !detalle ||
          detalle.material_id !== valor
        ) {
          return detalle;
        }

        return {
          ...detalle,
          buscandoProducto: false,
          opciones: {
            ...detalle.opciones,
            medidas: data.medidas || [],
            colores: []
          }
        };
      });
    } catch (error) {
      actualizarDetalleModal({
        buscandoProducto: false
      });

      message.error(
        error instanceof Error
          ? error.message
          : 'No se pudieron cargar las medidas'
      );
    }
  };


  const cambiarMedida = async (
    valor: number | null
  ) => {
    const actual = detalleModal;

    if (!actual) {
      return;
    }

    actualizarDetalleModal({
      medida_id: valor,
      color_id: null,
      producto: null,
      buscandoProducto: Boolean(valor),
      opciones: {
        ...actual.opciones,
        colores: []
      }
    });

    if (
      !valor ||
      !actual.tipo_producto_id ||
      !actual.material_id
    ) {
      return;
    }

    try {
      const data = await cargarOpciones({
        tipo_producto_id:
          String(actual.tipo_producto_id),
        material_id:
          String(actual.material_id),
        medida_id:
          String(valor)
      });

      setDetalleModal((detalle) => {
        if (
          !detalle ||
          detalle.medida_id !== valor
        ) {
          return detalle;
        }

        return {
          ...detalle,
          buscandoProducto: false,
          opciones: {
            ...detalle.opciones,
            colores: data.colores || []
          }
        };
      });
    } catch (error) {
      actualizarDetalleModal({
        buscandoProducto: false
      });

      message.error(
        error instanceof Error
          ? error.message
          : 'No se pudieron cargar los colores'
      );
    }
  };


  const cambiarColor = async (
    valor: number | null
  ) => {
    const actual = detalleModal;

    if (!actual) {
      return;
    }

    actualizarDetalleModal({
      color_id: valor,
      producto: null,
      buscandoProducto: Boolean(valor)
    });

    if (
      !valor ||
      !actual.tipo_producto_id ||
      !actual.material_id ||
      !actual.medida_id
    ) {
      return;
    }

    try {
      const opcionesData = await cargarOpciones({
        tipo_producto_id:
          String(actual.tipo_producto_id),
        material_id:
          String(actual.material_id),
        medida_id:
          String(actual.medida_id),
        color_id:
          String(valor)
      });

      if (
        !opcionesData.producto?.producto_id
      ) {
        actualizarDetalleModal({
          buscandoProducto: false,
          producto: null
        });

        message.warning(
          'No existe un producto terminado con esa selección'
        );

        return;
      }

      const productoData = await apiFetch(
        `/productos-terminados/${opcionesData.producto.producto_id}`
      );

      setDetalleModal((detalle) => {
        if (
          !detalle ||
          detalle.color_id !== valor
        ) {
          return detalle;
        }

        return {
          ...detalle,
          buscandoProducto: false,
          producto: productoData.producto
        };
      });
    } catch (error) {
      actualizarDetalleModal({
        buscandoProducto: false,
        producto: null
      });

      message.error(
        error instanceof Error
          ? error.message
          : 'No se pudo cargar el producto'
      );
    }
  };


  const abrirNuevoProducto = () => {
    if (
      procesando ||
      detalles.length >= 50
    ) {
      return;
    }

    setLocalIdEditando(null);
    setDetalleModal(
      crearDetalle(tiposBase)
    );
    setModalProductoAbierto(true);
  };


  const abrirEditarProducto = (
    detalle: DetalleProduccionForm
  ) => {
    if (procesando) {
      return;
    }

    setLocalIdEditando(
      detalle.local_id
    );

    setDetalleModal({
      ...detalle,
      opciones: {
        tipos: [...detalle.opciones.tipos],
        materiales: [...detalle.opciones.materiales],
        medidas: [...detalle.opciones.medidas],
        colores: [...detalle.opciones.colores]
      }
    });

    setModalProductoAbierto(true);
  };


  const cerrarModalProducto = () => {
    if (
      detalleModal?.buscandoProducto
    ) {
      return;
    }

    setModalProductoAbierto(false);
    setDetalleModal(null);
    setLocalIdEditando(null);
  };


  const validarDetalle = (
    detalle: DetalleProduccionForm,
    etiqueta = 'El producto'
  ) => {
    if (!detalle.producto) {
      return `${etiqueta} debe estar completamente seleccionado`;
    }

    if (
      !detalle.producto.composicion_vigente
    ) {
      return `${etiqueta} no tiene una composición vigente`;
    }

    const cantidad = Number(
      detalle.cantidad_producida || 0
    );

    const presentacion = Number(
      detalle.cantidad_presentacion || 0
    );

    if (cantidad <= 0) {
      return `${etiqueta} debe tener una cantidad producida mayor a 0`;
    }

    if (presentacion <= 0) {
      return `${etiqueta} debe tener una presentación mayor a 0`;
    }

    const cantidadCent = Math.round(
      cantidad * 100
    );

    const presentacionCent = Math.round(
      presentacion * 100
    );

    if (
      presentacionCent <= 0 ||
      cantidadCent % presentacionCent !== 0
    ) {
      return `${etiqueta}: la cantidad producida debe ser múltiplo de su presentación`;
    }

    return null;
  };


  const guardarProductoModal = () => {
    if (!detalleModal) {
      return;
    }

    const error = validarDetalle(
      detalleModal
    );

    if (error) {
      message.error(error);
      return;
    }

    if (localIdEditando) {
      setDetalles((actuales) =>
        actuales.map((detalle) =>
          detalle.local_id === localIdEditando
            ? detalleModal
            : detalle
        )
      );

      message.success(
        'Producto actualizado en la producción'
      );
    } else {
      setDetalles((actuales) => [
        ...actuales,
        detalleModal
      ]);
    }

    setModalProductoAbierto(false);
    setDetalleModal(null);
    setLocalIdEditando(null);
  };


  const quitarProducto = (
    detalle: DetalleProduccionForm
  ) => {
    if (procesando) {
      return;
    }

    modal.confirm({
      title: 'Quitar producto',
      content:
        `Se quitará ${nombreProducto(detalle)} de esta producción.`,
      okText: 'Quitar',
      okButtonProps: {
        danger: true
      },
      cancelText: 'Cancelar',
      onOk: () => {
        setDetalles((actuales) =>
          actuales.filter(
            (item) =>
              item.local_id !==
              detalle.local_id
          )
        );
      }
    });
  };


  const totalProducido = useMemo(
    () =>
      detalles.reduce(
        (total, detalle) =>
          total +
          Number(
            detalle.cantidad_producida || 0
          ),
        0
      ),
    [detalles]
  );


  const validar = () => {
    if (!fechaProduccion) {
      return 'La fecha de producción es obligatoria';
    }

    if (!unidadKgId) {
      return 'No se pudo determinar la unidad KG';
    }

    if (detalles.length === 0) {
      return 'La producción debe tener al menos un producto';
    }

    for (
      let i = 0;
      i < detalles.length;
      i++
    ) {
      const error = validarDetalle(
        detalles[i],
        `El producto ${i + 1}`
      );

      if (error) {
        return error;
      }
    }

    return null;
  };


  const registrar = async () => {
    if (!intentarBloquear()) {
      return;
    }

    try {
      const data = await apiFetch(
        '/producciones',
        {
          method: 'POST',
          headers: {
            'Idempotency-Key':
              idempotencyKey
          },
          body: JSON.stringify({
            fecha_produccion:
              fechaProduccion!.format(
                'YYYY-MM-DD'
              ),
            observacion:
              observacion.trim() || null,
            detalles:
              detalles.map(
                (detalle) => ({
                  producto_id:
                    Number(
                      detalle.producto!
                        .producto_id
                    ),
                  cantidad_producida:
                    Number(
                      detalle.cantidad_producida
                    ),
                  cantidad_presentacion:
                    Number(
                      detalle.cantidad_presentacion
                    ),
                  unidad_presentacion_id:
                    unidadKgId,
                  observacion:
                    detalle.observacion
                      .trim() || null
                })
              )
          })
        }
      );

      if (data.reutilizada) {
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
    const error = validar();

    if (error) {
      message.error(error);
      return;
    }

    modal.confirm({
      title: 'Registrar producción',
      content:
        `Se registrarán ${detalles.length} producto(s) por un total de ${formatPeso(totalProducido)} KG. Esta operación descontará materia prima por FIFO e ingresará el producto terminado al almacén.`,
      okText: 'Registrar producción',
      cancelText: 'Cancelar',
      okButtonProps: {
        icon: <SaveOutlined />
      },
      onOk: registrar
    });
  };


  const columns:
    TableColumnsType<
      DetalleProduccionForm
    > = [
    {
      title: '#',
      key: 'numero',
      width: 56,
      align: 'center',
      render: (_, __, index) =>
        index + 1
    },
    {
      title: 'Producto',
      key: 'producto',
      minWidth: 230,
      render: (_, detalle) => (
        <div className="gd-produccion-product-cell">
          <Text strong>
            {detalle.producto
              ?.tipo_producto || '-'}
          </Text>
          <Text type="secondary">
            {[
              detalle.producto?.material,
              detalle.producto?.medida,
              detalle.producto?.color
            ].filter(Boolean).join(' · ')}
          </Text>
        </div>
      )
    },
    {
      title: 'Composición',
      key: 'composicion',
      width: 130,
      render: (_, detalle) =>
        detalle.producto
          ?.composicion_vigente
          ? (
              <Space size={6} wrap>
                <Tag color="success">
                  Lista
                </Tag>
                <Tag>
                  V{
                    detalle.producto
                      .composicion_vigente
                      .version_numero
                  }
                </Tag>
              </Space>
            )
          : (
              <Tag color="warning">
                Pendiente
              </Tag>
            )
    },
    {
      title: 'Cantidad',
      key: 'cantidad',
      width: 130,
      align: 'right',
      render: (_, detalle) => (
        <Text strong>
          {formatPeso(
            detalle.cantidad_producida || 0
          )} KG
        </Text>
      )
    },
    {
      title: 'Presentación',
      key: 'presentacion',
      width: 145,
      align: 'right',
      render: (_, detalle) => (
        <Text>
          {formatPeso(
            detalle.cantidad_presentacion || 0
          )} KG
        </Text>
      )
    },
    {
      title: 'N.° present.',
      key: 'numero_presentaciones',
      width: 125,
      align: 'right',
      render: (_, detalle) => {
        const cantidad = Number(
          detalle.cantidad_producida || 0
        );

        const presentacion = Number(
          detalle.cantidad_presentacion || 0
        );

        return formatCantidad(
          cantidad > 0 &&
          presentacion > 0
            ? cantidad / presentacion
            : 0
        );
      }
    },
    {
      title: 'Observación',
      dataIndex: 'observacion',
      key: 'observacion',
      minWidth: 180,
      ellipsis: true,
      render: (value: string) =>
        value || '-'
    },
    {
      title: 'Acciones',
      key: 'acciones',
      width: 155,
      fixed: 'right',
      render: (_, detalle) => (
        <Space size={4}>
          <Button
            type="text"
            icon={<EditOutlined />}
            disabled={procesando}
            onClick={() =>
              abrirEditarProducto(
                detalle
              )
            }
          >
            Editar
          </Button>

          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            disabled={procesando}
            onClick={() =>
              quitarProducto(
                detalle
              )
            }
          />
        </Space>
      )
    }
  ];


  if (cargandoInicial) {
    return (
      <div className="gd-produccion-page">
        <Skeleton
          active
          paragraph={{ rows: 12 }}
        />
      </div>
    );
  }


  const composicionModal =
    detalleModal?.producto
      ?.composicion_vigente;

  const cantidadModal = Number(
    detalleModal?.cantidad_producida || 0
  );

  const presentacionModal = Number(
    detalleModal?.cantidad_presentacion || 0
  );

  const numeroPresentacionesModal =
    cantidadModal > 0 &&
    presentacionModal > 0
      ? cantidadModal /
        presentacionModal
      : 0;


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
          <Row gutter={[16, 0]}>
            <Col xs={24} md={8}>
              <Form.Item
                label="Fecha de producción"
                required
              >
                <DatePicker
                  size="large"
                  value={fechaProduccion}
                  onChange={setFechaProduccion}
                  format="YYYY-MM-DD"
                  className="gd-full-width"
                  disabled={procesando}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={16}>
              <Form.Item label="Observación">
                <TextArea
                  rows={3}
                  value={observacion}
                  maxLength={500}
                  showCount
                  placeholder="Observación general de la producción"
                  disabled={procesando}
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
            icon={<PlusOutlined />}
            onClick={abrirNuevoProducto}
            disabled={
              procesando ||
              detalles.length >= 50
            }
          >
            Agregar producto
          </Button>
        }
        className="gd-produccion-section-card gd-produccion-draft-card"
      >
        {detalles.length === 0 ? (
          <Empty
            image={
              Empty.PRESENTED_IMAGE_SIMPLE
            }
            description={
              <Space
                direction="vertical"
                size={2}
              >
                <Text>
                  Aún no agregaste productos
                </Text>
                <Text type="secondary">
                  Usa “Agregar producto” para preparar la producción.
                </Text>
              </Space>
            }
          >
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={abrirNuevoProducto}
            >
              Agregar primer producto
            </Button>
          </Empty>
        ) : screens.md ? (
          <Table<DetalleProduccionForm>
            rowKey="local_id"
            columns={columns}
            dataSource={detalles}
            pagination={false}
            scroll={{ x: 1120 }}
            className="gd-produccion-draft-table"
          />
        ) : (
          <List
            dataSource={detalles}
            split={false}
            className="gd-produccion-mobile-list"
            renderItem={(detalle, index) => {
              const cantidad = Number(
                detalle.cantidad_producida || 0
              );

              const presentacion = Number(
                detalle.cantidad_presentacion || 0
              );

              const numeroPresentaciones =
                cantidad > 0 &&
                presentacion > 0
                  ? cantidad /
                    presentacion
                  : 0;

              return (
                <List.Item>
                  <Card
                    size="small"
                    className="gd-produccion-mobile-product-card"
                  >
                    <div className="gd-produccion-mobile-product-head">
                      <div>
                        <Text
                          type="secondary"
                          className="gd-produccion-mobile-product-number"
                        >
                          Producto {index + 1}
                        </Text>
                        <Title
                          level={5}
                          className="gd-produccion-mobile-product-title"
                        >
                          {detalle.producto
                            ?.tipo_producto || '-'}
                        </Title>
                        <Text type="secondary">
                          {[
                            detalle.producto?.material,
                            detalle.producto?.medida,
                            detalle.producto?.color
                          ].filter(Boolean).join(' · ')}
                        </Text>
                      </div>

                      {detalle.producto
                        ?.composicion_vigente && (
                        <Tag color="success">
                          V{
                            detalle.producto
                              .composicion_vigente
                              .version_numero
                          }
                        </Tag>
                      )}
                    </div>

                    <div className="gd-produccion-mobile-metrics">
                      <div>
                        <Text type="secondary">
                          Cantidad
                        </Text>
                        <Text strong>
                          {formatPeso(cantidad)} KG
                        </Text>
                      </div>

                      <div>
                        <Text type="secondary">
                          Presentación
                        </Text>
                        <Text strong>
                          {formatPeso(
                            presentacion
                          )} KG
                        </Text>
                      </div>

                      <div>
                        <Text type="secondary">
                          Presentaciones
                        </Text>
                        <Text strong>
                          {formatCantidad(
                            numeroPresentaciones
                          )}
                        </Text>
                      </div>
                    </div>

                    {detalle.observacion && (
                      <Text
                        type="secondary"
                        className="gd-produccion-mobile-note"
                      >
                        {detalle.observacion}
                      </Text>
                    )}

                    <div className="gd-produccion-mobile-actions">
                      <Button
                        icon={<EditOutlined />}
                        disabled={procesando}
                        onClick={() =>
                          abrirEditarProducto(
                            detalle
                          )
                        }
                      >
                        Editar
                      </Button>

                      <Button
                        danger
                        icon={<DeleteOutlined />}
                        disabled={procesando}
                        onClick={() =>
                          quitarProducto(
                            detalle
                          )
                        }
                      >
                        Quitar
                      </Button>
                    </div>
                  </Card>
                </List.Item>
              );
            }}
          />
        )}
      </Card>

      <Card className="gd-produccion-total-card">
        <div className="gd-produccion-total">
          <div>
            <Title
              level={5}
              className="gd-produccion-total-title"
            >
              Total de producción
            </Title>

            <Text type="secondary">
              {detalles.length} producto(s)
            </Text>
          </div>

          <Text
            strong
            className="gd-produccion-total-value"
          >
            {formatPeso(totalProducido)} KG
          </Text>
        </div>
      </Card>

      <div className="gd-produccion-actions">
        <Space wrap>
          <Button
            onClick={() =>
              navigate(
                '/gestion/producciones'
              )
            }
            disabled={procesando}
          >
            Cancelar
          </Button>

          <Button
            type="primary"
            icon={<SaveOutlined />}
            loading={procesando}
            disabled={cargandoInicial}
            onClick={solicitarRegistro}
          >
            Registrar producción
          </Button>
        </Space>
      </div>

      <Modal
        open={modalProductoAbierto}
        title={
          localIdEditando
            ? 'Editar producto de la producción'
            : 'Agregar producto a la producción'
        }
        width={920}
        centered={screens.md}
        rootClassName="gd-produccion-product-modal"
        maskClosable={false}
        keyboard={
          !detalleModal?.buscandoProducto
        }
        closable={
          !detalleModal?.buscandoProducto
        }
        onCancel={cerrarModalProducto}
        footer={
          <div className="gd-produccion-modal-footer">
            <Button
              onClick={cerrarModalProducto}
              disabled={
                detalleModal
                  ?.buscandoProducto
              }
            >
              Cancelar
            </Button>

            <Button
              type="primary"
              icon={<SaveOutlined />}
              loading={
                detalleModal
                  ?.buscandoProducto
              }
              onClick={
                guardarProductoModal
              }
            >
              {localIdEditando
                ? 'Guardar cambios'
                : 'Agregar producto'}
            </Button>
          </div>
        }
      >
        {detalleModal && (
          <Form
            layout="vertical"
            requiredMark={false}
          >
            <Row gutter={[14, 0]}>
              <Col xs={24} sm={12} lg={6}>
                <Form.Item
                  label="Tipo"
                  required
                >
                  <Select
                    value={
                      detalleModal
                        .tipo_producto_id
                    }
                    placeholder="Selecciona el tipo"
                    showSearch
                    optionFilterProp="label"
                    loading={
                      detalleModal
                        .buscandoProducto
                    }
                    disabled={
                      detalleModal
                        .buscandoProducto
                    }
                    options={
                      detalleModal
                        .opciones
                        .tipos
                        .map((item) => ({
                          value: item.id,
                          label: item.nombre
                        }))
                    }
                    onChange={cambiarTipo}
                    allowClear
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} lg={6}>
                <Form.Item
                  label="Material"
                  required
                >
                  <Select
                    value={
                      detalleModal
                        .material_id
                    }
                    placeholder="Selecciona el material"
                    showSearch
                    optionFilterProp="label"
                    disabled={
                      !detalleModal
                        .tipo_producto_id ||
                      detalleModal
                        .buscandoProducto
                    }
                    options={
                      detalleModal
                        .opciones
                        .materiales
                        .map((item) => ({
                          value: item.id,
                          label: item.nombre
                        }))
                    }
                    onChange={
                      cambiarMaterial
                    }
                    allowClear
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} lg={6}>
                <Form.Item
                  label="Medida"
                  required
                >
                  <Select
                    value={
                      detalleModal
                        .medida_id
                    }
                    placeholder="Selecciona la medida"
                    showSearch
                    optionFilterProp="label"
                    disabled={
                      !detalleModal
                        .material_id ||
                      detalleModal
                        .buscandoProducto
                    }
                    options={
                      detalleModal
                        .opciones
                        .medidas
                        .map((item) => ({
                          value: item.id,
                          label: item.nombre
                        }))
                    }
                    onChange={cambiarMedida}
                    allowClear
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} lg={6}>
                <Form.Item
                  label="Color"
                  required
                >
                  <Select
                    value={
                      detalleModal
                        .color_id
                    }
                    placeholder="Selecciona el color"
                    showSearch
                    optionFilterProp="label"
                    disabled={
                      !detalleModal
                        .medida_id ||
                      detalleModal
                        .buscandoProducto
                    }
                    options={
                      detalleModal
                        .opciones
                        .colores
                        .map((item) => ({
                          value: item.id,
                          label: item.nombre
                        }))
                    }
                    onChange={cambiarColor}
                    allowClear
                  />
                </Form.Item>
              </Col>
            </Row>

            {detalleModal.buscandoProducto && (
              <Alert
                type="info"
                showIcon
                message="Consultando producto..."
                className="gd-produccion-inline-alert"
              />
            )}

            {detalleModal.producto &&
              !composicionModal && (
                <Alert
                  type="warning"
                  showIcon
                  message="Composición pendiente"
                  description="Este producto existe, pero todavía no puede producirse porque no tiene una composición vigente."
                  className="gd-produccion-inline-alert"
                />
              )}

            {detalleModal.producto &&
              composicionModal && (
                <Alert
                  type="success"
                  showIcon
                  message={
                    nombreProducto(
                      detalleModal
                    )
                  }
                  description={
                    `Composición vigente V${composicionModal.version_numero}. Lista para producir.`
                  }
                  className="gd-produccion-inline-alert"
                />
              )}

            {composicionModal && (
              <Card
                size="small"
                title="Composición vigente"
                className="gd-produccion-recipe-card"
              >
                <Row gutter={[12, 12]}>
                  {composicionModal.detalles.map(
                    (componente) => {
                      const requerido =
                        cantidadModal > 0
                          ? (
                              cantidadModal *
                              Number(
                                componente.porcentaje
                              )
                            ) / 100
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
                                {componente.material}
                              </Text>
                              <Text type="secondary">
                                {componente.color}
                              </Text>
                            </div>

                            <div className="gd-produccion-recipe-values">
                              <Text strong>
                                {formatCantidad(
                                  componente.porcentaje
                                )}%
                              </Text>

                              {cantidadModal > 0 && (
                                <Text type="secondary">
                                  {formatPeso(
                                    requerido
                                  )} KG
                                </Text>
                              )}
                            </div>

                            <Progress
                              percent={
                                Number(
                                  componente.porcentaje
                                )
                              }
                              showInfo={false}
                            />
                          </div>
                        </Col>
                      );
                    }
                  )}
                </Row>
              </Card>
            )}

            <Divider />

            <Row gutter={[14, 0]}>
              <Col xs={24} md={8}>
                <Form.Item
                  label="Cantidad producida"
                  required
                >
                  <InputNumber
                    value={
                      detalleModal
                        .cantidad_producida
                    }
                    min={0.01}
                    precision={2}
                    step={0.01}
                    addonAfter="KG"
                    className="gd-full-width"
                    placeholder="0.00"
                    disabled={
                      detalleModal
                        .buscandoProducto
                    }
                    onChange={(value) =>
                      actualizarDetalleModal({
                        cantidad_producida:
                          value
                      })
                    }
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                <Form.Item
                  label="Presentación"
                  required
                  extra={
                    numeroPresentacionesModal > 0
                      ? `${formatCantidad(numeroPresentacionesModal)} presentación(es)`
                      : undefined
                  }
                >
                  <InputNumber
                    value={
                      detalleModal
                        .cantidad_presentacion
                    }
                    min={0.01}
                    precision={2}
                    step={0.01}
                    addonAfter="KG"
                    className="gd-full-width"
                    placeholder="0.00"
                    disabled={
                      detalleModal
                        .buscandoProducto
                    }
                    onChange={(value) =>
                      actualizarDetalleModal({
                        cantidad_presentacion:
                          value
                      })
                    }
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                <Form.Item label="Observación del producto">
                  <Input
                    value={
                      detalleModal
                        .observacion
                    }
                    maxLength={300}
                    placeholder="Opcional"
                    disabled={
                      detalleModal
                        .buscandoProducto
                    }
                    onChange={(e) =>
                      actualizarDetalleModal({
                        observacion:
                          e.target.value
                      })
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )}
      </Modal>
    </div>
  );
}

export default RegistrarProduccion;
