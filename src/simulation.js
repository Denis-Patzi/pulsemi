import { aggregate, complete, dimensions, mean, seed, units } from './model.js';

export const duration = 180;
export const scenes = [
  { at: 0, title: 'El recorrido', caption: 'Una respuesta puede iniciar un cambio. Sigue el camino de la escucha a la acción.' },
  { at: 6, title: 'La voz del personal', caption: 'Ana responde el cuestionario. Otros participantes ficticios envían sus respuestas en segundo plano.' },
  { at: 72, title: 'Orientación personal', caption: 'Ana recibe una ficha privada con recomendaciones según sus percepciones del entorno.' },
  { at: 94, title: 'Recursos Humanos', caption: 'Las respuestas completas actualizan los promedios institucionales. La ficha personal permanece privada.' },
  { at: 120, title: 'La mirada de jefatura', caption: 'La jefatura consulta solo su unidad y reconoce los aspectos que requieren acompañamiento.' },
  { at: 144, title: 'Un compromiso concreto', caption: 'La jefatura convierte las prioridades de su unidad en acciones con responsables y fechas.' },
  { at: 164, title: 'Seguimiento compartido', caption: 'RR. HH. acompaña los compromisos. Las acciones están en curso; su impacto requerirá una nueva medición.' },
];
const questions = dimensions.flatMap(d => d.questions.map((text, i) => ({ key: `${d.id}-${i}`, dimension: d.id, text })));
export const personalAnswers = Object.fromEntries(questions.map((q, i) => [q.key, [2, 2, 3, 2, 2, 3, 2, 2, 4, 4, 3, 4, 5, 4, 4, 5, 3, 4, 3, 4][i]]));

function backgroundResponse(index) {
  const unit = units[index % units.length];
  const names=['Luis Mamani','Elena Flores','Diego Condori','Carla Mendoza','José Apaza','Rosa Vargas'];
  return {
    id: `simulation-${index}`, userId: `simulation-${index}`, unit, demo: true,
    name:`${names[index%names.length]}${index>=names.length?` ${Math.floor(index/names.length)+1}`:''}`,
    answers: Object.fromEntries(questions.map((q, i) => [q.key, Math.max(1, Math.min(5,
      (q.dimension === 'comunicacion' || q.dimension === 'motivacion' ? 2 : 4) + ((index + i) % 3) - 1))])),
  };
}

export const defaultSimulationConfig = {initialData:'example',participants:16};
export function normalizeSimulationConfig(config={}){
  const count=Number(config.participants);
  return {initialData:config.initialData==='empty'?'empty':'example',participants:Number.isFinite(count)?Math.max(1,Math.min(500,Math.trunc(count))):16};
}

export function simulationState(time, scenario = 'jefe', configuration = defaultSimulationConfig) {
  const config=normalizeSimulationConfig(configuration);
  const tick = Math.max(0, Math.min(duration, Number.isFinite(time) ? time : 0));
  const answered = Math.max(0, Math.min(questions.length, Math.floor((tick - 6) / 3)));
  const answers = Object.fromEntries(questions.slice(0, answered).map(q => [q.key, personalAnswers[q.key]]));
  const submitted = tick >= 68 && complete(answers);
  const personalUnit = scenario === 'carrera' ? units[2] : units[1];
  const response = { id: 'simulation-ana', userId: 'simulation-ana', name:'Ana Quispe',unit: personalUnit, answers: personalAnswers, demo: true, sentAt:68 };
  const plan=[response,...Array.from({length:config.participants-1},(_,i)=>({...backgroundResponse(i),sentAt:12+112*i/Math.max(1,config.participants-2)}))];
  const participants=plan.map((person,index)=>{
    const sent=tick>=person.sentAt;
    const count=index===0?answered:Math.max(0,Math.min(20,Math.floor((tick-(person.sentAt-8))/8*20)));
    return {...person,submitted:sent,answered:count,draft:Object.fromEntries(questions.slice(0,count).map(q=>[q.key,person.answers[q.key]]))};
  });
  const background=participants.slice(1).filter(person=>person.submitted);
  const initialResponses=config.initialData==='empty'?[]:seed();
  const completed=participants.filter(person=>person.submitted).sort((a,b)=>a.sentAt-b.sentAt);
  const responses=[...initialResponses,...completed];
  const participationTargets=Object.fromEntries(units.map(unit=>[unit,plan.filter(person=>person.unit===unit).length]));
  const unitResponses = responses.filter(r => r.unit === units[1]);
  const priorities = unitResponses.length<5?[]:aggregate(unitResponses).sort((a, b) => a.value - b.value).slice(0, 2);
  const actions = tick < 144 ? [] : priorities.map((d, i) => ({
    id: d.id, title: d.management, dimension: d.name, unit: units[1],
    owner: i === 0 ? 'Jefatura de unidad' : 'Recursos Humanos + jefatura',
    due: i === 0 ? '09 nov 2026' : '16 nov 2026', status: tick >= 164 ? 'En curso' : 'Programada',
  }));
  return { tick, answered, answers, background, submitted, responses, unitResponses, priorities, actions, personalUnit,
    config,participants,initialResponses,participationTargets,completedParticipants:completed.length,
    scene: scenes.findLastIndex(s => tick >= s.at), average: mean(aggregate(responses)) };
}

export function managementView(state, role) {
  const unit = role === 'carrera' ? units[2] : role === 'jefe' ? units[1] : null;
  const responses = unit ? state.responses.filter(r => r.unit === unit) : state.responses;
  const baseline = unit ? state.initialResponses.filter(r=>r.unit===unit).length : state.initialResponses.length;
  const target=unit?state.participationTargets[unit]:state.config.participants;
  const careerResponses=state.responses.filter(r=>r.unit===units[2]);
  const careerPriorities = careerResponses.length<5?[]:aggregate(careerResponses).sort((a,b) => a.value-b.value).slice(0,2);
  const careerActions = state.tick < 144 ? [] : careerPriorities.map((d,i) => ({
    id: `carrera-${d.id}`, title: d.management, dimension: d.name, unit: units[2],
    owner: i === 0 ? 'Jefe de carrera' : 'Recursos Humanos + jefe de carrera',
    due: i === 0 ? '09 nov 2026' : '16 nov 2026', status: state.tick >= 164 ? 'En curso' : 'Programada',
  }));
  return { unit, responses, baseline,target,available:responses.length>=5, actions: role === 'carrera' ? careerActions : role === 'rrhh' ? [...state.actions,...careerActions] : state.actions };
}
