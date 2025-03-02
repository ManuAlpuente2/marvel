import developmentConfig from './development';
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
