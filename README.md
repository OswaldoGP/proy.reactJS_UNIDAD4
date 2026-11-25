# Proyecto 003 (Vite + Preact + React Router)

Proyecto con login, registro y rutas protegidas usando Context + useReducer,
formularios con `react-hook-form`, alertas con SweetAlert2 y la API de Rick and Morty.

## Instalación

    npm install
    npm run dev

## Generar la versión final

    npm run build

Los archivos para subir quedan en la carpeta `dist`.

## Variables de entorno (.env)

    VITE_API_URL=https://rickandmortyapi.com/api/character

## Rutas
| Ruta | Vista | Tipo |
|------|-------|------|
| `/` | Inicio | Privada |
| `/login` | Iniciar sesión (redirige a `/`) | Pública |
| `/registro` | Registro (redirige a `/login`) | Pública |
| `/usuario/:nombre` | Perfil del usuario | Privada |
| `/personajes` | Listado Rick and Morty con buscador | Privada |
| `/personaje/:id` | Información de un personaje por ID | Privada |
| `*` | Error 404 con botón al inicio | — |

## Estructura
- `context/` → Contexto, Provider, MiReducer y type (manejo de la sesión)
- `routes/` → RutasPrivadas y RutasPublicas
- `pages/` → vistas del proyecto
- `components/` → Navbar y tarjeta de Personaje
- `utils/usuarios.js` → guarda los usuarios registrados en el localStorage
