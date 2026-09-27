import {
  App as AntdApp,
  Button,
  Card,
  Form,
  Space
} from 'antd';

import {
  SaveOutlined
} from '@ant-design/icons';

import {
  useNavigate
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


function RegistrarCliente() {
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

  const {
    procesando,
    intentarBloquear,
    liberar
  } = useBloqueoAccion();


  const registrarCliente =
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
        const payload = {
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
        };


        await apiFetch(
          '/clientes',
          {
            method: 'POST',
            body:
              JSON.stringify(
                payload
              )
          }
        );


        message.success(
          'Cliente registrado correctamente'
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
            : 'No se pudo registrar el cliente'
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
        title="Registrar cliente"
        description="Agrega la información comercial del nuevo cliente."
      />


      <Card
        title="Datos del cliente"
        className="gd-clientes-form-card"
      >

        <Form<ClienteFormData>
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={
            registrarCliente
          }
          disabled={
            procesando
          }
          initialValues={{
            ruc: '',
            razon_social: '',
            direccion: '',
            telefono: '',
            correo: '',
            agencia_entrega: ''
          }}
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
                Guardar cliente
              </Button>

            </Space>

          </div>

        </Form>

      </Card>

    </div>
  );
}


export default RegistrarCliente;
