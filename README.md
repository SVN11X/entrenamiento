# Plan de Entrenamiento para Futbolito / Futsal

Repositorio web estático para publicar en GitHub Pages un plan progresivo de entrenamiento de 8 semanas.

## Cambios aplicados en esta versión

1. **Nueva disponibilidad semanal**
   - Cancha: lunes, jueves, viernes, sábado y domingo.
   - Oficina/descanso: martes y miércoles.
   - El plan se reorganizó en una semana real de lunes a domingo.

2. **Mejora visual y de experiencia usuario**
   - La página ya no muestra todo el contenido en una sola bajada larga.
   - Se agregó un selector de día por pestañas.
   - Se agregaron tarjetas de resumen, disponibilidad semanal y bloques desplegables por sesión.
   - El usuario puede abrir el día que necesita sin recorrer toda la página.

3. **Imágenes para ejercicios**
   - Se agregaron SVG locales en `assets/img/exercises/`.
   - No dependen de internet.
   - Funcionan bien en GitHub Pages y en modo PWA/offline básico.

## Estructura relevante

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
│           ├── calentamiento.svg
│           ├── conduccion-zigzag.svg
│           ├── pase-pared.svg
│           ├── remate.svg
│           ├── agilidad-lateral.svg
│           ├── fuerza-core.svg
│           ├── movilidad.svg
│           ├── pichanga.svg
│           ├── recuperacion.svg
│           └── oficina.svg
├── data/
│   └── plan.json
├── manifest.webmanifest
└── sw.js
```

## Publicar en GitHub Pages

1. Sube esta carpeta al repositorio.
2. En GitHub, entra a **Settings → Pages**.
3. En **Build and deployment**, selecciona la rama principal y la carpeta raíz.
4. Guarda los cambios.

## Nota

Si ya tenías GitHub Pages activo, basta con reemplazar los archivos por esta versión y esperar a que GitHub actualice la publicación.
