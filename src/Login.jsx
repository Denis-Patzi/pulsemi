import React, {useEffect, useRef, useState} from 'react';
import {Activity, ArrowRight, Building2, ChevronRight, ClipboardList, GraduationCap, Mail, Moon, LockKeyhole, Sun, Users} from 'lucide-react';
import {users, password} from './model.js';
import './login.css';

const profiles = {personal:{label:'Personal administrativo',icon:ClipboardList},rrhh:{label:'Recursos Humanos',icon:Users},jefe:{label:'Superior inmediato',icon:GraduationCap}};

export default function Login({onLogin,onDemo,theme,toggleTheme,brand}) {
  const [email,setEmail]=useState('');
  const [pass,setPass]=useState('');
  const [error,setError]=useState('');
  const [profilesOpen,setProfilesOpen]=useState(false);
  const [supervisorsOpen,setSupervisorsOpen]=useState(false);
  const picker=useRef(null);
  const emailInput=useRef(null);
  const profileButton=useRef(null);
  const superiorButton=useRef(null);
  const superiorMenu=useRef(null);
  useEffect(()=>{if(!profilesOpen)setSupervisorsOpen(false);},[profilesOpen]);

  useEffect(()=>{
    if(!profilesOpen)return;
    function outside(event){if(!picker.current?.contains(event.target))setProfilesOpen(false);}
    document.addEventListener('pointerdown',outside);
    return()=>document.removeEventListener('pointerdown',outside);
  },[profilesOpen]);

  function openProfiles(focusFirst=false){
    setProfilesOpen(true);
    if(focusFirst)requestAnimationFrame(()=>picker.current?.querySelector('[role="menuitem"]')?.focus());
  }
  function handleKeys(event){
    const items=[...picker.current.querySelectorAll('[role="menuitem"]')];
    const current=items.indexOf(document.activeElement);
    if(event.key==='Escape'){
      event.preventDefault();event.stopPropagation();
      if(supervisorsOpen){setSupervisorsOpen(false);superiorButton.current.focus();}
      else{setProfilesOpen(false);profileButton.current.focus();}
    }else if(event.key==='ArrowRight'&&document.activeElement===superiorButton.current){
      event.preventDefault();openSupervisors(true);
    }else if(event.key==='ArrowLeft'&&supervisorsOpen){
      event.preventDefault();setSupervisorsOpen(false);superiorButton.current.focus();
    }else if(['ArrowDown','ArrowUp','Home','End'].includes(event.key)){
      event.preventDefault();
      if(!profilesOpen){openProfiles(true);return;}
      const index=event.key==='Home'?0:event.key==='End'?items.length-1:event.key==='ArrowUp'?(current-1+items.length)%items.length:(current+1)%items.length;
      items[index]?.focus();
    }
  }
  function openSupervisors(focusFirst=false){setSupervisorsOpen(true);if(focusFirst)requestAnimationFrame(()=>superiorMenu.current?.querySelector('[role="menuitem"]')?.focus());}
  function selectProfile(user){setEmail(user.email);setPass(password);setError('');setProfilesOpen(false);emailInput.current.focus();}

  return <div className="login login-clean">
    <section className="login-story">
      {brand}
      <div><span className="eyebrow">ESCUELA MILITAR DE INGENIERÍA</span><h1>Un mejor entorno.<br/><span>Lo construimos juntos.</span></h1><p>Escuchar, comprender y actuar. Un espacio para transformar las percepciones de hoy en el bienestar de mañana.</p>
        <div className="story-art"><div className="art-orbit"/><img className="emi-seal" src="/images/emi-escudo.jpg" alt="Escudo de la Escuela Militar de Ingeniería"/><div className="floating-card"><span className="green-icon"><Users size={20}/></span><div><strong>Las personas, primero</strong><small>Tu opinión hace la diferencia</small></div></div></div>
      </div>
      <small>Unidad Académica La Paz · Plataforma de clima laboral</small>
    </section>
    <section className="login-form" aria-label="Acceso a pulsEMI">
      <div className="login-box">
        <div className="login-utilities">
          <div className="login-profile-picker" ref={picker} onKeyDown={handleKeys}
            onPointerEnter={event=>{if(event.pointerType==='mouse')openProfiles();}}
            onPointerLeave={()=>{if(!picker.current.contains(document.activeElement))setProfilesOpen(false);}}
            onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget))setProfilesOpen(false);}}>
            <button ref={profileButton} type="button" className={`login-icon-button ${profilesOpen?'is-open':''}`} aria-label="Elegir perfil" title="Elegir perfil" aria-haspopup="menu" aria-expanded={profilesOpen} aria-controls="login-profile-menu" onClick={()=>openProfiles(true)}><Users size={21}/></button>
            {profilesOpen&&<div id="login-profile-menu" role="menu" aria-label="Perfiles de acceso" className="login-profile-menu">
              {users.filter(user=>user.role!=='jefe').map(user=>{const {label,icon:Icon}=profiles[user.role];return <button type="button" role="menuitem" tabIndex={-1} key={user.id} onClick={()=>selectProfile(user)}><span><Icon size={19}/></span>{label}<ArrowRight size={15}/></button>;})}
              <button ref={superiorButton} type="button" role="menuitem" tabIndex={-1} aria-haspopup="menu" aria-expanded={supervisorsOpen} aria-controls="login-superior-menu" onPointerEnter={event=>{if(event.pointerType==='mouse')openSupervisors();}} onClick={()=>openSupervisors(true)}><span><GraduationCap size={19}/></span>Superior inmediato<ChevronRight className={supervisorsOpen?'login-submenu-arrow open':'login-submenu-arrow'} size={16}/></button>
              {supervisorsOpen&&<div ref={superiorMenu} id="login-superior-menu" className="login-superior-menu" role="menu" aria-label="Tipos de superior inmediato">
                {users.filter(user=>user.role==='jefe').map(user=>{const career=user.supervisorType==='carrera';const Icon=career?GraduationCap:Building2;return <button type="button" role="menuitem" tabIndex={-1} key={user.id} onClick={()=>selectProfile(user)}><span><Icon size={18}/></span>{career?'Jefe de carrera':'Jefe de unidad'}<ArrowRight size={14}/></button>;})}
              </div>}
            </div>}
          </div>
          <div className="login-utility-actions">
            <button type="button" className="login-icon-button" aria-label={theme==='dark'?'Activar tema claro':'Activar tema oscuro'} title={theme==='dark'?'Activar tema claro':'Activar tema oscuro'} onClick={toggleTheme}>{theme==='dark'?<Sun size={20}/>:<Moon size={20}/>}</button>
            <button type="button" className="login-icon-button login-simulation-icon" aria-label="Abrir simulación" title="Abrir simulación" onClick={onDemo}><Activity size={22}/></button>
          </div>
        </div>
        <div className="login-heading"><span className="login-heading-mark"><Building2 size={17}/><span>pulsEMI · La Paz</span></span><h2>Te damos la bienvenida</h2><p>Ingresa a tu espacio de trabajo institucional.</p></div>
        <form onSubmit={event=>{event.preventDefault();const user=users.find(u=>u.email===email.trim().toLowerCase());if(!user||pass!==password){setError('El correo o la contraseña no son correctos.');return;}onLogin(user);}}>
          <label>Correo electrónico<div className="input-icon"><Mail size={18}/><input ref={emailInput} required type="email" autoComplete="username" placeholder="tu.correo@emi.edu.bo" value={email} onChange={event=>setEmail(event.target.value)}/></div></label>
          <label>Contraseña<div className="input-icon"><LockKeyhole size={18}/><input required type="password" autoComplete="current-password" placeholder="Ingresa tu contraseña" value={pass} onChange={event=>setPass(event.target.value)}/></div></label>
          {error&&<p role="alert" className="error">{error}</p>}
          <button className="btn primary full" type="submit">Iniciar sesión<ArrowRight size={18}/></button>
        </form>
      </div>
    </section>
  </div>;
}
