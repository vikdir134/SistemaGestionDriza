import {
  App as AntdApp,
  Button,
  Card,
  Col,
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

import BackButton
  from '../../components/ui/BackButton';

import PageHeader
  from '../../components/ui/PageHeader';

import '../../styles/productosTerminadosAntd.css';


const {
  TextArea
} = Input;


type CatalogoItem = {
  id: number;
  nombre: string;
};


type ProductoForm = {
  tipo_producto_id: number;
  material_id: number;
  medida_id: number;
  color_id: number;
  descripcion?: string;
};


function RegistrarProductoTerminado() {
  const navigate =
    useNavigate();

  const {
    message
  } = AntdApp.useApp();

  const [
    form
  ] = Form.useForm<
    ProductoForm
  >();

  const [
    tipos,
    setTipos
  ] = useState<
    CatalogoItem[]
  >([]);

  const [
    materiales,
    setMateriales
  ] = useState<
    CatalogoItem[]
  >([]);

  const [
    medidas,
    setMedidas
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

  const {
    procesando,
    intentarBloquear,
    liberar
  } = useBloqueoAccion();


  useEffect(() => {
    const cargar =
      async () => {
        setCargandoCatalogos(
          true
        );

        try {
          const [
            tiposData,
            materialesData,
            medidasData,
            coloresData
          ] = await Promise.all([
            apiFetch(
              '/catalogos/tiposProducto'
            ),
            apiFetch(
              '/catalogos/materiales'
            ),
            apiFetch(
              '/catalogos/medidas'
            ),
            apiFetch(
              '/catalogos/colores'
            )
          ]);

          setTipos(
            tiposData.items ||
            []
          );

          setMateriales(
            materialesData.items ||
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

        } catch (error) {
          message.error(
            error instanceof Error
              ? error.message
              : 'No se pudieron cargar los catálogos'
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


  const registrarProducto =
    async (
      values:
        ProductoForm
    ) => {
      if (
        !intentarBloquear()
      ) {
        return;
      }

      try {
        const data =
          await apiFetch(
            '/productos-terminados',
            {
              method: 'POST',

              body:
                JSON.stringify({
                  tipo_producto_id:
                    Number(
                      values
                        .tipo_producto_id
                    ),

                  material_id:
                    Number(
                      values
                        .material_id
                    ),

                  medida_id:
                    Number(
                      values
                        .medida_id
                    ),

                  color_id:
                    Number(
                      values
                        .color_id
                    ),

                  descripcion:
                    values
                      .descripcion
                      ?.trim() ||
                    null
                })
            }
          );


        message.success(
          'Producto terminado registrado correctamente'
        );


        navigate(
          `/gestion/productos-terminados/${data.producto.producto_id}`,
          {
            replace: true
          }
        );

      } catch (error) {
        liberar();

        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudo registrar el producto terminado'
        );
      }
    };


  return (
    <div className="gd-pt-page">

      <BackButton
        to="/gestion/productos-terminados"
        label="Volver a productos terminados"
      />


      <PageHeader
        title="Registrar producto terminado"
        description="Define el producto que se fabrica. La presentación se registra al ingresar producción."
      />


      <Card
        title="Identidad del producto"
        className="gd-pt-form-card"
      >

        {cargandoCatalogos
          ? (
              <Skeleton
                active
                paragraph={{
                  rows: 5
                }}
              />
            )
          : (
              <Form<ProductoForm>
                form={form}
                layout="vertical"
                requiredMark={false}
                disabled={
                  procesando
                }
                onFinish={
                  registrarProducto
                }
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
                  >

                    <Form.Item
                      label="Tipo"
                      name="tipo_producto_id"
                      rules={[
                        {
                          required: true,
                          message:
                            'Selecciona el tipo de producto'
                        }
                      ]}
                    >
                      <Select
                        size="large"
                        showSearch
                        optionFilterProp="label"
                        placeholder="Selecciona el tipo"
                        options={
                          tipos.map(
                            (item) => ({
                              value:
                                item.id,
                              label:
                                item.nombre
                            })
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
                      label="Material"
                      name="material_id"
                      rules={[
                        {
                          required: true,
                          message:
                            'Selecciona el material'
                        }
                      ]}
                    >
                      <Select
                        size="large"
                        showSearch
                        optionFilterProp="label"
                        placeholder="Selecciona el material"
                        options={
                          materiales.map(
                            (item) => ({
                              value:
                                item.id,
                              label:
                                item.nombre
                            })
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
                      label="Medida"
                      name="medida_id"
                      rules={[
                        {
                          required: true,
                          message:
                            'Selecciona la medida'
                        }
                      ]}
                    >
                      <Select
                        size="large"
                        showSearch
                        optionFilterProp="label"
                        placeholder="Selecciona la medida"
                        options={
                          medidas.map(
                            (item) => ({
                              value:
                                item.id,
                              label:
                                item.nombre
                            })
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
                      label="Color"
                      name="color_id"
                      rules={[
                        {
                          required: true,
                          message:
                            'Selecciona el color'
                        }
                      ]}
                    >
                      <Select
                        size="large"
                        showSearch
                        optionFilterProp="label"
                        placeholder="Selecciona el color"
                        options={
                          colores.map(
                            (item) => ({
                              value:
                                item.id,
                              label:
                                item.nombre
                            })
                          )
                        }
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
                          max: 300,
                          message:
                            'La descripción no puede superar 300 caracteres'
                        }
                      ]}
                    >
                      <TextArea
                        rows={3}
                        maxLength={300}
                        showCount
                        placeholder="Descripción opcional del producto"
                      />
                    </Form.Item>

                  </Col>

                </Row>


                <div className="gd-pt-form-actions">

                  <Space
                    wrap
                  >

                    <Button
                      onClick={() =>
                        navigate(
                          '/gestion/productos-terminados'
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
                      htmlType="submit"
                      icon={
                        <SaveOutlined />
                      }
                      loading={
                        procesando
                      }
                    >
                      Guardar producto
                    </Button>

                  </Space>

                </div>

              </Form>
            )
        }

      </Card>

    </div>
  );
}


export default
  RegistrarProductoTerminado;
