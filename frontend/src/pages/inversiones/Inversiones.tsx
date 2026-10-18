import { useCallback, useEffect, useRef, useState } from 'react';
import { App as AntdApp, Button, Card, Col, DatePicker, Drawer, Form, Input, InputNumber, Modal, Popconfirm, Row, Select, Space, Table, Tag, Typography } from 'antd';
import type { TableColumnsType } from 'antd';
import { EyeOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import dayjs, { type Dayjs } from 'dayjs';
import PageHeader from '../../components/ui/PageHeader';
import { useBloqueoAccion } from '../../hooks/useBloqueoAccion';
import { apiFetch, getUsuario } from '../../services/api';
import { formatMonto } from '../../utils/formatters';

const { Text }=Typography;
type Investment={ inversion_id:number;fecha:string;aportante:string;motivo:string;descripcion:string|null;monto:number;moneda_codigo:'PEN'|'USD';total_retirado:number;capital_no_devuelto:number; };
type Withdrawal={inversion_retiro_id:number;fecha:string;monto:number;observacion:string|null;activo:boolean;registrado_por:string};
type Pag={page:number;limit:number;total:number;totalPaginas:number};
type FormInv={fecha:Dayjs;aportante:string;motivo:string;descripcion?:string;monto?:number;moneda_codigo?:'PEN'|'USD'};
type FormRet={fecha:Dayjs;monto:number;observacion?:string};
const money=(m:number|string|undefined, moneda:string)=>`${moneda==='PEN'?'S/':'US$'} ${formatMonto(m)}`;
const uuid=()=>crypto.randomUUID();
const iso=(d:string)=>String(d).slice(0,10);

export default function Inversiones(){
 const {message}=AntdApp.useApp();
 const [datos,setDatos]=useState<Investment[]>([]);
 const [pag,setPag]=useState<Pag>({page:1,limit:10,total:0,totalPaginas:0});
 const [q,setQ]=useState('');const [busqueda,setBusqueda]=useState('');const [moneda,setMoneda]=useState<string|undefined>();
 const [loading,setLoading]=useState(false);const [refresh,setRefresh]=useState(0);
 const [seleccion,setSeleccion]=useState<Investment|null>(null);const [retiros,setRetiros]=useState<Withdrawal[]>([]);
 const [pagR,setPagR]=useState<Pag>({page:1,limit:10,total:0,totalPaginas:0});
 const [modal,setModal]=useState(false);const [editando,setEditando]=useState<Investment|null>(null);
 const [modalRetiro,setModalRetiro]=useState(false);
 const [form]=Form.useForm<FormInv>();const [formR]=Form.useForm<FormRet>();
 const bloqueo=useBloqueoAccion();const keyInv=useRef(uuid());const keyRet=useRef(uuid());
 const admin=getUsuario()?.roles?.includes('ADMIN')===true;
 const cargar=useCallback(async()=>{
  setLoading(true);
  try{ const r=await apiFetch(`/inversiones?page=${pag.page}&limit=${pag.limit}&q=${encodeURIComponent(busqueda)}${moneda?`&moneda_codigo=${moneda}`:''}`);setDatos(r.inversiones);setPag(v=>({...v,total:r.paginacion.total,totalPaginas:r.paginacion.totalPaginas})); }
  catch(e){message.error((e as Error).message)}finally{setLoading(false)}
 },[pag.page,pag.limit,busqueda,moneda,refresh,message]);
 useEffect(()=>{void cargar()},[cargar]);
 const abrirDetalle=useCallback(async(id:number,page=1)=>{
  try{const r=await apiFetch(`/inversiones/${id}?page=${page}&limit=10`);setSeleccion(r.inversion);setRetiros(r.retiros);setPagR(r.paginacion)}catch(e){message.error((e as Error).message)}
 },[message]);
 const abrirCrear=()=>{setEditando(null);keyInv.current=uuid();form.resetFields();form.setFieldsValue({fecha:dayjs(),moneda_codigo:'PEN'});setModal(true)};
 const abrirEditar=(r:Investment)=>{setEditando(r);form.setFieldsValue({fecha:dayjs(iso(r.fecha)),aportante:r.aportante,motivo:r.motivo,descripcion:r.descripcion||'',monto:r.monto,moneda_codigo:r.moneda_codigo});setModal(true)};
 const guardar=async(v:FormInv)=>{
  if(!bloqueo.intentarBloquear())return;
  try{const payload={...v,fecha:v.fecha.format('YYYY-MM-DD'),idempotency_key:keyInv.current};
   if(editando)await apiFetch(`/inversiones/${editando.inversion_id}`,{method:'PUT',body:JSON.stringify(payload)});
   else await apiFetch('/inversiones',{method:'POST',body:JSON.stringify(payload)});
   message.success(editando?'Inversión actualizada':'Inversión registrada');setModal(false);keyInv.current=uuid();setRefresh(n=>n+1);if(editando&&seleccion?.inversion_id===editando.inversion_id)void abrirDetalle(editando.inversion_id,pagR.page);
  }catch(e){message.error((e as Error).message)}finally{bloqueo.liberar()}
 };
 const guardarRetiro=async(v:FormRet)=>{
  if(!seleccion||!bloqueo.intentarBloquear())return;
  try{await apiFetch(`/inversiones/${seleccion.inversion_id}/retiros`,{method:'POST',body:JSON.stringify({...v,fecha:v.fecha.format('YYYY-MM-DD'),idempotency_key:keyRet.current})});
   message.success('Devolución registrada');setModalRetiro(false);keyRet.current=uuid();await abrirDetalle(seleccion.inversion_id,1);setRefresh(n=>n+1);
  }catch(e){message.error((e as Error).message)}finally{bloqueo.liberar()}
 };
 const anular=async(retiro_id:number)=>{if(!seleccion||!bloqueo.intentarBloquear())return;try{
  await apiFetch(`/inversiones/${seleccion.inversion_id}/retiros/${retiro_id}`,{method:'DELETE'});message.success('Devolución anulada');await abrirDetalle(seleccion.inversion_id,pagR.page);setRefresh(n=>n+1)
 }catch(e){message.error((e as Error).message)}finally{bloqueo.liberar()}};
 const baja=async(id:number)=>{if(!bloqueo.intentarBloquear())return;try{await apiFetch(`/inversiones/${id}`,{method:'DELETE'});message.success('Inversión dada de baja');setSeleccion(null);setRefresh(n=>n+1)}catch(e){message.error((e as Error).message)}finally{bloqueo.liberar()}};
 const columns:TableColumnsType<Investment>=[
  {title:'Fecha',dataIndex:'fecha',render:(v:string)=>iso(v),width:118},
  {title:'Aportante',dataIndex:'aportante',ellipsis:true},
  {title:'Motivo',dataIndex:'motivo',ellipsis:true},
  {title:'Aporte',render:(_,r)=>money(r.monto,r.moneda_codigo),align:'right'},
  {title:'Capital no devuelto',render:(_,r)=>money(r.capital_no_devuelto,r.moneda_codigo),align:'right'},
  {title:'Acciones',width:115,render:(_,r)=><Button icon={<EyeOutlined/>} onClick={()=>void abrirDetalle(r.inversion_id)}>Ver detalle</Button>}
 ];
 return <>
  <PageHeader title="Inversiones" description="Aportes de capital de socios y devoluciones registradas." extra={<Button type="primary" icon={<PlusOutlined/>} onClick={abrirCrear}>Nueva inversión</Button>}/>
  <Card>
   <Row gutter={[12,12]} align="middle" style={{marginBottom:16}}>
    <Col xs={24} md={12}><Input.Search placeholder="Aportante o motivo" value={q} allowClear onChange={e=>setQ(e.target.value)} onSearch={()=>{setPag(v=>({...v,page:1}));setBusqueda(q)}}/></Col>
    <Col xs={12} md={5}><Select allowClear placeholder="Moneda" style={{width:'100%'}} value={moneda} onChange={v=>{setMoneda(v);setPag(p=>({...p,page:1}))}} options={[{value:'PEN',label:'Soles'},{value:'USD',label:'Dólares'}]}/></Col>
    <Col><Button icon={<ReloadOutlined/>} onClick={()=>setRefresh(v=>v+1)}>Actualizar</Button></Col>
   </Row>
   <Table rowKey="inversion_id" columns={columns} dataSource={datos} loading={loading} scroll={{x:830}} pagination={{current:pag.page,pageSize:pag.limit,total:pag.total,showSizeChanger:true,pageSizeOptions:[10,20,50] ,onChange:(page,limit)=>setPag(p=>({...p,page,limit}))}}/>
  </Card>
  <Modal open={modal} onCancel={()=>!bloqueo.procesando&&setModal(false)} onOk={()=>form.submit()} okText={editando?'Guardar cambios':'Registrar inversión'} okButtonProps={{loading:bloqueo.procesando}} cancelButtonProps={{disabled:bloqueo.procesando}} title={editando?'Editar inversión':'Nueva inversión'} destroyOnHidden>
   <Form form={form} layout="vertical" onFinish={v=>void guardar(v)}>
    <Form.Item label="Fecha del aporte" name="fecha" rules={[{required:true}]}><DatePicker style={{width:'100%'}} format="DD/MM/YYYY"/></Form.Item>
    <Form.Item label="Socio / aportante" name="aportante" rules={[{required:true,whitespace:true,max:180}]}><Input maxLength={180}/></Form.Item>
    <Form.Item label="Motivo" name="motivo" rules={[{required:true,whitespace:true,max:200}]}><Input maxLength={200} placeholder="Maquinaria, fibra, local…"/></Form.Item>
    {!editando&&<Row gutter={12}><Col span={12}><Form.Item name="monto" label="Monto aportado" rules={[{required:true}]}><InputNumber min={0.01} precision={2} style={{width:'100%'}}/></Form.Item></Col><Col span={12}><Form.Item name="moneda_codigo" label="Moneda" rules={[{required:true}]}><Select options={[{value:'PEN',label:'PEN'},{value:'USD',label:'USD'}]}/></Form.Item></Col></Row>}
    <Form.Item label="Descripción" name="descripcion"><Input.TextArea rows={3} maxLength={1000} showCount/></Form.Item>
    {editando&&<Text type="secondary">El monto y la moneda originales quedan protegidos para conservar el historial.</Text>}
   </Form>
  </Modal>
  <Drawer open={!!seleccion} onClose={()=>setSeleccion(null)} title={`Inversión #${seleccion?.inversion_id||''}`} size="large" destroyOnHidden>
   {seleccion&&<>
    <Card size="small"><Space direction="vertical" style={{width:'100%'}}>
     <Text strong>{seleccion.motivo}</Text><Text>{seleccion.aportante} · {iso(seleccion.fecha)}</Text>
     <Text>Aporte: <strong>{money(seleccion.monto,seleccion.moneda_codigo)}</strong></Text>
     <Text>Devuelto: {money(seleccion.total_retirado,seleccion.moneda_codigo)}</Text>
     <Text>Capital no devuelto: <strong>{money(seleccion.capital_no_devuelto,seleccion.moneda_codigo)}</strong></Text>
     {seleccion.descripcion&&<Text type="secondary">{seleccion.descripcion}</Text>}
     <Space wrap><Button onClick={()=>abrirEditar(seleccion)}>Editar datos</Button><Button type="primary" disabled={Number(seleccion.capital_no_devuelto)<=0} onClick={()=>{keyRet.current=uuid();formR.setFieldsValue({fecha:dayjs()});setModalRetiro(true)}}>Registrar devolución</Button>
      {admin&&<Popconfirm title="Dar de baja la inversión" description="Solo si no tiene devoluciones históricas." onConfirm={()=>void baja(seleccion.inversion_id)}><Button danger disabled={bloqueo.procesando}>Dar de baja</Button></Popconfirm>}
     </Space>
    </Space></Card>
    <Typography.Title level={5} style={{marginTop:18}}>Historial de devoluciones</Typography.Title>
    <Table rowKey="inversion_retiro_id" size="small" dataSource={retiros} pagination={{current:pagR.page,pageSize:pagR.limit,total:pagR.total,onChange:page=>void abrirDetalle(seleccion.inversion_id,page)}} columns={[
     {title:'Fecha',dataIndex:'fecha',render:iso},{title:'Monto',dataIndex:'monto',render:(v:number)=>money(v,seleccion.moneda_codigo)},
     {title:'Estado',dataIndex:'activo',render:(v:boolean)=>v?<Tag color="green">Registrado</Tag>:<Tag>ANULADO</Tag>},
     {title:'Acción',render:(_,r:Withdrawal)=>admin&&r.activo?<Popconfirm title="¿Anular esta devolución?" onConfirm={()=>void anular(r.inversion_retiro_id)}><Button size="small" danger disabled={bloqueo.procesando}>Anular</Button></Popconfirm>:null}
    ]} scroll={{x:520}}/>
   </>}
  </Drawer>
  <Modal open={modalRetiro} onCancel={()=>!bloqueo.procesando&&setModalRetiro(false)} onOk={()=>formR.submit()} okText="Registrar devolución" okButtonProps={{loading:bloqueo.procesando}} title="Devolución de capital" destroyOnHidden>
   <Text type="secondary">Solo se registra dinero devuelto al socio, no compras realizadas con la inversión.</Text>
   <Form form={formR} layout="vertical" onFinish={v=>void guardarRetiro(v)} style={{marginTop:15}}>
    <Form.Item name="fecha" label="Fecha" rules={[{required:true}]}><DatePicker style={{width:'100%'}} format="DD/MM/YYYY"/></Form.Item>
    <Form.Item name="monto" label="Capital devuelto" rules={[{required:true}]}><InputNumber min={0.01} max={seleccion?Number(seleccion.capital_no_devuelto):undefined} precision={2} style={{width:'100%'}}/></Form.Item>
    <Form.Item name="observacion" label="Observación"><Input.TextArea rows={3} maxLength={500}/></Form.Item>
   </Form>
  </Modal>
 </>;
}
