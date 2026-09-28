import test from 'node:test';
import assert from 'node:assert/strict';
import {dimensions,complete,scores,aggregate,visibleResponses,users,seed,mean} from './model.js';
const answers=Object.fromEntries(dimensions.flatMap(d=>d.questions.map((_,i)=>[`${d.id}-${i}`,5])));
test('Solo se aceptan cuestionarios completos en escala 1–5',()=>{assert.equal(complete(answers),true);assert.equal(complete({}),false);assert.equal(complete({...answers,'liderazgo-0':6}),false);assert.equal(complete({...answers,'liderazgo-0':2.5}),false);});
test('Calcula correctamente promedios individuales y consolidados',()=>{assert.equal(mean(scores(answers)),5);const low=Object.fromEntries(Object.keys(answers).map(k=>[k,1]));assert.equal(mean(aggregate([{answers},{answers:low}])),3);assert.equal(mean(aggregate([])),0);});
test('La jefatura solo obtiene respuestas de su unidad, incluso al pedir Todas',()=>{const responses=seed();const result=visibleResponses(responses,users[2],'Todas');assert.ok(result.length>0);assert.ok(result.every(r=>r.unit===users[2].unit));assert.ok(result.length<responses.length);});
test('RRHH puede consolidar todas las unidades o una sola',()=>{const responses=seed();assert.equal(visibleResponses(responses,users[1]).length,33);assert.equal(visibleResponses(responses,users[1],users[2].unit).length,11);assert.ok(responses.every(r=>complete(r.answers)));});
