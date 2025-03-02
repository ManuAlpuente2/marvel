const fs = require("fs");
const path = require("path");

// Obtener el tipo de configuración de los argumentos
const args = process.argv.slice(2);
const configType = args[0] || "development";

if (configType !== "development" && configType !== "production") {
  console.error(
    'Tipo de configuración no válido. Use "development" o "production".'
  );
  process.exit(1);
}

// Ruta del archivo de configuración
const configDir = path.resolve(__dirname, "../src/config");
const indexPath = path.join(configDir, "index.js");

// Contenido del archivo index.js según el entorno
const getIndexContent = (env) => {
  if (env === "production") {
    return `import developmentConfig from './development';
import productionConfig from './production';

// Usar configuración de producción
let config = productionConfig;

// Deshabilitar console.log en producción si los logs están deshabilitados
if (!config.enableLogs) {
  // Guardar la referencia original
  console.originalLog = console.log;
  console.log = function() {};
}

// Exportar funciones para cambiar la configuración (no se usan en producción)
export const useProductionConfig = () => {};
export const useDevelopmentConfig = () => {};

export default config;
`;
  } else {
    return `import developmentConfig from './development';
import productionConfig from './production';

// Usar configuración de desarrollo
let config = developmentConfig;

// Función para cambiar a la configuración de producción
export const useProductionConfig = () => {
  config = productionConfig;
  
  // Deshabilitar console.log en producción si los logs están deshabilitados
  if (!config.enableLogs) {
    console.originalLog = console.log;
    console.log = function() {};
  }
};

// Función para cambiar a la configuración de desarrollo
export const useDevelopmentConfig = () => {
  config = developmentConfig;
  
  // Restaurar console.log si fue sobrescrito
  if (typeof console.originalLog === 'function') {
    console.log = console.originalLog;
    delete console.originalLog;
  }
};

export default config;
`;
  }
};

// Escribir el archivo index.js con la configuración adecuada
fs.writeFileSync(indexPath, getIndexContent(configType));

console.log(`Configuración cambiada a: ${configType}`);
