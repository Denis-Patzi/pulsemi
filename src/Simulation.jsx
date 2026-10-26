import React, { useEffect, useRef, useState } from 'react';
import { Activity, ArrowDown, ArrowRight, ArrowUpRight, Bell, Building2, Check, CheckCircle2, ChevronRight, ClipboardList, Clock, Expand, Flag, HeartHandshake, LayoutDashboard, LockKeyhole, Maximize2, PanelLeftClose, PanelLeftOpen, SlidersHorizontal, Columns3, GraduationCap, Moon, Sun, Pause, Play, RotateCcw, ShieldCheck, SkipForward, Sparkles, Users, X } from 'lucide-react';
import { aggregate, dimensions, labels, mean, scores, units } from './model';
import { duration, scenes, simulationState, defaultSimulationConfig } from './simulation.js';
import './simulation.css';
import { useTheme } from './useTheme.js';
import './simulation-dark.css';
import './simulation-type.css';
import ManagementPanel from './SimulationManagement.jsx';
import SimulationSetup from './SimulationSetup.jsx';

const fmt = value => value.toFixed(2);
const clock = value => `${Math.floor(value / 60)}:${String(Math.floor(value % 60)).padStart(2, '0')}`;
export default function Simulation({ onExplore }) {
  const [theme,toggleTheme]=useTheme();
  const [time, setTime] = useState(0);
  const [config,setConfig]=useState(defaultSimulationConfig);
  const [selectedParticipant,setSelectedParticipant]=useState('simulation-ana');
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [role, setRole] = useState('rrhh');
  const [superiorRole,setSuperiorRole]=useState('jefe');
  function selectRole(value){setRole(value);if(value!=='rrhh')setSuperiorRole(value);}
  const [focus, setFocus] = useState('both');
  const [collapsed, setCollapsed] = useState(() => {try{return localStorage.getItem('pulse-sidebar-collapsed')==='true';}catch{return false;}});
  useEffect(()=>{try{localStorage.setItem('pulse-sidebar-collapsed',String(collapsed));}catch{}},[collapsed]);
  const [fullscreenError, setFullscreenError] = useState('');
  const root = useRef(null);
  const presentationOptions = useRef(null);
  const populationOptions=useRef(null);
  useEffect(()=>{
    function closeOptions(event){for(const ref of [presentationOptions,populationOptions]){const options=ref.current;if(options?.open&&!options.contains(event.target))options.open=false;}}
    document.addEventListener('pointerdown',closeOptions);
    return()=>document.removeEventListener('pointerdown',closeOptions);
  },[]);
  const state = simulationState(time,superiorRole,config);
  const person=state.participants.find(item=>item.id===selectedParticipant)||state.participants[0];
  const participantStatus = person.submitted ? 'sent' : person.answered > 0 ? 'filling' : 'waiting';
  const statusLabel = participantStatus === 'sent' ? 'Enviado' : participantStatus === 'filling' ? 'Llenando' : 'En espera';
  const scene = scenes[state.scene];
  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => setTime(t => Math.min(duration, t + 1)), 1000 / speed);
    return () => clearInterval(interval);
  }, [playing, speed]);
  useEffect(() => { if (time >= duration) setPlaying(false); }, [time]);
  useEffect(() => { if(focus!=='management')setRole(state.scene === 4 || state.scene === 5 ? superiorRole : 'rrhh'); }, [state.scene,focus]);
  const personal = scores(person.answers);
  const personalRanked = [...personal].sort((a, b) => a.value - b.value);
  const currentDimension = dimensions[Math.min(4, Math.floor(Math.max(0, person.answered) / 4))];
  const newCount = state.completedParticipants;


  function applyConfiguration(next){setConfig(next);setPlaying(false);setTime(0);setSelectedParticipant('simulation-ana');if(presentationOptions.current)presentationOptions.current.open=false;if(populationOptions.current)populationOptions.current.open=false;}
  function reset() { setPlaying(false); setTime(0); setRole('rrhh'); }
  function nextScene() { setTime(scenes.find(s => s.at > time)?.at ?? duration); }
  async function fullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await root.current.requestFullscreen();
      setFullscreenError('');
    } catch { setFullscreenError('Usa F11 para ampliar la presentación en este navegador.'); }
  }

  return <div className={`sim-app ${collapsed ? 'menu-collapsed' : 'menu-expanded'}`} data-view={focus} ref={root}>
    <aside className="sim-sidebar" aria-label="Menú principal">
      <button className="sim-sidebar-toggle" onClick={()=>setCollapsed(v=>!v)} aria-label={collapsed?'Expandir menú':'Contraer menú'} title={collapsed?'Expandir menú':'Contraer menú'} aria-expanded={!collapsed}>{collapsed?<PanelLeftOpen size={18}/>:<PanelLeftClose size={18}/>}</button>
      <a className="sim-brand" href="#" aria-label="pulsEMI, reiniciar demostración" onClick={e => { e.preventDefault(); reset(); }}><img src="/images/pulsemi-icon.svg" alt=""/><span>puls<strong>EMI</strong><small>ESCUCHAR PARA MEJORAR</small></span></a>
      <small className="sim-nav-label">TU ESPACIO</small>
      <button className={`sim-nav-item ${focus==='both'?'selected':''}`} title="Vista de demostración" aria-label="Vista de demostración" onClick={()=>setFocus('both')}><LayoutDashboard size={18}/><span className="sim-nav-text">Vista de demostración</span></button>
      <button className={`sim-nav-item ${focus==='three'?'selected':''}`} title="Ver tres paneles" aria-label="Ver tres paneles" onClick={()=>setFocus('three')}><Columns3 size={18}/><span className="sim-nav-text">Ver tres paneles</span></button>
      <button className={`sim-nav-item ${focus==='personal'?'selected':''}`} title="Personal administrativo" aria-label="Personal administrativo" onClick={()=>setFocus('personal')}><ClipboardList size={18}/><span className="sim-nav-text">Personal administrativo</span></button>
      <button className={`sim-nav-item ${focus==='management'&&role==='rrhh'?'selected':''}`} title="Recursos Humanos" aria-label="Recursos Humanos" onClick={()=>{setRole('rrhh');setFocus('management');}}><Users size={18}/><span className="sim-nav-text">Recursos Humanos</span></button>
      <button className={`sim-nav-item ${focus==='management'&&role!=='rrhh'?'selected':''}`} title="Superior inmediato" aria-label="Superior inmediato" onClick={()=>{setRole(superiorRole);setFocus('management');}}><GraduationCap size={18}/><span className="sim-nav-text">Superior inmediato</span></button>
      <button className="sim-theme-toggle" onClick={toggleTheme} title={theme==='dark'?'Activar tema claro':'Activar tema oscuro'} aria-label={theme==='dark'?'Activar tema claro':'Activar tema oscuro'} aria-pressed={theme==='dark'}>{theme==='dark'?<Sun size={18}/>:<Moon size={18}/>}<span className="sim-nav-text">{theme==='dark'?'Tema claro':'Tema oscuro'}</span></button>
      <button className="sim-explore" title="Explorar plataforma" aria-label="Explorar plataforma" onClick={onExplore}><span className="sim-nav-text">Explorar plataforma</span><ArrowUpRight size={16}/></button>
      <div className="sim-sidebar-foot"><ShieldCheck size={15}/> Simulación académica</div>
    </aside>

    <div className="sim-workspace">
      <header className="sim-topbar"><span><Activity size={17}/><strong>Simulación</strong></span><div><button className="sim-icon-button" onClick={fullscreen} aria-label="Alternar pantalla completa" title="Pantalla completa"><Maximize2 size={18}/></button><button className="sim-icon-button sim-mobile-theme" onClick={toggleTheme} aria-label={theme==='dark'?'Activar tema claro':'Activar tema oscuro'}>{theme==='dark'?<Sun size={18}/>:<Moon size={18}/>}</button><button className="sim-icon-button sim-mobile-system" onClick={onExplore} aria-label="Explorar plataforma" title="Abrir sistema"><ArrowUpRight size={18}/></button></div></header>
      <main className="sim-main">
        <div className="sim-intro"><div><h1>El pulso de nuestra institución<span>.</span></h1><div className="sim-story" role="status"><span className="sim-scene-number">{String(state.scene + 1).padStart(2, '0')}</span><div><strong>{time >= duration ? 'El recorrido está completo' : scene.title}</strong><p>{time >= duration ? 'La escucha se convirtió en compromisos. Repite la demostración o explora cada perfil.' : scene.caption}</p></div><span className={`sim-state ${playing ? 'is-playing' : ''}`}><span/>{playing ? 'En reproducción' : time >= duration ? 'Completado' : time ? 'En pausa' : 'Listo para comenzar'}</span></div></div><span className="sim-scope-chip"><Building2 size={14}/>{superiorRole==='carrera'?'Área Académica':'Unidad administrativa'}</span></div>

        <section className="sim-player" aria-label="Controles de la simulación">
          <div className="sim-play-controls"><button className="sim-play" onClick={() => { if (time >= duration) setTime(0); setPlaying(p => !p); }} aria-label={playing ? 'Pausar simulación' : time >= duration ? 'Repetir simulación' : 'Iniciar simulación'}>{playing ? <Pause size={17} fill="currentColor"/> : <Play size={17} fill="currentColor"/>}{playing ? 'Pausar' : time >= duration ? 'Repetir' : time ? 'Continuar' : 'Iniciar simulación'}</button><button className="sim-icon-button" onClick={reset} aria-label="Reiniciar simulación"><RotateCcw size={17}/></button><button className="sim-icon-button" onClick={nextScene} disabled={time >= duration} aria-label="Siguiente escena"><SkipForward size={18}/></button><span className="sim-time">{clock(time)} <span>/ {clock(duration)}</span></span></div>
          <div className="sim-timeline"><input aria-label="Posición de la simulación" type="range" min="0" max={duration} value={time} onChange={e => setTime(Number(e.target.value))} style={{ '--progress': `${time / duration * 100}%` }}/></div>
          <label className="sim-speed">Velocidad<select value={speed} onChange={e => setSpeed(Number(e.target.value))}><option value=".5">0.5×</option><option value="1">1×</option><option value="2">2×</option><option value="4">4×</option></select></label>
          <details className="sim-presentation-options" ref={presentationOptions} onKeyDown={event=>{if(event.key==='Escape'){event.preventDefault();event.currentTarget.open=false;event.currentTarget.querySelector('summary').focus();}}}>
            <summary aria-label="Opciones de presentación" title="Opciones de presentación"><SlidersHorizontal size={19}/></summary>
            <div className="sim-options-popover">
              <strong>Presentación</strong>
              <SimulationSetup config={config} onApply={applyConfiguration}/>
              <div className="sim-layout-options" role="group" aria-label="Distribución de paneles"><button aria-pressed={focus==='both'} onClick={()=>setFocus('both')}><LayoutDashboard size={16}/>Dos paneles</button><button aria-pressed={focus==='three'} onClick={()=>setFocus('three')}><Columns3 size={16}/>Tres paneles</button></div>
              <label>Superior inmediato<select aria-label="Tipo de superior inmediato" value={superiorRole} onChange={event=>selectRole(event.target.value)}><option value="jefe">Jefe de unidad</option><option value="carrera">Jefe de carrera</option></select></label>
              <label>Ir a escena<select aria-label="Ir a escena" value={state.scene} onChange={event=>setTime(scenes[Number(event.target.value)].at)}>{scenes.map((item,index)=><option value={index} key={item.at}>{index+1}. {item.title}</option>)}</select></label>
            </div>
          </details>
        </section>

        {fullscreenError && <p role="status">{fullscreenError}</p>}
        {focus !== 'both' && focus !== 'three' && <button className="sim-return" onClick={() => setFocus('both')}><X size={14}/> Volver a los dos paneles</button>}

        <div className={`sim-panels focus-${focus}`}>
          <section className={`sim-personal sim-panel ${state.scene < 3 ? 'scene-active' : ''}`} aria-label="Panel del personal administrativo">
            <div className="sim-panel-heading"><div className="sim-profile"><span className="sim-person-avatar">{person.name.split(' ').slice(0,2).map(part=>part[0]).join('')}</span><div><small>PERSONAL ADMINISTRATIVO</small><div className="sim-person-name"><strong>{person.name}</strong><span className={`sim-person-status is-${participantStatus}`} role="status" aria-label={`${person.name}: ${statusLabel}`}><i aria-hidden="true"/>{statusLabel}</span></div></div></div><div className="sim-person-tools"><span className="sim-private" title="Espacio personal" aria-label="Espacio personal"><LockKeyhole size={15}/></span><button className="sim-icon-button" onClick={()=>setFocus(focus==='personal'?'both':'personal')} aria-label={focus==='personal'?'Volver a vista dividida':'Ampliar panel de Personal administrativo'} title={focus==='personal'?'Volver a vista dividida':'Ampliar panel'}><Expand size={16}/></button></div></div>
            <div className="sim-person-hero"><span className="sim-unit-label"><Building2 size={14}/>{person.unit}</span></div>

            <div className="sim-population-tools">
              <details ref={populationOptions} className="sim-population-options" onKeyDown={event=>{if(event.key==='Escape'){event.preventDefault();event.currentTarget.open=false;event.currentTarget.querySelector('summary').focus();}}}><summary aria-label="Configurar personal"><Users size={16}/>{config.participants} administrativos<SlidersHorizontal size={15}/></summary><div className="sim-population-popover"><SimulationSetup config={config} onApply={applyConfiguration}/></div></details>
              <label>Administrativo en pantalla<select aria-label="Administrativo en pantalla" value={person.id} onChange={event=>setSelectedParticipant(event.target.value)}>{state.participants.map(participant=><option value={participant.id} key={participant.id}>{participant.submitted?'🔴':participant.answered>0?'🟢':'⚪'} {participant.name} · {participant.submitted?'Enviado':participant.answered>0?'Llenando':'En espera'}</option>)}</select></label>
              <div className="sim-batch-status"><span>{state.completedParticipants} de {config.participants} cuestionarios enviados</span><progress value={state.completedParticipants} max={config.participants} aria-label="Cuestionarios del personal enviados"/></div>
            </div>
            {!person.submitted ? <div className="sim-questionnaire">
              <div className="sim-section-label"><span><ClipboardList size={15}/> Mi cuestionario</span><span>{person.answered} de 20</span></div><div className="sim-progress"><i style={{ width: `${person.answered * 5}%` }}/></div>
              <div className="sim-dimension-steps">{dimensions.map((d, i) => <span title={d.name} key={d.id} className={d.id === currentDimension.id ? 'current' : person.answered >= (i + 1) * 4 ? 'done' : ''}>{person.answered >= (i + 1) * 4 ? <Check size={12}/> : i + 1}</span>)}</div>
              <div className="sim-question-heading"><small>DIMENSIÓN {dimensions.indexOf(currentDimension) + 1} / 5</small><h3>{currentDimension.name}</h3><p>{currentDimension.description}</p></div>
              <div className="sim-questions">{currentDimension.questions.map((q, i) => {
                const selected = person.draft[`${currentDimension.id}-${i}`];
                return <div className={`sim-question ${selected ? 'answered' : ''}`} key={`${currentDimension.id}-${i}`}><div><span>{String(dimensions.indexOf(currentDimension) * 4 + i + 1).padStart(2, '0')}</span><p>{q}</p>{selected && <CheckCircle2 size={15}/>}</div><div className="sim-likert" role="group" aria-label={q}>{labels.map((label, j) => <span title={label} aria-label={`${j + 1}: ${label}${selected === j + 1 ? ', seleccionada' : ''}`} className={selected === j + 1 ? 'chosen' : ''} key={j}>{j + 1}</span>)}</div></div>;
              })}</div>
              <div className="sim-scale-labels"><span>1 · Totalmente en desacuerdo</span><span>5 · Totalmente de acuerdo</span></div><div className="sim-question-foot"><ShieldCheck size={14}/><span>{person.answered === 20 ? 'Cuestionario completo. Preparando envío…' : playing ? 'Completando respuestas de ejemplo…' : `Pulsa iniciar para ver cómo participa ${person.name.split(' ')[0]}.`}</span></div>
            </div> : <div className="sim-feedback" key="feedback"><div className="sim-received"><CheckCircle2 size={17}/> Cuestionario enviado · 20 respuestas</div><div className="sim-section-label"><span>Tu percepción por dimensión</span><span>Escala 1–5</span></div><div className="sim-personal-scores">{personal.map(d => <div key={d.id}><span>{d.name}</span><div><i style={{ width: `${d.value * 20}%`, background: d.color }}/></div><strong>{fmt(d.value)}</strong></div>)}</div><article className="sim-personal-tip"><h3>Recomendaciones para ti</h3>{personalRanked.slice(0, 2).map(d => <div key={d.id}><strong>{d.name}</strong><p>{d.tip}</p></div>)}</article><div className="sim-strength"><HeartHandshake size={18}/><p><strong>Tu mayor valoración: {personalRanked.at(-1).name.toLowerCase()}.</strong> Comparte las prácticas que favorecen el apoyo entre compañeros.</p></div><p className="sim-fineprint"><LockKeyhole size={12}/> Esta ficha refleja percepciones del entorno; no califica el desempeño personal.</p></div>}
          </section>

          <div className={`sim-connection ${newCount > 0 ? 'connected' : ''}`} aria-hidden="true"><span/><div><ArrowRight size={15}/></div><span/></div>

          {focus === 'three' ? <>
            <ManagementPanel state={state} role="rrhh" allPanels onExpand={()=>{setRole('rrhh');setFocus('management');}}/>
            <ManagementPanel state={state} role={superiorRole} allPanels onRoleChange={selectRole} onExpand={()=>{setRole(superiorRole);setFocus('management');}}/>
          </> : <ManagementPanel state={state} role={role} expanded={focus==='management'} onRoleChange={selectRole} onExpand={()=>setFocus(focus==='management'?'both':'management')}/>}

        </div>

        <p className="sim-clean-footnote">Simulación académica · Datos de ejemplo</p>
      </main>
    </div>
  </div>;
}
