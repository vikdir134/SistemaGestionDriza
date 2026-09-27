import {
  App as AntdApp,
  Button,
  Card,
  Form,
  Result,
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
  useNavigate,
  useParams
} from 'react-router-dom';

import {
  apiFetch
} from '../../services/api';

import {
  useBloqueoAccion
} from '../../hooks/useBloqueoAccion';

import ClienteForm
  from '../../components/clientes/ClienteForm';

import type {
  ClienteFormData
} from '../../components/clientes/ClienteForm';

import BackButton
  from '../../components/ui/BackButton';

import PageHeader
  from '../../components/ui/PageHeader';

import '../../styles/clientes.css';


function EditarCliente() {
  const {
    cliente_id
  } = useParams();

  const navigate =
    useNavigate();

  const {
    message
  } = AntdApp.useApp();

  const [
    form
  ] = Form.useForm<
    ClienteFormData
  >();

  const [
    cargando,
    setCargando
  ] = useState(true);

  const [
    errorCarga,
    setErrorCarga
  ] = useState('');

  const {
    procesando,
    intentarBloquear,
    liberar
  } = useBloqueoAccion();


  useEffect(() => {
    const cargar =
      async () => {
        setCargando(true);
        setErrorCarga('');

        try {
          const data =
            await apiFetch(
              `/clientes/${cliente_id}`
            );

          form.setFieldsValue({
            ruc:
              data.cliente.ruc ||
              '',

            razon_social:
              data.cliente
                .razon_social ||
              '',

            direccion:
              data.cliente
                .direccion ||
              '',

            telefono:
              data.cliente
                .telefono ||
              '',

            correo:
              data.cliente
                .correo ||
              '',

            agencia_entrega:
              data.cliente
                .agencia_entrega ||
              ''
          });

        } catch (error) {
          setErrorCarga(
            error instanceof Error
              ? error.message
              : 'No se pudo cargar el cliente'
          );

        } finally {
          setCargando(false);
        }
      };

    cargar();
  }, [
    cliente_id,
    form
  ]);


  const editarCliente =
    async (
      values:
        ClienteFormData
    ) => {
      if (
        !intentarBloquear()
      ) {
        return;
      }

      try {
        await apiFetch(
          `/clientes/${cliente_id}`,
          {
            method: 'PUT',

            body:
              JSON.stringify({
                ruc:
                  values.ruc.trim(),

                razon_social:
                  values
                    .razon_social
                    .trim(),

                direccion:
                  values.direccion
                    ?.trim() || '',

                telefono:
                  values.telefono
                    ?.trim() || '',

                correo:
                  values.correo
                    ?.trim() || '',

                agencia_entrega:
                  values
                    .agencia_entrega
                    ?.trim() || ''
              })
          }
        );


        message.success(
          'Cliente actualizado correctamente'
        );


        navigate(
          '/gestion/clientes',
          {
            replace: true
          }
        );

      } catch (error) {
        liberar();

        message.error(
          error instanceof Error
            ? error.message
            : 'No se pudo actualizar el cliente'
        );
      }
    };


  return (
    <div className="gd-clientes-page">

      <BackButton
        to="/gestion/clientes"
        label="Volver a clientes"
      />


      <PageHeader
        title="Editar cliente"
        description="Actualiza la información comercial del cliente."
      />


      <Card
        title="Datos del cliente"
        className="gd-clientes-form-card"
      >

        {cargando
          ? (
              <Skeleton
                active
                paragraph={{
                  rows: 6
                }}
              />
            )
          : errorCarga
            ? (
                <Result
                  status="error"
                  title="No se pudo cargar el cliente"
                  subTitle={
                    errorCarga
                  }
                  extra={
                    <Button
                      onClick={() =>
                        navigate(
                          '/gestion/clientes'
                        )
                      }
                    >
                      Volver a clientes
                    </Button>
                  }
                />
              )
            : (
                <Form<ClienteFormData>
                  form={form}
                  layout="vertical"
                  requiredMark={false}
                  onFinish={
                    editarCliente
                  }
                  disabled={
                    procesando
                  }
                >

                  <ClienteForm
                    disabled={
                      procesando
                    }
                  />


                  <div className="gd-clientes-form-actions">

                    <Space
                      wrap
                    >

                      <Button
                        onClick={() =>
                          navigate(
                            '/gestion/clientes'
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
                        Guardar cambios
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


export default EditarCliente;
