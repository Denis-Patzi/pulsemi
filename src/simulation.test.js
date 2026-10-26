import test from 'node:test';
import assert from 'node:assert/strict';
import { aggregate, complete, mean, units } from './model.js';
import { duration, scenes, simulationState, managementView, normalizeSimulationConfig } from './simulation.js';

test('Las preguntas parciales nunca entran en el consolidado institucional', () => {
  for (let time = 0; time <= duration; time++) {
    const state = simulationState(time);
    assert.ok(state.responses.every(r => complete(r.answers)));
    assert.equal(state.responses.length, 33 + state.background.length + Number(state.submitted));
    assert.equal(state.responses.filter(r => r.id === 'simulation-ana').length, Number(time >= 68));
  }
  assert.equal(simulationState(65).answered, 19);
  assert.equal(simulationState(66).answered, 20);
  assert.equal(simulationState(67).submitted, false);
  assert.equal(simulationState(68).submitted, true);
});

test('Adelantar y retroceder reconstruye un estado reproducible sin duplicar registros', () => {
  const final = simulationState(duration);
  simulationState(50);
  assert.deepEqual(simulationState(duration), final);
  assert.equal(new Set(final.responses.map(r => r.id)).size, final.responses.length);
  assert.equal(final.responses.length, 49);
  assert.equal(simulationState(0).responses.length, 33);
  assert.deepEqual(simulationState(-1), simulationState(0));
  assert.deepEqual(simulationState(999), final);
});

test('Las prioridades y acciones derivan de las respuestas de la unidad de jefatura', () => {
  const state = simulationState(150);
  const priorities = aggregate(state.unitResponses).sort((a,b) => a.value-b.value).slice(0,2);
  assert.ok(state.unitResponses.every(r => r.unit === units[1]));
  assert.deepEqual(state.actions.map(a => a.id), priorities.map(d => d.id));
  assert.ok(state.actions.every(a => a.status === 'Programada' && a.unit === units[1]));
  assert.ok(simulationState(170).actions.every(a => a.status === 'En curso'));
  assert.equal(mean(aggregate(state.responses)), mean(aggregate(simulationState(170).responses)));
  assert.equal(simulationState(143).actions.length, 0);
});

test('Las escenas se pueden recorrer en orden y la última permanece al finalizar', () => {
  scenes.forEach((scene, index) => assert.equal(simulationState(scene.at).scene, index));
  assert.equal(simulationState(duration).scene, scenes.length - 1);
});

test('El jefe de carrera consulta su ámbito y RRHH recibe los planes de ambas áreas', () => {
  const state=simulationState(duration);
  const career=managementView(state,'carrera');
  const management=managementView(state,'jefe');
  const hr=managementView(state,'rrhh');
  assert.equal(career.responses.length,19);
  assert.equal(career.baseline,14);
  assert.ok(career.responses.every(r=>r.unit===units[2]));
  assert.ok(career.actions.every(a=>a.unit===units[2]));
  assert.ok(management.actions.every(a=>a.unit===units[1]));
  assert.equal(hr.responses.length,49);
  assert.equal(hr.actions.length,4);
  assert.deepEqual(hr.actions,[...management.actions,...career.actions]);
  assert.equal(managementView(simulationState(143),'carrera').actions.length,0);
});

test('Elegir jefe de carrera incorpora el cuestionario personal al ámbito académico', () => {
  const state=simulationState(duration,'carrera');
  assert.equal(state.personalUnit,units[2]);
  assert.equal(state.responses.find(r=>r.id==='simulation-ana').unit,units[2]);
  assert.equal(managementView(state,'carrera').responses.length,20);
  assert.equal(managementView(state,'jefe').responses.length,16);
  assert.equal(managementView(state,'rrhh').responses.length,49);
  assert.equal(simulationState(67,'carrera').responses.some(r=>r.id==='simulation-ana'),false);
});

test('Desde cero inicia sin participación, promedios ni acciones en los tres perfiles de gestión',()=>{
  const state=simulationState(0,'jefe',{initialData:'empty',participants:30});
  assert.equal(state.responses.length,0);
  assert.equal(state.completedParticipants,0);
  for(const role of ['rrhh','jefe','carrera']){
    const view=managementView(state,role);
    assert.equal(view.responses.length,0);
    assert.equal(view.baseline,0);
    assert.equal(view.available,false);
    assert.equal(view.actions.length,0);
  }
});

test('La población elegida se envía completa sin duplicados y se reparte entre los ámbitos',()=>{
  for(const count of [1,2,3,16,30,114,500]){
    const state=simulationState(duration,'carrera',{initialData:'empty',participants:count});
    assert.equal(state.participants.length,count);
    assert.equal(state.responses.length,count);
    assert.equal(state.completedParticipants,count);
    assert.equal(new Set(state.responses.map(r=>r.id)).size,count);
    assert.ok(state.responses.every(r=>complete(r.answers)));
    assert.equal(Object.values(state.participationTargets).reduce((a,b)=>a+b,0),count);
    assert.equal(state.participationTargets[units[2]],managementView(state,'carrera').responses.length);
  }
});

test('Los envíos crecen solo al completar 20 preguntas y retroceder reconstruye el estado',()=>{
  const config={initialData:'empty',participants:30};
  let previous=0;
  for(let tick=0;tick<=duration;tick++){
    const state=simulationState(tick,'carrera',config);
    assert.ok(state.responses.length>=previous);
    assert.ok(state.responses.every(r=>r.submitted&&r.answered===20&&complete(r.answers)));
    assert.equal(state.responses.length,state.participants.filter(p=>p.submitted).length);
    previous=state.responses.length;
  }
  assert.deepEqual(simulationState(45,'carrera',config),simulationState(45,'carrera',config));
  assert.equal(simulationState(0,'carrera',config).responses.length,0);
});

test('No genera recomendaciones de gestión ni acciones para grupos insuficientes',()=>{
  const state=simulationState(duration,'carrera',{initialData:'empty',participants:3});
  for(const role of ['rrhh','jefe','carrera']){
    const view=managementView(state,role);
    assert.equal(view.available,false);
    assert.equal(view.actions.length,0);
  }
  const sufficient=simulationState(duration,'carrera',{initialData:'empty',participants:30});
  assert.equal(managementView(sufficient,'rrhh').actions.length,4);
  assert.equal(managementView(sufficient,'jefe').responses.length,10);
  assert.equal(managementView(sufficient,'carrera').responses.length,10);
});

test('Normaliza límites y conserva por separado los cuestionarios previos y nuevos',()=>{
  assert.equal(normalizeSimulationConfig({participants:999}).participants,500);
  assert.equal(normalizeSimulationConfig({participants:-3}).participants,1);
  assert.equal(normalizeSimulationConfig({participants:2.5}).participants,2);
  assert.equal(normalizeSimulationConfig({participants:'no válido'}).participants,16);
  const state=simulationState(duration,'jefe',{initialData:'example',participants:30});
  assert.equal(state.initialResponses.length,33);
  assert.equal(state.responses.length,63);
  assert.equal(state.completedParticipants,30);
  assert.equal(managementView(state,'rrhh').baseline,33);
});
