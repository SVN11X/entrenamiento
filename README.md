# Plan de Entrenamiento de Futbolito

Sitio web estático listo para publicar en **GitHub Pages**. Presenta una plataforma simple, visual y responsive para organizar un plan de entrenamiento de futbolito de 8 semanas.

## Qué se mejoró

- Diseño deportivo moderno con paleta verde cancha, blanco, gris oscuro y acentos de color.
- Portada principal con objetivo, descripción y llamadas a la acción.
- Secciones ordenadas: resumen, objetivos, calendario, sesiones, trabajo físico/técnico/táctico, ejercicios, evaluación y recomendaciones.
- Sesiones de entrenamiento detalladas con:
  - nombre de la sesión;
  - objetivo principal;
  - duración estimada;
  - materiales;
  - calentamiento;
  - parte principal;
  - ejercicios específicos;
  - vuelta a la calma;
  - indicadores de logro;
  - observaciones del entrenador.
- Biblioteca de ejercicios con tarjetas visuales y detalles desplegables.
- Filtros por tipo de entrenamiento: físico, técnico, táctico, mixto y recuperación.
- Tablas responsivas para calendario, seguimiento y carga semanal.
- Menú sticky, botón volver arriba, selector de semana y detalles desplegables.
- Código separado en HTML, CSS y JavaScript sin dependencias externas.
- SVG locales para funcionar sin depender de imágenes externas.
- `manifest.webmanifest` y `sw.js` para PWA/offline básico.

## Estructura del proyecto

```text
entrenamiento-main/
├── index.html
├── assets/
│   ├── css/
│   │   ├── main.css
│   │   ├── components.css
│   │   └── print.css
│   ├── js/
│   │   └── app.js
│   └── img/
│       ├── favicon.svg
│       ├── og-cover.svg
│       └── exercises/
│           ├── agilidad-lateral.svg
│           ├── calentamiento.svg
│           ├── conduccion-zigzag.svg
│           ├── fuerza-core.svg
│           ├── movilidad.svg
│           ├── oficina.svg
│           ├── pase-pared.svg
│           ├── pichanga.svg
│           ├── recuperacion.svg
│           └── remate.svg
├── data/
│   └── plan.json
├── docs/
│   └── plan_entrenamiento_futbolito.md
├── manifest.webmanifest
└── sw.js
```


## Corrección aplicada: detalle máximo de ejercicios

Esta versión agrega fichas completas para cada sesión y ejercicio:

- Tiempo exacto por bloque.
- Series, repeticiones, pausas y progresiones por semana.
- Organización del espacio y cantidad de jugadores.
- Instrucciones paso a paso.
- Variantes según nivel, dolor, espacio y cantidad de jugadores.
- Errores comunes observables.
- Recomendaciones específicas del entrenador.
- `data/plan.json` actualizado con el detalle estructurado.
- `sw.js` actualizado para forzar nueva caché en GitHub Pages.

## Publicar en GitHub Pages

1. Copia el contenido de esta carpeta dentro del repositorio.
2. Haz commit y push:

```bash
git add .
git commit -m "mejora visual y contenido del plan de futbolito"
git push
```

3. En GitHub, entra a **Settings → Pages**.
4. En **Build and deployment**, selecciona la rama principal y la carpeta raíz.
5. Guarda los cambios.

## Nota sobre caché

El archivo `sw.js` usa caché local. Si actualizas el sitio y no ves cambios de inmediato, prueba abrirlo en ventana incógnita o borrar caché del navegador. En esta versión se actualizó `CACHE_NAME` para forzar la renovación de archivos.
