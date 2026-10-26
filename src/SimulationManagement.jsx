import React from 'react';
import {Activity,ArrowUpRight,Bell,Building2,CheckCircle2,Clock,Expand,Flag,HeartHandshake,LockKeyhole,Sparkles,Users,ShieldCheck} from 'lucide-react';
import {aggregate,dimensions,mean,units} from './model.js';
import {managementView} from './simulation.js';
import NumberValue from './AnimatedNumber.jsx';

const icons=[Activity,Sparkles,Flag,HeartHandshake,Building2];
const shortUnits=['Dirección','Asuntos Adm. y Financieros','Área Académica'];

function Trend({responses,baseline}){
  const start=Math.max(5,baseline);
  const values=Array.from({length:7},(_,i)=>mean(aggregate(responses.slice(0,start+Math.round((responses.length-start)*i/6)))));
  const points=values.map((value,i)=>`${i*100/6},${45-value*7}`).join(' ');
  return <svg className="sim-sparkline" viewBox="0 0 100 48" preserveAspectRatio="none" aria-hidden="true"><polyline points={points} stroke="#5c8ed4" strokeWidth="1.4" fill="none" vectorEffect="non-scaling-stroke"/></svg>;
}

export default function ManagementPanel({state,role,onRoleChange,onExpand,allPanels=false,expanded=false}){
  const view=managementView(state,role);
  const scoped=view.responses;
  const data=aggregate(scoped);
  const ranked=[...data].sort((a,b)=>a.value-b.value);
  const received=scoped.length-view.baseline;
  const roleName=role==='rrhh'?'Recursos Humanos':role==='carrera'?'Jefe de carrera':'Jefatura de unidad';
  const shownUnits=view.unit?[view.unit]:units;
  const unitCounts=shownUnits.map(unit=>scoped.filter(response=>response.unit===unit).length);
  const scale=Math.max(1,...unitCounts);
  return <section className={`sim-management sim-panel ${state.scene>=3?'scene-active':''}`} aria-label={`Panel de ${roleName}`} data-scope={role} data-submitted={scoped.length}>
    <div className="sim-panel-heading"><div className="sim-profile"><span className="sim-management-avatar"><Building2 size={19}/></span><div><small>{role==='rrhh'?'GESTIÓN INSTITUCIONAL':'SUPERIOR INMEDIATO'}</small><strong>{roleName}</strong></div></div><button className="sim-icon-button" onClick={onExpand} aria-label={expanded?'Volver a vista dividida':`Ampliar panel de ${roleName}`}><Expand size={15}/></button></div>
    {!(allPanels&&role==='rrhh')&&<div className="sim-management-toolbar"><div className="sim-segmented" aria-label="Perfil de gestión">{(allPanels?[['jefe','Jefe de unidad'],['carrera','Jefe de carrera']]:[['rrhh','RR. HH.'],['jefe','Jefe de unidad'],['carrera','Jefe de carrera']]).map(([value,label])=><button key={value} aria-pressed={role===value} className={role===value?'active':''} onClick={()=>onRoleChange(value)}>{label}</button>)}</div></div>}
    <div className="sim-management-title"><p>{role==='rrhh'?'Todas las unidades':role==='carrera'?'Área Académica · Ámbito de ejemplo':units[1]}</p></div>
    <div className="sim-metrics">
      <article className="sim-metric sage"><div>Promedio de clima<ArrowUpRight size={14}/></div><strong>{view.available?<><NumberValue value={mean(data)}/><small>/ 5</small></>:<span className="sim-pending-average">—</span>}</strong>{view.available?<Trend responses={scoped} baseline={view.baseline}/>:<p className="sim-minimum-note">{scoped.length===0?'Sin respuestas todavía':'Mínimo 5 respuestas para mostrar promedios'}</p>}</article>
      <article className="sim-metric peach"><div>Participación<Users size={15}/></div><strong><NumberValue value={scoped.length} decimals={0}/><small>respuestas</small></strong><div className="sim-participation-bars" aria-label="Participación por unidad">{shownUnits.map((unit,index)=><div key={unit} title={`${unit}: ${unitCounts[index]} respuestas`}><i style={{height:`${unitCounts[index]/scale*40}px`}}/><small>{['DIR','AAF','ACA'][units.indexOf(unit)]} · {unitCounts[index]}</small></div>)}</div><span>{received} de {view.target} cuestionarios nuevos</span><progress className="sim-population-progress" value={scoped.length} max={Math.max(1,view.baseline+view.target)} aria-label={`Participación de ${roleName}`}/></article>
    </div>
    <div className={`sim-update ${received?'has-update':''}`} key={`${received}-${role}`}><Bell size={14}/><span>{received?`${received} nuevas respuestas recibidas`:'Esperando nuevas respuestas'}</span></div>
    <div className="sim-dimension-cards">{data.map((dimension,index)=>{const Icon=icons[index];return <article className={`sim-dimension-tile dimension-${index}`} key={dimension.id}><div><Icon size={15}/><span>{dimension.name}</span></div><strong>{view.available?<><NumberValue value={dimension.value}/><small>/ 5</small></>:<span className="sim-pending-average">—</span>}</strong>{view.available&&<div className="sim-tile-track"><i style={{width:`${dimension.value*20}%`,background:dimension.color}}/></div>}</article>;})}</div>
    <div className="sim-table-heading"><h3>{role==='rrhh'?'Panorama por unidad':role==='carrera'?'Resultados del Área Académica':'Resultados de mi unidad'}</h3><span>Escala 1–5</span></div>
    <div className="sim-table-scroll"><table className="sim-table"><thead><tr><th>Unidad</th><th>Respuestas</th><th>Promedio</th></tr></thead><tbody>{shownUnits.map(unit=>{const rows=state.responses.filter(response=>response.unit===unit);return <tr key={unit}><td><span className="sim-table-dot"/>{expanded?unit:shortUnits[units.indexOf(unit)]}</td><td><NumberValue value={rows.length} decimals={0}/></td><td><span className="sim-table-score">{rows.length>=5?<NumberValue value={mean(aggregate(rows))}/>:rows.length?'Reservado':'—'}</span></td></tr>;})}</tbody></table></div>
    {view.actions.length?<div className="sim-actions"><div className="sim-section-label"><span><CheckCircle2 size={15}/>Plan de mejora compartido</span><span>{view.actions.length} acciones</span></div>{view.actions.map(action=><article key={action.id}><span className={`sim-action-status ${action.status==='En curso'?'in-progress':''}`}>{action.status}</span><h4>{action.title}</h4><p>{action.dimension} · {action.owner}</p>{role==='rrhh'&&<p className="sim-action-unit">{action.unit}</p>}<div><Clock size={12}/>Seguimiento: {action.due}</div></article>)}<p className="sim-fineprint">El avance del plan no modifica los promedios. Su impacto se comprobará en una próxima campaña.</p></div>:view.available?<div className="sim-management-tip"><span><Sparkles size={16}/></span><div><small>FOCO DE GESTIÓN</small><h3>{ranked[0].name} y {ranked[1].name.toLowerCase()}</h3><p>{state.scene>=3?ranked[0].management:'Las menores valoraciones relativas orientan las próximas conversaciones y acciones.'}</p></div></div>:<div className="sim-management-tip sim-awaiting-data"><span><LockKeyhole size={16}/></span><div><h3>Esperando resultados</h3><p>Con al menos cinco respuestas completas de este ámbito se mostrarán los promedios y las prioridades de mejora.</p></div></div>}
    <p className="sim-fineprint"><ShieldCheck size={12}/>Resultados agregados de grupos con al menos 5 respuestas.</p>
  </section>;
}
