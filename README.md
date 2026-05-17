# Plan de Entrenamiento para Futbolito / Futsal

Repositorio web para publicar en GitHub Pages un plan progresivo de entrenamiento de 8 semanas.

## Estructura del proyecto

```text
entrenamiento-main/
├── README.md
├── .gitignore
├── LICENSE
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
│       └── og-cover.png
├── data/
│   └── plan.json
├── docs/
│   ├── plan_entrenamiento_futbolito.md
│   └── presentaciones/
│       └── .gitkeep
├── manifest.webmanifest
└── sw.js
```

## Mejoras aplicadas

- Separación de responsabilidades: HTML semántico, CSS por capas y JavaScript en archivo externo.
- Navegación sticky con scroll suave y marcado activo por sección.
- Selector de semana con recordatorio de foco e intensidad.
- Manifest PWA y service worker para uso offline básico.
- Hoja de impresión para exportar o imprimir el plan con mejor legibilidad.
- `.gitignore` para excluir archivos temporales como `~$*`, `*.tmp` y `.DS_Store`.
- Carpeta `docs/presentaciones/` preparada para guardar los archivos `dia_*.pptx`.

## Nombres de días respetados

Se mantuvo la lógica solicitada para los días del plan, incluyendo:

- `dia1` — Lunes
- `dia2` — Martes
- `dia3` — Sábado
- `dia4` — Jueves
- `dia5` — Miércoles
- `dia6` — Domingo
- `dia7` — Viernes

## Publicar en GitHub Pages

1. Sube esta carpeta al repositorio.
2. En GitHub, abre **Settings → Pages**.
3. En **Build and deployment**, selecciona la rama principal y la carpeta raíz.
4. Guarda los cambios.

## Presentaciones

El archivo original solo contenía la referencia textual a los `.pptx`, no los binarios. Por eso la carpeta `docs/presentaciones/` queda creada con `.gitkeep`. Copia ahí tus presentaciones reales con nombres como:

```text
dia_lunes.pptx
dia_jueves.pptx
dia_sabado.pptx
dia_viernes.pptx
```
