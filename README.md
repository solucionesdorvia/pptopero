# OPERO — Presentación

Presentación HTML full-screen de 10 slides para el proyecto **OPERO**, sistema de gestión de incidencias universitarias.

Materia: **Desarrollo de Aplicaciones I** · 2026.

Build limpio, sin frameworks: **HTML + CSS + JS vanilla**.

## Cómo correr

Abrí `index.html` directamente en el navegador, o serví la carpeta:

```bash
python3 -m http.server 5500
# luego visitá http://localhost:5500
```

> Recomendado **Chrome / Safari / Firefox** modernos. La presentación está pensada para verse en pantalla completa (`F11`).

## Controles

| Acción | Tecla |
| --- | --- |
| Avanzar | `→`  ·  `Space`  ·  `PageDown` |
| Retroceder | `←`  ·  `PageUp` |
| Pantalla completa | `F` (o el botón arriba a la derecha) |
| Volver al inicio | `Esc` |
| Ir al primero / último | `Home` / `End` |
| Touch | swipe horizontal |
| Click | dots inferiores · botones prev/next |

## Slides

1. **Portada** — logo, marca y equipo
2. **Introducción** — copy + stats + preview de pantallas
3. **Problemática** — 4 cards + barra de solución
4. **Organización / Scrum** — sprints, ceremonias, roles, herramientas
5. **Arquitectura MVC** — capas + ejemplo en código
6. **Modelo de datos / DER** — diagrama entidad-relación + entidades + relaciones
7. **Autenticación JWT** — flow + roles + SecurityConfig + 403
8. **Swagger / OpenAPI** — 4 paneles de endpoints + summary
9. **Manual de marca** — logo, swatches, tipografía
10. **Figma** — 8 phone mocks + features + flows por rol
11. **Cierre** — pregunta y links

## Stack

- Cormorant Garamond (display) · Inter (body) · DM Mono (mono/labels) — Google Fonts
- SVG noise vía `feTurbulence` para textura sutil
- Glows blur 90px posicionados según tono del slide
- Transiciones `cubic-bezier(0.22, 1, 0.36, 1)` a 0.55s

## Estructura

```
.
├── index.html      # Estructura de los 10 slides
├── styles.css      # Tokens, tipografía, componentes y animaciones
├── main.js         # Navegación (teclado, dots, touch)
└── README.md
```
