# Países App

Aplicación web que consume la API pública de países para mostrar un listado con filtros y funcionalidades adicionales.

## Cómo ejecutar

1. Instala las dependencias:
   ```bash
   npm install
   ```

2. Ejecuta el servidor de desarrollo:
   ```bash
   cd paises-app
   npm run dev
   ```

3. Abre (http://localhost:3000) en tu navegador.

## Características

- **Listado de países**: Muestra nombre, bandera, región y población.
- **Búsqueda**: Por nombre (insensible a mayúsculas).
- **Filtros**: Por región y rango de población (mínimo y máximo).
- **Ordenamiento**: Por nombre o población (opcional implementado).
- **Modal de detalle**: Información completa del país seleccionado.
- **Favoritos**: Página dedicada para países favoritos con estado global.

## Tecnologías utilizadas

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- API de REST Countries (https://restcountries.com/v3.1/all)

## Opcional implementado

- Persistir filtros en la URL: Los filtros (búsqueda, región, rango de población y ordenamiento) se guardan en la URL del navegador. Esto permite compartir enlaces con estados filtrados específicos o recargar la página manteniendo los filtros aplicados.
