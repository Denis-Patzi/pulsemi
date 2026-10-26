import React, {useEffect,useState} from 'react';
import {RotateCcw} from 'lucide-react';
import './simulation-setup.css';

export default function SimulationSetup({config,onApply}){
  const [participants,setParticipants]=useState(String(config.participants));
  const [initialData,setInitialData]=useState(config.initialData);
  useEffect(()=>{setParticipants(String(config.participants));setInitialData(config.initialData);},[config.participants,config.initialData]);
  return <form className="sim-setup-form" onSubmit={event=>{
    event.preventDefault();
    const count=Number(participants);
    if(!Number.isInteger(count)||count<1||count>500)return;
    onApply({initialData,participants:count});
  }}>
    <label>Inicio de datos<select aria-label="Inicio de datos" value={initialData} onChange={event=>setInitialData(event.target.value)}><option value="empty">Desde cero · 0 respuestas</option><option value="example">Con datos de ejemplo · 33 respuestas</option></select></label>
    <label>Cantidad de administrativos<input aria-label="Cantidad de administrativos" type="number" inputMode="numeric" min="1" max="500" step="1" required value={participants} onChange={event=>setParticipants(event.target.value)}/></label>
    <p>Entre 1 y 500 personas nuevas. Aplicar reinicia el recorrido.</p>
    <button type="submit"><RotateCcw size={15}/>Aplicar y reiniciar</button>
  </form>;
}
