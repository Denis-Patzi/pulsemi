import React from 'react';
import { Activity, Sparkles, Flag, HeartHandshake, Building2, LockKeyhole } from 'lucide-react';
import AnimatedNumber from './AnimatedNumber.jsx';

const icons = [Activity, Sparkles, Flag, HeartHandshake, Building2];

export default function DimensionMetrics({ data, available = true, count, personal = false }) {
  return <section className="dimension-metrics" aria-label={personal ? 'Indicadores de clima personal' : 'Indicadores de clima del ámbito seleccionado'}>
    <div className="dimension-metrics-heading"><div><h2>{personal ? 'Tu experiencia, dimensión por dimensión' : 'El clima en cinco dimensiones'}</h2><p>{personal ? 'Promedios de tus respuestas al cuestionario' : 'Promedios de los cuestionarios completos del ámbito seleccionado'}</p></div><span className="pill">Escala 1–5</span></div>
    <div className="dimension-metrics-grid">{data.map((dimension, index) => {
      const Icon = icons[index];
      return <article className={`dimension-metric tone-${index}`} key={dimension.id} aria-label={dimension.name}>
        <div className="dimension-metric-heading"><span style={{color: dimension.color}}><Icon size={19}/></span><h3>{dimension.name}</h3></div>
        <div className="dimension-metric-value">{available ? <><AnimatedNumber value={dimension.value}/><small>/ 5</small></> : <><span>—</span><LockKeyhole size={19}/></>}</div>
        {available && <div className="dimension-metric-track" role="meter" aria-label={`Promedio de ${dimension.name}`} aria-valuemin={1} aria-valuemax={5} aria-valuenow={dimension.value} aria-valuetext={`${dimension.value.toFixed(2)} de 5`}><i style={{width:`${dimension.value/5*100}%`,background:dimension.color}}/></div>}
        <p>{!available ? 'Disponible desde 5 respuestas' : personal ? `Promedio de tus ${dimension.questions.length} respuestas` : `${count} cuestionarios completos`}</p>
      </article>;
    })}</div>
  </section>;
}
