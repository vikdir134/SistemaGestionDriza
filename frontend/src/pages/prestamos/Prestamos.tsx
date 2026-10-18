import { useCallback, useEffect, useRef, useState } from 'react';
import { App as AntdApp, Alert, Button, Card, Col, DatePicker, Divider, Drawer, Form, Input, InputNumber, Modal, Popconfirm, Radio, Row, Select, Space, Table, Tag, Typography } from 'antd';
import type { TableColumnsType } from 'antd';
import { EyeOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import dayjs, { type Dayjs } from 'dayjs';
import PageHeader from '../../components/ui/PageHeader';
import { useBloqueoAccion } from '../../hooks/useBloqueoAccion';
import { apiFetch, getUsuario } from '../../services/api';
import { formatMonto } from '../../utils/formatters';

const { Text, Title }=Typography;
type Moneda='PEN'|'USD';type Modalidad='GENERAL'|'PROGRAMADO';type Dir='RECIBIDO'|'OTORGADO';
type Cuota={cuota_id:number;numero:number;fecha_vencimiento:string;capital_programado:number;interes_programado:number;cargos_programados:number;capital_pagado:number;interes_pagado:number;cargos_pagados:number};
type Pago={pago_id:number;fecha:string;cuota_numero?:number|null;capital_pagado:number;interes_pagado:number;cargos_pagados:number;observacion?:string;activo:boolean;registrado_por:string};
type Prestamo={prestamo_id:number;fecha:string;direccion:Dir;modalidad:Modalidad;contraparte:string;descripcion:string|null;capital:number;moneda_codigo:Moneda;tiene_interes:boolean;interes_acordado:number|null;capital_pagado:number;interes_pagado:number;capital_pendiente:number;interes_programado_total:number|null;cuotas_total:number|null;cronograma_tipo?:string};
type Pagination={page:number;limit:number;total:number;totalPaginas:number};
type ManualCuota={fecha_vencimiento:Dayjs;capital_programado:number;interes_programado:number;cargos_programados?:number};
type LoanForm={fecha:Dayjs;direccion:Dir;modalidad:Modalidad;contraparte:string;descripcion?:string;capital:number;moneda_codigo:Moneda;tiene_interes?:boolean;interes_acordado?:number;cronograma_tipo?:'CALCULADO'|'MANUAL';calculo_tasa?:'NOMINAL_SIMPLE'|'EFECTIVA_COMPUESTA';tasa_anual_pct?:number;sistema_amortizacion?:'FRANCES'|'ALEMAN';plazo_meses?:number;primer_vencimiento?:Dayjs;cuotas?:ManualCuota[]};
type PayForm={fecha:Dayjs;cuota_id?:number;capital_pagado:number;interes_pagado:number;cargos_pagados:number;observacion?:string};
const uuid=()=>crypto.randomUUID();
const iso=(v:string)=>String(v).slice(0,10);
const money=(n:number|string|undefined,c:Moneda)=>`${c==='PEN'?'S/':'US$'} ${formatMonto(n)}`;
const nro=(n:number|string|undefined)=>formatMonto(n);
const vacio:Pagination={page:1,limit:10,total:0,totalPaginas:0};

export default function Prestamos(){
 const {message}=AntdApp.useApp();
 const [items,setItems]=useState<Prestamo[]>([]);const [pag,setPag]=useState<Pagination>(vacio);
 const [q,setQ]=useState('');const [aplicado,setAplicado]=useState('');const [direccionFiltro,setDireccionFiltro]=useState<Dir|undefined>();const [modalidadFiltro,setModalidadFiltro]=useState<Modalidad|undefined>();
 const [loading,setLoading]=useState(false);const [refresh,setRefresh]=useState(0);
 const [modal,setModal]=useState(false);const [editing,setEditing]=useState(false);
 const [seleccion,setSeleccion]=useState<Prestamo|null>(null);
 const [cuotas,setCuotas]=useState<Cuota[]>([]);const [pagos,setPagos]=useState<Pago[]>([]);const [pagP,setPagP]=useState<Pagination>(vacio);
 const [paymentOpen,setPaymentOpen]=useState(false);const [preview,setPreview]=useState<Cuota[]>([]);const [loadingPrev,setLoadingPrev]=useState(false);
 const [form]=Form.useForm<LoanForm>();const [formPay]=Form.useForm<PayForm>();
 const modalidad=Form.useWatch('modalidad',form) as Modalidad|undefined;
 const cronogramaTipo=Form.useWatch('cronograma_tipo',form) as string|undefined;
 const tieneInteres=Form.useWatch('tiene_interes',form) as boolean|undefined;
 const pagoCuota=Form.useWatch('cuota_id',formPay) as number|undefined;
 const bloqueo=useBloqueoAccion();const keyLoan=useRef(uuid());const keyPago=useRef(uuid());
 const admin=getUsuario()?.roles?.includes('ADMIN')===true;
 const load=useCallback(async()=>{
  setLoading(true);
  try{const qs=new URLSearchParams({page:String(pag.page),limit:String(pag.limit)});if(aplicado)qs.set('q',aplicado);if(direccionFiltro)qs.set('direccion',direccionFiltro);if(modalidadFiltro)qs.set('modalidad',modalidadFiltro);
   const r=await apiFetch(`/prestamos?${qs}`);setItems(r.prestamos);setPag(p=>({...p,total:r.paginacion.total,totalPaginas:r.paginacion.totalPaginas}));
  }catch(e){message.error((e as Error).message)}finally{setLoading(false)}
 },[pag.page,pag.limit,aplicado,direccionFiltro,modalidadFiltro,refresh,message]);
 useEffect(()=>{void load()},[load]);
 const detail=useCallback(async(id:number,page=1)=>{
  try{const r=await apiFetch(`/prestamos/${id}?page=${page}&limit=10`);setSeleccion(r.prestamo);setCuotas(r.cuotas);setPagos(r.pagos);setPagP(r.paginacion)}catch(e){message.error((e as Error).message)}
 },[message]);
 const newLoan=()=>{setEditing(false);setPreview([]);keyLoan.current=uuid();form.resetFields();form.setFieldsValue({fecha:dayjs(),moneda_codigo:'PEN',direccion:'RECIBIDO',modalidad:'GENERAL',tiene_interes:false,cronograma_tipo:'CALCULADO',calculo_tasa:'EFECTIVA_COMPUESTA',sistema_amortizacion:'FRANCES',plazo_meses:12,cuotas:[]});setModal(true)};
 const editLoan=()=>{if(!seleccion)return;setEditing(true);form.setFieldsValue({fecha:dayjs(iso(seleccion.fecha)),contraparte:seleccion.contraparte,descripcion:seleccion.descripcion||'',capital:seleccion.capital,moneda_codigo:seleccion.moneda_codigo,direccion:seleccion.direccion,modalidad:seleccion.modalidad});setModal(true)};
 const serializar=(v:LoanForm)=>({...v,fecha:v.fecha.format('YYYY-MM-DD'),primer_vencimiento:v.primer_vencimiento?.format('YYYY-MM-DD'),cuotas:v.cuotas?.map(c=>({...c,fecha_vencimiento:c.fecha_vencimiento?.format('YYYY-MM-DD')})),idempotency_key:keyLoan.current});
 const guardar=async(v:LoanForm)=>{
  if(!bloqueo.intentarBloquear())return;
  try{
   let id:number;
   if(editing&&seleccion){await apiFetch(`/prestamos/${seleccion.prestamo_id}`,{method:'PUT',body:JSON.stringify({fecha:v.fecha.format('YYYY-MM-DD'),contraparte:v.contraparte,descripcion:v.descripcion})});id=seleccion.prestamo_id;}
   else {const r=await apiFetch('/prestamos',{method:'POST',body:JSON.stringify(serializar(v))});id=r.prestamo_id;}
   message.success(editing?'Préstamo actualizado':'Préstamo registrado');setModal(false);keyLoan.current=uuid();setRefresh(n=>n+1);void detail(id);
  }catch(e){message.error((e as Error).message)}finally{bloqueo.liberar()}
 };
 const verPreview=async()=>{
  try{const v=await form.validateFields();setLoadingPrev(true);const r=await apiFetch('/prestamos/preview',{method:'POST',body:JSON.stringify(serializar(v))});setPreview(r.cuotas);}
  catch(e){if(e instanceof Error)message.error(e.message)}finally{setLoadingPrev(false)}
 };
 const abrirPago=()=>{keyPago.current=uuid();formPay.resetFields();formPay.setFieldsValue({fecha:dayjs(),capital_pagado:0,interes_pagado:0,cargos_pagados:0});setPaymentOpen(true)};
 const guardarPago=async(v:PayForm)=>{
  if(!seleccion||!bloqueo.intentarBloquear())return;
  try{const body={...v,fecha:v.fecha.format('YYYY-MM-DD'),cuota_id:v.cuota_id??null,idempotency_key:keyPago.current};
   await apiFetch(`/prestamos/${seleccion.prestamo_id}/pagos`,{method:'POST',body:JSON.stringify(body)});
   message.success('Pago registrado');setPaymentOpen(false);keyPago.current=uuid();await detail(seleccion.prestamo_id,1);setRefresh(n=>n+1);
  }catch(e){message.error((e as Error).message)}finally{bloqueo.liberar()}
 };
 const anularPago=async(id:number)=>{if(!seleccion||!bloqueo.intentarBloquear())return;try{
  await apiFetch(`/prestamos/${seleccion.prestamo_id}/pagos/${id}`,{method:'DELETE'});message.success('Pago anulado');await detail(seleccion.prestamo_id,pagP.page);setRefresh(n=>n+1)
 }catch(e){message.error((e as Error).message)}finally{bloqueo.liberar()}};
 const baja=async()=>{if(!seleccion||!bloqueo.intentarBloquear())return;try{
  await apiFetch(`/prestamos/${seleccion.prestamo_id}`,{method:'DELETE'});message.success('Préstamo dado de baja');setSeleccion(null);setRefresh(n=>n+1)
 }catch(e){message.error((e as Error).message)}finally{bloqueo.liberar()}};
 const cols:TableColumnsType<Prestamo>=[
  {title:'Fecha',dataIndex:'fecha',width:120,render:iso},
  {title:'Contraparte',dataIndex:'contraparte',ellipsis:true},
  {title:'Dirección',dataIndex:'direccion',render:(v:Dir)=><Tag color={v==='RECIBIDO'?'blue':'purple'}>{v}</Tag>},
  {title:'Modalidad',dataIndex:'modalidad',render:(v:Modalidad)=>v==='GENERAL'?'General':'Programado'},
  {title:'Capital',align:'right',render:(_,p)=>money(p.capital,p.moneda_codigo)},
  {title:'Pendiente',align:'right',render:(_,p)=>money(p.capital_pendiente,p.moneda_codigo)},
  {title:'',width:115,render:(_,p)=><Button icon={<EyeOutlined/>} onClick={()=>void detail(p.prestamo_id)}>Detalle</Button>}
 ];
 const totalRestante=seleccion?Number(seleccion.capital_pendiente):0;
 return <>
  <PageHeader title="Préstamos" description="Préstamos generales y programados, recibidos u otorgados." extra={<Button type="primary" icon={<PlusOutlined/>} onClick={newLoan}>Nuevo préstamo</Button>}/>
  <Card>
   <Row gutter={[12,12]} style={{marginBottom:16}} align="middle">
    <Col xs={24} md={10}><Input.Search value={q} onChange={e=>setQ(e.target.value)} onSearch={()=>{setAplicado(q);setPag(p=>({...p,page:1}))}} placeholder="Contraparte u observación" allowClear/></Col>
    <Col xs={12} md={5}><Select value={direccionFiltro} allowClear placeholder="Dirección" style={{width:'100%'}} onChange={v=>{setDireccionFiltro(v);setPag(p=>({...p,page:1}))}} options={[{value:'RECIBIDO',label:'Recibido'},{value:'OTORGADO',label:'Otorgado'}]}/></Col>
    <Col xs={12} md={5}><Select value={modalidadFiltro} allowClear placeholder="Modalidad" style={{width:'100%'}} onChange={v=>{setModalidadFiltro(v);setPag(p=>({...p,page:1}))}} options={[{value:'GENERAL',label:'General'},{value:'PROGRAMADO',label:'Programado'}]}/></Col>
    <Col><Button icon={<ReloadOutlined/>} onClick={()=>setRefresh(n=>n+1)}>Actualizar</Button></Col>
   </Row>
   <Table rowKey="prestamo_id" dataSource={items} columns={cols} loading={loading} scroll={{x:1020}} pagination={{current:pag.page,pageSize:pag.limit,total:pag.total,showSizeChanger:true,pageSizeOptions:[10,20,50],onChange:(page,limit)=>setPag(p=>({...p,page,limit}))}}/>
  </Card>
  <Modal open={modal} width={850} title={editing?'Editar datos del préstamo':'Registrar préstamo'} onCancel={()=>!bloqueo.procesando&&setModal(false)} okText={editing?'Guardar cambios':'Registrar'} onOk={()=>form.submit()} okButtonProps={{loading:bloqueo.procesando}} cancelButtonProps={{disabled:bloqueo.procesando}} destroyOnHidden>
   <Form form={form} onFinish={v=>void guardar(v)} layout="vertical" onValuesChange={()=>setPreview([])}>
    {!editing&&<Form.Item label="Modalidad" name="modalidad" rules={[{required:true}]}><Radio.Group optionType="button" buttonStyle="solid" options={[{label:'Préstamo general',value:'GENERAL'},{label:'Préstamo programado',value:'PROGRAMADO'}]}/></Form.Item>}
    <Row gutter={12}>
     {!editing&&<Col xs={24} sm={12}><Form.Item label="Dirección" name="direccion" rules={[{required:true}]}><Select options={[{value:'RECIBIDO',label:'Recibido por la empresa'},{value:'OTORGADO',label:'Otorgado por la empresa'}]}/></Form.Item></Col>}
     <Col xs={24} sm={12}><Form.Item label="Fecha del préstamo" name="fecha" rules={[{required:true}]}><DatePicker format="DD/MM/YYYY" style={{width:'100%'}}/></Form.Item></Col>
     <Col xs={24} sm={12}><Form.Item label="Prestamista / deudor" name="contraparte" rules={[{required:true,whitespace:true,max:180}]}><Input maxLength={180}/></Form.Item></Col>
     {!editing&&<><Col xs={12} sm={12}><Form.Item label="Capital" name="capital" rules={[{required:true}]}><InputNumber min={0.01} precision={2} style={{width:'100%'}}/></Form.Item></Col>
     <Col xs={12} sm={12}><Form.Item label="Moneda" name="moneda_codigo" rules={[{required:true}]}><Select options={[{value:'PEN',label:'Soles (PEN)'},{value:'USD',label:'Dólares (USD)'}]}/></Form.Item></Col></>}
    </Row>
    <Form.Item label="Descripción / condiciones acordadas" name="descripcion"><Input.TextArea rows={2} maxLength={1000} showCount/></Form.Item>
    {!editing&&modalidad==='GENERAL'&&<Card size="small" title="Condiciones flexibles">
     <Form.Item name="tiene_interes" label="Intereses opcionales"><Radio.Group options={[{label:'Sin interés',value:false},{label:'Con interés',value:true}]}/></Form.Item>
     {tieneInteres&&<Form.Item label="Interés total acordado (opcional)" name="interes_acordado" extra="Si no hay importe acordado, registra el interés al recibir o realizar cada pago."><InputNumber min={0} precision={2} style={{width:'100%'}}/></Form.Item>}
     <Text type="secondary">No se generan cuotas, fechas de vencimiento ni mora.</Text>
    </Card>}
    {!editing&&modalidad==='PROGRAMADO'&&<Card size="small" title="Condiciones del cronograma">
     <Form.Item label="Origen del cronograma" name="cronograma_tipo" rules={[{required:true}]}><Radio.Group options={[{label:'Calcular cuotas',value:'CALCULADO'},{label:'Ingresar cronograma bancario',value:'MANUAL'}]}/></Form.Item>
     {cronogramaTipo==='CALCULADO'?<>
      <Row gutter={12}>
       <Col xs={24} sm={12}><Form.Item name="calculo_tasa" label="Tipo de tasa anual" rules={[{required:true}]}><Select options={[{value:'EFECTIVA_COMPUESTA',label:'TEA - efectiva / compuesta'},{value:'NOMINAL_SIMPLE',label:'TNA - nominal / simple'}]}/></Form.Item></Col>
       <Col xs={12} sm={12}><Form.Item name="tasa_anual_pct" label="Tasa anual (%)" rules={[{required:true}]}><InputNumber min={0} max={1000} precision={5} style={{width:'100%'}}/></Form.Item></Col>
       <Col xs={12} sm={12}><Form.Item name="plazo_meses" label="Número de meses" rules={[{required:true}]}><InputNumber min={1} max={360} precision={0} style={{width:'100%'}}/></Form.Item></Col>
       <Col xs={24} sm={12}><Form.Item name="sistema_amortizacion" label="Amortización" rules={[{required:true}]}><Select options={[{value:'FRANCES',label:'Francés - cuota base fija'},{value:'ALEMAN',label:'Alemán - capital fijo'}]}/></Form.Item></Col>
       <Col xs={24} sm={12}><Form.Item name="primer_vencimiento" label="Primer vencimiento" rules={[{required:true}]}><DatePicker format="DD/MM/YYYY" style={{width:'100%'}}/></Form.Item></Col>
      </Row>
      <Space direction="vertical" style={{width:'100%'}}>
       <Button onClick={()=>void verPreview()} loading={loadingPrev}>Previsualizar cronograma</Button>
       <Text type="secondary">La TNA se prorratea mensualmente; la TEA se convierte a tasa efectiva mensual. Las cuotas calculadas no incluyen seguros ni comisiones.</Text>
      </Space>
     </>:<>
      <Alert type="info" showIcon message="Ingresa el cronograma entregado por el banco" description="Las cuotas deben ir en orden cronológico y la suma del capital debe coincidir exactamente con el monto prestado." style={{marginBottom:12}}/>
      <Form.List name="cuotas">{(fields,{add,remove})=><>
       {fields.map(({key,name,...rest})=><Row gutter={8} key={key} align="middle">
        <Col xs={24} sm={7}><Form.Item {...rest} name={[name,'fecha_vencimiento']} label="Vencimiento" rules={[{required:true}]}><DatePicker format="DD/MM/YYYY" style={{width:'100%'}}/></Form.Item></Col>
        <Col xs={8} sm={5}><Form.Item {...rest} name={[name,'capital_programado']} label="Capital" rules={[{required:true}]}><InputNumber min={0} precision={2} style={{width:'100%'}}/></Form.Item></Col>
        <Col xs={8} sm={5}><Form.Item {...rest} name={[name,'interes_programado']} label="Interés" rules={[{required:true}]}><InputNumber min={0} precision={2} style={{width:'100%'}}/></Form.Item></Col>
        <Col xs={8} sm={5}><Form.Item {...rest} name={[name,'cargos_programados']} label="Otros cargos"><InputNumber min={0} precision={2} style={{width:'100%'}}/></Form.Item></Col>
        <Col span={2}><Button danger size="small" onClick={()=>remove(name)}>×</Button></Col>
       </Row>)}
       <Button onClick={()=>add({fecha_vencimiento:dayjs().add(fields.length+1,'month'),capital_programado:0,interes_programado:0,cargos_programados:0})} type="dashed" block>Agregar cuota</Button>
      </>}</Form.List>
     </>}
     {!!preview.length&&<><Divider>Vista previa ({preview.length} cuotas)</Divider><Table rowKey="numero" size="small" dataSource={preview} pagination={{pageSize:6}} columns={[
      {title:'#',dataIndex:'numero'},{title:'Vence',dataIndex:'fecha_vencimiento',render:iso},
      {title:'Capital',dataIndex:'capital_programado',render:nro},{title:'Interés',dataIndex:'interes_programado',render:nro},
      {title:'Total',render:(_,c:Cuota)=>nro(Number(c.capital_programado)+Number(c.interes_programado)+Number(c.cargos_programados))}
     ]}/></>}
    </Card>}
    {editing&&<Alert type="info" message="Solo se pueden editar fecha, contraparte y descripción. El capital y las condiciones financieras permanecen inalterados para preservar los registros."/>}
   </Form>
  </Modal>
  <Drawer open={!!seleccion} onClose={()=>setSeleccion(null)} title={`Préstamo #${seleccion?.prestamo_id||''}`} size="large" destroyOnHidden>
   {seleccion&&<>
    <Card size="small"><Space direction="vertical" style={{width:'100%'}}>
     <Space wrap><Tag color={seleccion.direccion==='RECIBIDO'?'blue':'purple'}>{seleccion.direccion}</Tag><Tag>{seleccion.modalidad}</Tag><Text>{seleccion.contraparte}</Text></Space>
     <Text>Fecha: {iso(seleccion.fecha)} · Moneda: {seleccion.moneda_codigo}</Text>
     <Row gutter={10}><Col span={12}><Text type="secondary">Capital original</Text><Title level={5}>{money(seleccion.capital,seleccion.moneda_codigo)}</Title></Col><Col span={12}><Text type="secondary">Capital pendiente</Text><Title level={5}>{money(totalRestante,seleccion.moneda_codigo)}</Title></Col></Row>
     <Text>Capital devuelto: {money(seleccion.capital_pagado,seleccion.moneda_codigo)}</Text>
     <Text>Intereses efectivamente pagados: {money(seleccion.interes_pagado,seleccion.moneda_codigo)}</Text>
     {seleccion.modalidad==='PROGRAMADO'&&<Text type="secondary">Intereses programados totales: {money(seleccion.interes_programado_total??0,seleccion.moneda_codigo)}. No equivale a intereses devengados.</Text>}
     {seleccion.interes_acordado!=null&&<Text>Interés fijo acordado: {money(seleccion.interes_acordado,seleccion.moneda_codigo)}</Text>}
     {seleccion.descripcion&&<Text type="secondary">{seleccion.descripcion}</Text>}
     <Space wrap><Button type="primary" onClick={abrirPago}>Registrar pago / devolución</Button><Button onClick={editLoan}>Editar datos</Button>
      {admin&&<Popconfirm title="¿Dar de baja este préstamo?" description="Solo cuando no tenga pagos registrados." onConfirm={()=>void baja()}><Button danger disabled={bloqueo.procesando}>Dar de baja</Button></Popconfirm>}
     </Space>
    </Space></Card>
    {seleccion.modalidad==='PROGRAMADO'&&<><Title level={5} style={{marginTop:20}}>Cronograma</Title>
     <Alert type="info" showIcon message="El cronograma es lo previsto; no confirma pagos. Los abonos de capital extraordinarios no recalculan automáticamente las cuotas." style={{marginBottom:12}}/>
     <Table rowKey="cuota_id" size="small" dataSource={cuotas} pagination={{pageSize:10}} scroll={{x:660}} columns={[
      {title:'#',dataIndex:'numero',width:42},{title:'Vence',dataIndex:'fecha_vencimiento',render:iso},
      {title:'Capital',dataIndex:'capital_programado',align:'right',render:nro},
      {title:'Interés',dataIndex:'interes_programado',align:'right',render:nro},
      {title:'Cargos',dataIndex:'cargos_programados',align:'right',render:nro},
      {title:'Estado',render:(_,c:Cuota)=>{const due=Number(c.capital_programado)+Number(c.interes_programado)+Number(c.cargos_programados);const paid=Number(c.capital_pagado)+Number(c.interes_pagado)+Number(c.cargos_pagados);
       return paid>=due-0.005?<Tag color="green">Pagada</Tag>:paid>0?<Tag color="gold">Parcial</Tag>:iso(c.fecha_vencimiento)<dayjs().format('YYYY-MM-DD')?<Tag color="red">Vencida</Tag>:<Tag>Pendiente</Tag>;
      }}
     ]}/>
    </>}
    <Title level={5} style={{marginTop:20}}>Historial de pagos</Title>
    <Table rowKey="pago_id" size="small" dataSource={pagos} scroll={{x:710}} pagination={{current:pagP.page,pageSize:pagP.limit,total:pagP.total,onChange:page=>void detail(seleccion.prestamo_id,page)}} columns={[
     {title:'Fecha',dataIndex:'fecha',render:iso},{title:'Cuota',dataIndex:'cuota_numero',render:(v?:number)=>v?`#${v}`:'Abono libre'},
     {title:'Capital',dataIndex:'capital_pagado',align:'right',render:nro},{title:'Interés',dataIndex:'interes_pagado',align:'right',render:nro},
     {title:'Cargos',dataIndex:'cargos_pagados',align:'right',render:nro},{title:'Estado',dataIndex:'activo',render:(v:boolean)=>v?<Tag color="green">Activo</Tag>:<Tag>Anulado</Tag>},
     {title:'',render:(_,p:Pago)=>admin&&p.activo?<Popconfirm title="¿Anular este pago?" onConfirm={()=>void anularPago(p.pago_id)}><Button size="small" danger disabled={bloqueo.procesando}>Anular</Button></Popconfirm>:null}
    ]}/>
   </>}
  </Drawer>
  <Modal open={paymentOpen} title="Registrar pago de préstamo" destroyOnHidden onCancel={()=>!bloqueo.procesando&&setPaymentOpen(false)} onOk={()=>formPay.submit()} okText="Registrar pago" okButtonProps={{loading:bloqueo.procesando}}>
   <Form form={formPay} layout="vertical" onFinish={v=>void guardarPago(v)}>
    <Form.Item name="fecha" label="Fecha real del pago" rules={[{required:true}]}><DatePicker style={{width:'100%'}} format="DD/MM/YYYY"/></Form.Item>
    {seleccion?.modalidad==='PROGRAMADO'&&<Form.Item name="cuota_id" label="Asociar a cuota (opcional)" extra="Sin cuota: solo amortización extraordinaria de capital. No recalcula el cronograma."><Select allowClear placeholder="Abono de capital sin cuota" value={pagoCuota} options={cuotas.map(c=>({value:c.cuota_id,label:`Cuota ${c.numero} · ${iso(c.fecha_vencimiento)}`}))}/></Form.Item>}
    <Row gutter={12}>
     <Col span={12}><Form.Item name="capital_pagado" label="Amortización de capital" rules={[{required:true}]}><InputNumber min={0} max={totalRestante} precision={2} style={{width:'100%'}}/></Form.Item></Col>
     <Col span={12}><Form.Item name="interes_pagado" label="Interés pagado" rules={[{required:true}]}><InputNumber min={0} precision={2} disabled={seleccion?.tiene_interes===false||(seleccion?.modalidad==='PROGRAMADO'&&!pagoCuota)} style={{width:'100%'}}/></Form.Item></Col>
     {seleccion?.modalidad==='PROGRAMADO'&&<Col span={12}><Form.Item name="cargos_pagados" label="Otros cargos pagados" rules={[{required:true}]}><InputNumber min={0} precision={2} disabled={!pagoCuota} style={{width:'100%'}}/></Form.Item></Col>}
    </Row>
    <Form.Item name="observacion" label="Observación"><Input.TextArea rows={2} maxLength={500}/></Form.Item>
   </Form>
  </Modal>
 </>;
}
