import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select
} from 'antd';

import {
  SaveOutlined
} from '@ant-design/icons';

import dayjs from 'dayjs';

import '../../styles/gastosAntd.css';


const {
  TextArea
} = Input;


export type GastoFormData = {
  tipo_gasto_id: string;
  proveedor_id: string;
  fecha_gasto: string;
  monto: string;
  moneda_codigo: string;
  descripcion: string;
  comprobante: string;
};


export const gastoFormVacio:
  GastoFormData = {
  tipo_gasto_id: '',
  proveedor_id: '',
  fecha_gasto: '',
  monto: '',
  moneda_codigo: 'PEN',
  descripcion: '',
  comprobante: ''
};


export const validarGastoForm = (
  form: GastoFormData,
  exigirFecha = false
) => {
  if (
    !form.tipo_gasto_id
  ) {
    return (
      'Debe seleccionar un tipo de gasto'
    );
  }


  const monto =
    Number(
      form.monto
    );


  if (
    !Number.isFinite(
      monto
    ) ||
    monto <= 0
  ) {
    return (
      'El monto debe ser mayor a 0'
    );
  }


  if (
    ![
      'PEN',
      'USD'
    ].includes(
      form.moneda_codigo
    )
  ) {
    return (
      'Debe seleccionar una moneda válida'
    );
  }


  if (
    exigirFecha &&
    !form.fecha_gasto
  ) {
    return (
      'La fecha del gasto es obligatoria'
    );
  }


  if (
    form.descripcion
      .trim()
      .length > 400
  ) {
    return (
      'La descripción no puede superar 400 caracteres'
    );
  }


  if (
    form.comprobante
      .trim()
      .length > 100
  ) {
    return (
      'El comprobante no puede superar 100 caracteres'
    );
  }


  return null;
};


type Props = {
  titulo: string;
  form: GastoFormData;
  tiposGasto: any[];
  proveedores: any[];

  procesando?: boolean;

  textoBoton: string;

  exigirFecha?: boolean;

  onChange: (
    campo:
      keyof GastoFormData,
    valor: string
  ) => void;

  onSubmit: () => void;
};


function GastoForm({
  titulo,
  form,
  tiposGasto,
  proveedores,
  procesando = false,
  textoBoton,
  exigirFecha = false,
  onChange,
  onSubmit
}: Props) {
  return (
    <Card
      title={titulo}
      className="gd-gasto-form-card"
    >

      <Form
        layout="vertical"
        requiredMark={false}
        disabled={
          procesando
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
              label="Tipo de gasto"
              required
            >
              <Select
                size="large"
                value={
                  form
                    .tipo_gasto_id ||
                  undefined
                }
                showSearch
                optionFilterProp="label"
                placeholder="Selecciona un tipo"
                options={
                  tiposGasto.map(
                    (tipo) => ({
                      value:
                        String(
                          tipo
                            .tipo_gasto_id
                        ),

                      label:
                        tipo.nombre
                    })
                  )
                }
                onChange={(
                  value
                ) =>
                  onChange(
                    'tipo_gasto_id',
                    value
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
              label="Proveedor"
              extra="Opcional."
            >
              <Select
                size="large"
                allowClear
                value={
                  form.proveedor_id ||
                  undefined
                }
                showSearch
                optionFilterProp="label"
                placeholder="Sin proveedor"
                options={
                  proveedores.map(
                    (proveedor) => ({
                      value:
                        String(
                          proveedor
                            .proveedor_id
                        ),

                      label:
                        `${proveedor.razon_social} · ${proveedor.ruc}`
                    })
                  )
                }
                onChange={(
                  value
                ) =>
                  onChange(
                    'proveedor_id',
                    value || ''
                  )
                }
              />
            </Form.Item>
          </Col>


          <Col
            xs={24}
            sm={12}
          >
            <Form.Item
              label="Fecha de gasto"
              required={
                exigirFecha
              }
              extra={
                exigirFecha
                  ? undefined
                  : 'Si se deja vacía, se registra con la fecha actual.'
              }
            >
              <DatePicker
                size="large"
                value={
                  form.fecha_gasto
                    ? dayjs(
                        form
                          .fecha_gasto
                      )
                    : null
                }
                format="YYYY-MM-DD"
                className="gd-full-width"
                placeholder={
                  exigirFecha
                    ? 'Selecciona la fecha'
                    : 'Fecha actual'
                }
                onChange={(
                  value
                ) =>
                  onChange(
                    'fecha_gasto',
                    value
                      ? value.format(
                          'YYYY-MM-DD'
                        )
                      : ''
                  )
                }
              />
            </Form.Item>
          </Col>


          <Col
            xs={24}
            sm={12}
          >
            <Form.Item
              label="Moneda"
              required
            >
              <Select
                size="large"
                value={
                  form
                    .moneda_codigo
                }
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
                onChange={(
                  value
                ) =>
                  onChange(
                    'moneda_codigo',
                    value
                  )
                }
              />
            </Form.Item>
          </Col>


          <Col
            xs={24}
            sm={12}
          >
            <Form.Item
              label="Monto"
              required
            >
              <InputNumber
                size="large"
                value={
                  form.monto
                    ? Number(
                        form.monto
                      )
                    : null
                }
                min={0.01}
                precision={2}
                step={0.01}
                addonAfter={
                  form
                    .moneda_codigo
                }
                className="gd-full-width"
                placeholder="0.00"
                onChange={(
                  value
                ) =>
                  onChange(
                    'monto',
                    value === null
                      ? ''
                      : String(
                          value
                        )
                  )
                }
              />
            </Form.Item>
          </Col>


          <Col
            xs={24}
            sm={12}
          >
            <Form.Item
              label="Comprobante"
            >
              <Input
                size="large"
                value={
                  form.comprobante
                }
                maxLength={100}
                placeholder="Ejemplo: F001-000123"
                onChange={(e) =>
                  onChange(
                    'comprobante',
                    e.target.value
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
            >
              <TextArea
                rows={3}
                maxLength={400}
                showCount
                value={
                  form.descripcion
                }
                placeholder="Ejemplo: Pago de luz del local"
                onChange={(e) =>
                  onChange(
                    'descripcion',
                    e.target.value
                  )
                }
              />
            </Form.Item>
          </Col>

        </Row>


        <div className="gd-gasto-form-actions">

          <Button
            type="primary"
            icon={
              <SaveOutlined />
            }
            loading={
              procesando
            }
            onClick={
              onSubmit
            }
          >
            {textoBoton}
          </Button>

        </div>

      </Form>

    </Card>
  );
}


export default GastoForm;
