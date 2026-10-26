# pulsEMI

## Demostración automática para exposición

La pantalla inicial presenta el nuevo espacio visual inspirado en `idea1.png` e `idea-2.png`: superficies claras, tarjetas translúcidas, tonos suaves y estadísticas animadas. En escritorio se pueden mostrar dos o tres paneles conectados; en móvil se disponen uno debajo del otro.

El botón superior del menú permite **contraerlo a una columna de iconos** o expandirlo. La preferencia se conserva en `localStorage` bajo `pulse-sidebar-collapsed`; los iconos incluyen etiquetas accesibles y nombres al pasar el cursor. **Ver tres paneles** muestra simultáneamente Personal administrativo, Recursos Humanos y Superior inmediato. El icono **Opciones de presentación** de la barra flotante reúne los botones **Dos paneles / Tres paneles**, el tipo de superior inmediato y el selector para ir a cualquiera de las siete escenas. También funciona en móvil, se cierra con Escape o clic fuera y permite conservar la presentación despejada. Reiniciar la simulación conserva la distribución seleccionada.

El perfil **Superior inmediato** permite elegir **Jefe de unidad** o **Jefe de carrera**, incluso dentro de la vista de tres paneles. En la vista de dos paneles también puede seleccionarse RR. HH. La jefatura conserva el ámbito de Asuntos Administrativos y Financieros; para el jefe de carrera se usa el Área Académica como ámbito ficticio de ejemplo, sin afirmar que represente una carrera real. La dependencia de Ana cambia con el escenario seleccionado, de modo que su cuestionario actualiza el ámbito de su superior. Cada responsable consulta únicamente sus resultados y acciones; RR. HH. reúne ambas áreas. Al final se muestran dos acciones por área con al menos cinco respuestas, hasta cuatro en la vista institucional. Los tres paneles comparten respuestas y reloj de simulación.

El botón **Tema oscuro / Tema claro** está en la parte inferior del menú y sigue disponible como icono al contraerlo. En móvil está en la cabecera. La preferencia usa la clave compartida `pulse-theme`, se conserva al recargar y se mantiene al entrar en la plataforma manual. Sin una preferencia guardada se utiliza el tema del sistema. Ambos temas incluyen cuestionario, tarjetas, tablas, recomendaciones, acciones y barra flotante.

Pulsa **Iniciar simulación** para recorrer una presentación de **3 minutos**:

1. Ana Quispe responde las 20 preguntas de clima laboral.
2. Al enviar recibe una ficha con resultados, fortalezas y recomendaciones personales.
3. RR. HH. consulta los promedios institucionales y las respuestas recibidas.
4. La jefatura consulta únicamente Asuntos Administrativos y Financieros.
5. Se registran dos acciones relacionadas con las menores valoraciones de esa unidad.
6. Las acciones pasan de programadas a en curso para mostrar su seguimiento.

La barra flotante, centrada en la parte inferior de la pantalla, permite iniciar, pausar, continuar, reiniciar, saltar de escena, desplazar la línea de tiempo y elegir velocidad (0.5×, 1×, 2×, 4×). El botón superior alterna pantalla completa. El panel de gestión incluye un selector RR. HH./Jefatura; la presentación selecciona el perfil correspondiente al entrar en cada escena. Los dos paneles muestran su contenido completo, sin desplazamiento interno: se recorre la página principal y la barra permanece accesible. El menú permite ampliar un perfil.

La cabecera de la simulación muestra únicamente el título, la escena actual y su explicación breve. Se retiraron adornos, mensajes repetidos y la navegación de escenas desplegada permanentemente. Los paneles conservan sus valores, tablas y recomendaciones; las tarjetas de dimensiones distribuyen el espacio para evitar números cortados o etiquetas demasiado estrechas. Se mantiene la misma escala tipográfica que en el sistema manual. En móvil, el icono de la cabecera permite volver al sistema.

Las vistas individuales **Personal administrativo**, **Recursos Humanos** y **Superior inmediato** ocupan todo el ancho disponible, sin el límite de ancho de los paneles compactos. Las tablas muestran los nombres completos de las unidades y la ficha personal distribuye resultados y recomendaciones en dos columnas cuando hay espacio. Los formatos compactos se reservan para la demostración dividida y la vista de tres paneles. El icono de ampliar de cada panel también permite abrir estas vistas en móvil y volver a la vista dividida. Al elegir una vista individual de gestión, el perfil seleccionado se conserva aunque avance la escena.

En **Configurar personal** (botón con la cantidad de administrativos del panel personal), o en **Opciones de presentación**, se puede elegir **Desde cero · 0 respuestas** o **Con datos de ejemplo · 33 respuestas**. El campo **Cantidad de administrativos** admite entre 1 y 500 personas nuevas, incluida Ana. **Aplicar y reiniciar** pausa y vuelve al inicio conservando la distribución. Desde cero, RR. HH., jefe de unidad y jefe de carrera comienzan con participación cero; reciben únicamente los cuestionarios completos de su ámbito. El selector **Administrativo en pantalla** permite seguir las preguntas y la ficha de cualquier participante. La participación y las tablas crecen con los envíos; los promedios, prioridades y acciones de gestión requieren al menos cinco respuestas completas en el ámbito correspondiente.

Por defecto, la simulación comienza con 33 cuestionarios ficticios completos y 16 participantes nuevos configurados. Durante el recorrido se incorporan 15 participantes ficticios adicionales y el cuestionario de Ana: **49 respuestas al finalizar**. Las preguntas parciales solo actualizan el progreso personal; se incorporan al consolidado al enviar las 20 respuestas. Los gráficos, tablas y acciones se calculan a partir de esos mismos registros. El plan de mejora no altera los resultados: comprobar su impacto requeriría una nueva medición.

Este recorrido es local, reproducible y no escribe respuestas ni acciones en `localStorage`, no envía correos y no requiere servicios externos. Reiniciar o retroceder reconstruye el estado sin duplicar registros. No representa una medición real del clima o del desempeño.

**Explorar plataforma** abre los perfiles manuales del prototipo anterior, conservando sus datos locales. También se puede acceder mediante `/?vista=plataforma`. **Abrir simulación** regresa al modo exposición. El historial del navegador permite regresar entre ambas vistas.

Archivos de la demostración:

- `src/Simulation.jsx`: interfaz, controles y perfiles.
- `src/SimulationSetup.jsx` y `src/simulation-setup.css`: configuración de población e inicio de datos.
- `src/SimulationManagement.jsx`: métricas, tablas y estados de espera de gestión.
- `src/simulation.css`: diseño responsive y estilos de presentación.
- `src/simulation.js`: escenas, participantes y cálculo reproducible del recorrido.
- `src/simulation.test.js`: integridad de envíos, reinicio, escenas y prioridades de gestión.

Plataforma web de demostración para explorar el clima laboral del personal administrativo de la **Escuela Militar de Ingeniería, Unidad Académica La Paz**. Conecta un cuestionario y una ficha individual de retroalimentación con paneles estadísticos para Recursos Humanos y jefaturas.

Desarrollada con **React + Vite**, diseño responsive, temas claro/oscuro y almacenamiento local. **No requiere backend ni base de datos.**

## Funcionalidades y perfiles

| Perfil | Funciones disponibles |
| --- | --- |
| Personal administrativo | Responder 20 preguntas en cinco secciones, guardar un borrador, consultar su ficha personalizada e imprimirla o guardarla como PDF. |
| Recursos Humanos | Consultar resultados generales y por unidad, filtrar promedios, exportar un consolidado CSV y registrar acciones de mejora. |
| Jefatura | Consultar resultados y gestionar acciones de su unidad: Asuntos Administrativos y Financieros. |

El cuestionario utiliza una escala Likert de **1 a 5**, incluyendo la opción neutral. La ficha muestra las dimensiones con mayor y menor valoración relativa y ofrece recomendaciones. Los paneles ocultan los promedios de grupos con menos de cinco respuestas.

La demo inicia con **33 respuestas ficticias**: 8 de Dirección, 11 de Asuntos Administrativos y Financieros y 14 del Área Académica. Las respuestas registradas desde el cuestionario se suman a esos datos; el panel distingue sus cantidades.

## Requisitos e instalación

- Node.js compatible con Vite 7: 20.19+ en la rama 20, o 22.12+ en versiones posteriores. El proyecto se compiló con Node.js 24.21.0.
- npm instalado junto a Node.js.
- Un navegador moderno con JavaScript y almacenamiento local habilitados.

Desde la carpeta del proyecto:

```sh
npm ci
npm run dev
```

Abre la dirección indicada en la terminal; normalmente es **http://127.0.0.1:5173**. Si el puerto está ocupado, Vite selecciona otro. Mantén la terminal abierta mientras utilices la aplicación.

En PowerShell, si la política de ejecución bloquea `npm.ps1`, usa:

```powershell
npm.cmd ci
npm.cmd run dev
```

No se necesitan archivos `.env`, claves externas ni configuración de base de datos. La descarga inicial de dependencias requiere internet. Los logos están incluidos localmente; las fuentes de Google usan conexión y cuentan con fuentes de respaldo.

## Comandos

| Comando | Uso |
| --- | --- |
| `npm run dev` | Servidor de desarrollo en la interfaz local `127.0.0.1`. |
| `npm test` | Pruebas de validación, cálculos y filtrado por perfil con el ejecutor de Node.js. |
| `npm run build` | Genera la aplicación estática en `dist/`. |
| `npm run preview` | Sirve localmente la compilación existente. Requiere ejecutar `build` primero. |

`dist/` puede publicarse en un alojamiento estático. La configuración actual supone que la aplicación se sirve desde la raíz del dominio. Los servidores de desarrollo y `preview` son herramientas de revisión local.

## Cuentas de demostración

**Contraseña compartida: `Emi2026!`**

| Correo | Perfil | Nombre de ejemplo |
| --- | --- | --- |
| `personal@emi.test` | Personal administrativo | Ana Quispe |
| `rrhh@emi.test` | Recursos Humanos | Lucía Mendoza |
| `jefatura@emi.test` | Superior inmediato · Jefe de unidad | Carlos Vargas |
| `carrera@emi.test` | Superior inmediato · Jefe de carrera | María Rojas |

El login muestra únicamente el formulario y los iconos de perfiles, tema y simulación. Al pasar el mouse por **Elegir perfil** aparecen Personal administrativo, Recursos Humanos y Superior inmediato. También puede abrirse con clic, toque o teclado; las flechas recorren las opciones y Escape cierra el menú. Seleccionar un perfil rellena las credenciales; después se debe pulsar **Iniciar sesión**. La contraseña compartida y los avisos sobre datos ficticios ya no se muestran en esta pantalla. Los correos `.test` siguen siendo ficticios: no se envían mensajes ni existe recuperación de contraseña. El icono de pulso abre directamente la simulación.

**Superior inmediato** despliega dos accesos: **Jefe de unidad** y **Jefe de carrera**. Ambos usan el mismo perfil funcional de supervisión y cuentas distintas. El primero consulta Asuntos Administrativos y Financieros; el segundo consulta el Área Académica como ámbito de ejemplo. Sus resultados, exportaciones y acciones quedan limitados al ámbito de la cuenta. El submenú funciona con mouse, clic o toque; con teclado se entra mediante flecha derecha y se vuelve mediante flecha izquierda o Escape.

## Estructura del proyecto

```text
proyecto-v/
├── public/
│   └── images/
│       ├── pulsemi-icon.svg       # Símbolo de pulso azul/amarillo y favicon
│       ├── emi-main.png           # Logotipo institucional de referencia
│       └── emi-escudo.jpg         # Escudo usado en login y bienvenida
├── src/
│   ├── main.jsx                   # Entrada React, componentes y navegación
│   ├── model.js                   # Cuentas, preguntas, cálculos y datos de ejemplo
│   ├── model.test.js              # Pruebas de la lógica del modelo
│   ├── styles.css                 # Estilos base, distribución e impresión
│   └── theme.css                  # Identidad, legibilidad y tema oscuro
├── stitch_pulse_emi_dashboard/    # Referencias originales exportadas de Stitch
│   ├── bienvenida_clima_administrativo_emi/
│   ├── cuestionario_de_clima_administrativo/
│   ├── detalle_por_unidad_administrativa/
│   ├── ficha_privada_de_retroalimentaci_n/
│   ├── panel_de_clima_rr.hh._y_jefaturas/
│   └── pulse_ios_design_system/
├── BORRADOR CORR - VANESSA MAQUERA.pdf  # Documento académico de referencia
├── recomendacion.txt              # Recomendación proporcionada con el proyecto
├── reunion-1.m4a                  # Material de referencia; no usado por la app
├── index.html                    # Documento HTML, título y favicon
├── package.json                  # Dependencias y comandos
├── package-lock.json             # Versiones resueltas de dependencias
├── .gitignore                    # Exclusiones de archivos generados
└── README.md
```

`node_modules/` se genera al instalar dependencias y `dist/` al compilar. `.review-tools/` es una carpeta auxiliar de la revisión del PDF; no forma parte de la aplicación. Estas tres carpetas están excluidas por `.gitignore`. Los archivos de Stitch, el PDF, el audio y el texto son referencias: Vite no los importa a la aplicación.

## Organización del código

Por el alcance actual del prototipo, los componentes están reunidos en `src/main.jsx`:

| Componente | Responsabilidad |
| --- | --- |
| `App` | Sesión, navegación, respuestas, acciones y persistencia. |
| `Brand` / `ThemeToggle` | Identidad pulsEMI y selección de tema. |
| `Login` | Acceso con las cuentas de prueba. |
| `Welcome` | Presentación de las dimensiones y acceso al cuestionario. |
| `Quiz` | Respuestas, validación, borrador y envío. |
| `Feedback` | Resultados personales, orientación e impresión. |
| `Dashboard` | Estadísticas, filtros, CSV, unidades y acciones de mejora. |
| `Heading`, `Bars`, `Stat`, `Empty` | Elementos de presentación compartidos. |

La navegación se controla con estado React, sin enrutador ni rutas independientes. Recargar conserva la sesión, pero vuelve a la pantalla inicial del perfil.

`src/model.js` contiene las funciones puras `complete`, `scores`, `aggregate`, `visibleResponses` y `mean`; también define usuarios, unidades, dimensiones y la función `seed` para generar datos ficticios. Los iconos de interfaz provienen de `lucide-react`; los gráficos de barras se construyen con HTML y CSS.

## Flujo y cálculos

1. El funcionario responde cuatro preguntas por cada una de las cinco dimensiones.
2. El envío requiere los 20 valores enteros entre 1 y 5.
3. Cada dimensión se calcula como la media de sus cuatro respuestas.
4. El promedio individual es la media de las cinco dimensiones, con igual peso.
5. El panel calcula el promedio por dimensión de las respuestas incluidas en su ámbito o filtro; después promedia las cinco dimensiones para su indicador general.
6. La jefatura consulta únicamente su unidad. RR.HH. puede ver todas o seleccionar una en el panel general. La tabla comparativa conserva todas las unidades accesibles al perfil.
7. Se exige un mínimo de cinco respuestas para presentar los promedios del ámbito consultado o de cada fila de unidad.

La ficha prioriza las dos mayores valoraciones y las dos menores. Las recomendaciones dependen de la dimensión y están definidas en el modelo; no se utiliza inteligencia artificial ni un servicio externo para generarlas. El CSV exporta una fila consolidada del ámbito seleccionado, no respuestas individuales. La opción PDF abre el diálogo de impresión del navegador, donde se puede elegir «Guardar como PDF».

## Persistencia y reinicio

| Clave de `localStorage` | Contenido |
| --- | --- |
| `pulse-session` | Identificador del usuario de la sesión local. |
| `pulse-responses` | Respuestas ficticias y cuestionarios enviados. |
| `pulse-actions` | Acciones de mejora y sus estados. |
| `pulse-draft-<id>` | Borrador guardado manualmente por el usuario. |
| `pulse-theme` | Tema `light` o `dark`. |

Las claves conservan su nombre anterior para mantener los datos guardados tras el cambio de marca a **pulsEMI**. Cerrar sesión no elimina respuestas, borradores, acciones ni la preferencia de tema.

Las respuestas y acciones se actualizan entre pestañas del **mismo origen** mediante eventos de almacenamiento. No se sincronizan entre dispositivos ni navegadores. `localhost` y `127.0.0.1`, así como puertos distintos, tienen almacenamientos independientes. No hay resolución de conflictos para ediciones simultáneas.

La demo admite una respuesta por cuenta en la campaña fija actual; todavía no existe un administrador de campañas. Para repetir el recorrido desde cero, cierra las pestañas de la aplicación, elimina el almacenamiento de ese sitio desde las herramientas del navegador y vuelve a abrirlo. Esto elimina los cambios locales y restablece los datos ficticios.

## Identidad y temas

La simulación y la plataforma manual comparten el mismo diseño azul noche y amarillo: fondos con degradados, tarjetas translúcidas de esquinas redondeadas, controles, tablas y tipografía de lectura ampliada. El acceso, bienvenida, cuestionario, ficha personal, paneles de RR. HH./jefatura y acciones de mejora usan esta identidad. `src/design-tokens.css` define la paleta y materiales comunes; `src/platform-theme.css` aplica el diseño al espacio manual y enlaza los materiales de la simulación.

Los paneles de RR. HH. y jefatura y la ficha personal incluyen cinco tarjetas de colores con el promedio de cada dimensión sobre 5, barras y cifras animadas. Los indicadores generales y las celdas comparativas también usan colores coordinados. `src/DimensionMetrics.jsx` presenta los mismos cálculos del modelo; los filtros y nuevos envíos actualizan sus valores. En gestión se reservan los promedios con menos de cinco respuestas. Los tonos se comparten con la simulación y se adaptan al modo claro, oscuro e impresión; identifican dimensiones sin atribuir categorías clínicas o umbrales institucionales.

En el espacio manual, el tema claro/oscuro está en el menú lateral y en el acceso. El menú también puede contraerse a una columna de iconos. Ambas preferencias son compartidas con la simulación mediante `pulse-theme` y `pulse-sidebar-collapsed`. Los textos de preguntas y recomendaciones usan 18 px y el contenido secundario 16 px, con adaptación para móvil. La impresión de la ficha utiliza colores claros para mantener la lectura aunque la interfaz esté en modo oscuro.

La marca visible es **pulsEMI**. El paquete npm usa `pulsemi` en minúsculas. El logo recupera el símbolo de pulso de la primera interfaz: trazo amarillo sobre un recuadro azul con esquinas redondeadas.

- Azul del símbolo: `#00549F`.
- Amarillo del símbolo y acento de marca: `#FFDD00`.
- Paleta visual inspirada en las imágenes de la EMI aportadas para el proyecto; no se presenta como una especificación de marca oficial.
- El recurso vectorial `public/images/pulsemi-icon.svg` también funciona como favicon.
- El escudo institucional se mantiene como imagen de apoyo en el login y la bienvenida.

El botón inferior permite cambiar entre tema claro y oscuro. En la primera visita se usa la preferencia del sistema; las selecciones posteriores se guardan en el navegador. Los estilos contemplan teléfonos, tabletas y escritorio, con opciones del cuestionario dispuestas verticalmente en móviles. La impresión mantiene la presentación clara.

Imágenes institucionales proporcionadas por el usuario: [logotipo EMI](https://emi.edu.bo/images/inicio/main.png) y [escudo de referencia](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoybiDQWQle9FXMM63DQcu5zMHXTswD3MIUXjnhVyhJTN716oL0urHIdM&s=10). Se incluyen copias locales para evitar depender de esos enlaces durante el uso.

## Relación con el documento académico

El borrador de Vanessa Maquera identifica cinco dimensiones del clima laboral: **comunicación, motivación, liderazgo, relaciones interpersonales y condiciones de trabajo**. El cuestionario de la página 156 del PDF usa una escala Likert de 1–5, adoptada aquí en lugar de la escala 1–4 de las maquetas de Stitch.

Los 20 enunciados de la demo son **adaptaciones**, no una transcripción ni un instrumento validado. Se presentan promedios descriptivos sin inventar baremos institucionales, certificaciones o coeficientes de confiabilidad. Los tres bloques administrativos son ejemplos y no representan el catálogo completo del anexo.

La ficha interpreta percepciones del entorno. No permite deducir productividad, cumplimiento de tareas o desempeño individual a partir del clima. La autoevaluación de desempeño y la evaluación por superiores requerirían un instrumento separado y no están implementadas. El mínimo de cinco respuestas es una regla del prototipo, no una garantía de anonimato o validez estadística.

## Verificación

```sh
npm test
npm run build
```

Las dieciséis pruebas actuales verifican el inicio con participación cero, poblaciones configurables de hasta 500 personas, umbrales mínimos, separación de respuestas previas y nuevas, además de cuestionarios completos y valores válidos, promedios individuales y agregados, restricción de la jefatura a su unidad, filtrado de RR.HH., integridad de los envíos de la simulación, reinicio reproducible, escenas, acciones derivadas de los resultados, ámbitos del superior inmediato y actualización del ámbito correcto al elegir jefe de carrera. En navegador se comprobaron los controles, reproducción automática completa, menú contraíble, vista de tres paneles, tema oscuro y su persistencia, pantallas de 390 a 1920 píxeles y acceso a la plataforma manual. Se verificaron además borradores con recarga, cuestionario completo, ficha e invocación de impresión, filtros, contenido y formato CSV, persistencia y estados de acciones, restricciones de la jefatura y sincronización de respuestas entre pestañas. La suite de `npm test` se concentra en la lógica; las herramientas auxiliares de navegador quedan en la carpeta local ignorada `.review-tools/`.

Recorrido manual recomendado:

1. Entrar como personal, responder una sección y guardar el borrador.
2. Recargar, volver al cuestionario y comprobar las respuestas guardadas.
3. Completar y enviar; revisar la ficha y abrir la impresión.
4. Entrar como RR.HH. y comprobar el aumento de 33 a 34 respuestas, si es el primer envío de una demo nueva.
5. Filtrar por unidad, exportar CSV y registrar una acción de mejora.
6. Entrar como jefatura y comprobar que solo aparecen resultados y acciones de su unidad.
7. Alternar tema, recargar y comprobar la preferencia; revisar también el menú y cuestionario en móvil.

## Solución de problemas

| Situación | Qué revisar |
| --- | --- |
| `npm.ps1` bloqueado en Windows | Ejecutar los comandos mediante `npm.cmd`. |
| No abre la aplicación | Mantener `npm run dev` activo y usar la URL exacta de su terminal. |
| Aparecen datos diferentes | Comprobar navegador, host y puerto; cada origen tiene su almacenamiento. |
| El cuestionario ya está completado | Consultar la ficha o reiniciar los datos locales para otra prueba. |
| No se guarda el avance | Pulsar «Guardar borrador» y comprobar que el navegador permite almacenamiento local. |
| No descarga directamente un PDF | Usar «Guardar como PDF» en el diálogo de impresión del navegador. |
| No aparecen cambios visuales | Recargar la página; si se usa `preview`, volver a ejecutar `npm run build`. |

## Límites y evolución a uso institucional

El login y los permisos son simulados en el cliente. Las credenciales y los datos locales pueden inspeccionarse o modificarse desde el navegador. **Utilizar únicamente información ficticia.**

Una versión institucional requiere autenticación y autorización en servidor, almacenamiento seguro, validación del instrumento, catálogo real de unidades, gestión de campañas y políticas de confidencialidad. La sincronización en tiempo real entre dispositivos, los correos, las notificaciones y la evaluación formal del desempeño quedan fuera del alcance actual.
