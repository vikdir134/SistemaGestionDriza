import {
  Col,
  Form,
  Input,
  Row
} from 'antd';

import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  ShopOutlined,
  SolutionOutlined,
  NumberOutlined
} from '@ant-design/icons';


export type ClienteFormData = {
  ruc: string;
  razon_social: string;
  direccion: string;
  telefono: string;
  correo: string;
  agencia_entrega: string;
};


type Props = {
  disabled?: boolean;
};


function ClienteForm({
  disabled = false
}: Props) {
  return (
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
          label="RUC"
          name="ruc"
          extra="Debe contener exactamente 11 dígitos."
          normalize={
            (value) =>
              typeof value === 'string'
                ? value.replace(
                    /\D/g,
                    ''
                  )
                : value
          }
          rules={[
            {
              required: true,
              message:
                'Ingresa el RUC'
            },
            {
              pattern:
                /^\d{11}$/,
              message:
                'El RUC debe tener 11 dígitos numéricos'
            }
          ]}
        >
          <Input
            size="large"
            prefix={
              <NumberOutlined />
            }
            placeholder="20123456789"
            maxLength={11}
            inputMode="numeric"
            disabled={
              disabled
            }
          />
        </Form.Item>

      </Col>


      <Col
        xs={24}
        md={16}
      >

        <Form.Item
          label="Razón social"
          name="razon_social"
          rules={[
            {
              required: true,
              message:
                'Ingresa la razón social'
            },
            {
              whitespace: true,
              message:
                'Ingresa una razón social válida'
            }
          ]}
        >
          <Input
            size="large"
            prefix={
              <SolutionOutlined />
            }
            placeholder="Razón social del cliente"
            disabled={
              disabled
            }
          />
        </Form.Item>

      </Col>


      <Col
        xs={24}
        md={12}
      >

        <Form.Item
          label="Dirección"
          name="direccion"
        >
          <Input
            size="large"
            prefix={
              <EnvironmentOutlined />
            }
            placeholder="Dirección fiscal o comercial"
            disabled={
              disabled
            }
          />
        </Form.Item>

      </Col>


      <Col
        xs={24}
        md={12}
      >

        <Form.Item
          label="Agencia de entrega"
          name="agencia_entrega"
        >
          <Input
            size="large"
            prefix={
              <ShopOutlined />
            }
            placeholder="Ejemplo: Shalom, Marvisur, Olva"
            disabled={
              disabled
            }
          />
        </Form.Item>

      </Col>


      <Col
        xs={24}
        md={12}
      >

        <Form.Item
          label="Teléfono"
          name="telefono"
        >
          <Input
            size="large"
            prefix={
              <PhoneOutlined />
            }
            placeholder="Teléfono de contacto"
            inputMode="tel"
            disabled={
              disabled
            }
          />
        </Form.Item>

      </Col>


      <Col
        xs={24}
        md={12}
      >

        <Form.Item
          label="Correo"
          name="correo"
          rules={[
            {
              type: 'email',
              message:
                'Ingresa un correo válido'
            }
          ]}
        >
          <Input
            size="large"
            prefix={
              <MailOutlined />
            }
            placeholder="cliente@empresa.com"
            inputMode="email"
            disabled={
              disabled
            }
          />
        </Form.Item>

      </Col>

    </Row>
  );
}


export default ClienteForm;
