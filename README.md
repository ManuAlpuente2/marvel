# 🦸‍♂️ Explorador de Personajes Marvel

![Logo de Marvel](https://manualpuente2.github.io/marvel/public/manuel.png?raw=true)

Una aplicación hecha con React que permite explorar personajes de Marvel, ver sus detalles y guardar en favoritos. Desarrollada por [Manu Alpuente](https://www.linkedin.com/in/manu-alpuente/) entre el 24 de febrero y el 2 de marzo de 2025.

## 💻 Demo

- [Producción](https://manualpuente2.github.io/marvel/build/)
- [Desarrollo](https://manualpuente2.github.io/marvel/dev/)

## ✨ Características

- 🔍 Busca personajes de Marvel
- 📊 Detalle de cada personaje con cómics, series y eventos de cada uno
- ⭐ Guardado de personajes en favoritos
- 🔄 Sistema de caché para reducir consumo de datos
- 🌓 Configuraciones para desarrollo y producción

## 🏗️ Arquitectura del Proyecto

La aplicación está construida siguiendo una arquitectura modular y basada en componentes, con separación clara de responsabilidades.

## 🛠️ Parámetros de Configuración

La aplicación utiliza diferentes parámetros de configuración para entornos de desarrollo y producción:

| Parámetro            | Descripción                             | Desarrollo                              | Producción            |
| -------------------- | --------------------------------------- | --------------------------------------- | --------------------- |
| `privateKey`         | Clave privada de la API de Marvel       | Usada para autenticación de API         | Igual que desarrollo  |
| `publicKey`          | Clave pública de la API de Marvel       | Usada para autenticación de API         | Igual que desarrollo  |
| `apiUrl`             | URL base de la API de Marvel            | `https://gateway.marvel.com/v1/public/` | Igual que desarrollo  |
| `charactersLimit`    | Número máximo de personajes a obtener   | 50                                      | Igual que desarrollo  |
| `collectionsLimit`   | Número máximo de elementos de colección | 20                                      | Igual que desarrollo  |
| `searchDebounceTime` | Retraso antes de ejecutar búsqueda (ms) | 300                                     | Igual que desarrollo  |
| `cacheTime`          | Tiempo de almacenamiento en caché (ms)  | 30.000 (30 segundos)                    | 86.400.000 (24 horas) |
| `enableLogs`         | Habilitar registros en consola          | true                                    | false                 |

## 🚀 Cómo instalar

### Requisitos Previos

- Node.js (v14 o superior)
- npm o yarn

### Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/ManuAlpuente2/marvel
   cd marvel
   ```

2. Instalar:

   ```bash
   npm install
   ```

3. **Autenticación**: Antes de usar la aplicación, debes actualizar las claves de la API de Marvel en los archivos de configuración:
   - Abre `src/config/development.js` y `src/config/production.js`
   - Reemplaza los valores de `privateKey` y `publicKey` con tus propias claves de la API de Marvel
   - Puedes obtener tus claves de API registrándote en el [Portal de Desarrolladores de Marvel](https://developer.marvel.com/)

### Ejecutar la Aplicación Localmente

Para ejecutar la aplicación en modo desarrollo:

```bash
npm start
```

Esto iniciará la aplicación con la configuración de desarrollo. Visita [http://localhost:3000](http://localhost:3000) para verla en tu navegador.

## 🔄 Desarrollo vs Producción

### Modo Desarrollo

```bash
# Cambiar a configuración de desarrollo
npm run config:dev

# Iniciar la aplicación en modo desarrollo
npm start
```

Características del modo desarrollo:

- Tiempo de caché más corto (30 segundos)
- Registros de consola habilitados
- Recarga en caliente para desarrollo más rápido

### Modo Producción

```bash
# Cambiar a configuración de producción
npm run config:prod

# Construir la aplicación para producción
npm run build:prod
```

### Construir para Despliegue

Para construir la aplicación para despliegue en producción:

```bash
npm run build:prod
```

Los archivos generados se almacenarán en el directorio `build/`.

## 📦 Despliegue

Para desplegar en GitHub Pages:

```bash
npm run deploy
```

Esto construirá la aplicación con la configuración de producción y la desplegará en GitHub Pages.

## 🧰 Tecnologías y buenas prácticas

- **Autenticación de API**: Implementación segura de autenticación con hash MD5 según los requisitos de Marvel.
- **HTTPS**: Conversión automática de URLs HTTP a HTTPS para mayor seguridad.
- **Búsqueda optimizada**: Mediante debounce y gestión de race errors.
- **LocalStorage** para persistencia de datos y gestión de caché
- SASS para estilos
- React 19
- React Router 6
- Lodash para funciones de utilidad
- MD5 para autenticación de API
- GitHub Pages para despliegue
