# pulsEMI

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
| `jefatura@emi.test` | Jefatura de unidad | Carlos Vargas |

Los botones del login rellenan las credenciales; después se debe pulsar **Iniciar sesión**. Los correos `.test` son ficticios: no se envían mensajes ni existe recuperación de contraseña.

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

Las cuatro pruebas actuales verifican cuestionarios completos y valores válidos, promedios individuales y agregados, restricción de la jefatura a su unidad y filtrado de RR.HH. No hay pruebas automatizadas de navegador.

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
