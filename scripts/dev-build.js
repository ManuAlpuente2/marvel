const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Directorios de origen y destino
const buildDir = path.resolve(__dirname, "../build");
const devDir = path.resolve(__dirname, "../dev");

// Función para copiar archivos recursivamente
function copyRecursive(src, dest) {
  // Crear directorio de destino si no existe
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // Leer contenido del directorio
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      // Si es un directorio, copiar recursivamente
      copyRecursive(srcPath, destPath);
    } else {
      // Si es un archivo, copiarlo
      // Si es un archivo JS, asegurarse de que no esté minificado
      if (entry.name.endsWith(".js") && !entry.name.endsWith(".map")) {
        // Leer el contenido del archivo
        const content = fs.readFileSync(srcPath, "utf8");

        // Escribir el contenido en el destino
        fs.writeFileSync(destPath, content);

        // Generar un archivo no minificado usando prettier si está disponible
        try {
          execSync(`npx prettier --write "${destPath}" --parser babel`);
          console.log(`Formateado JS: ${destPath}`);
        } catch (error) {
          console.warn(`No se pudo formatear ${destPath}: ${error.message}`);
          // Si prettier falla, al menos tendremos el archivo copiado
        }
      }
      // Si es un archivo CSS, asegurarse de que no esté minificado
      else if (entry.name.endsWith(".css")) {
        // Leer el contenido del archivo
        const content = fs.readFileSync(srcPath, "utf8");

        // Escribir el contenido en el destino
        fs.writeFileSync(destPath, content);

        // Generar un archivo no minificado usando prettier si está disponible
        try {
          execSync(`npx prettier --write "${destPath}" --parser css`);
          console.log(`Formateado CSS: ${destPath}`);
        } catch (error) {
          console.warn(`No se pudo formatear ${destPath}: ${error.message}`);
          // Si prettier falla, al menos tendremos el archivo copiado
        }
      } else {
        // Copiar el archivo directamente
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

// Eliminar el directorio dev si existe
if (fs.existsSync(devDir)) {
  console.log("Eliminando directorio dev existente...");
  fs.rmSync(devDir, { recursive: true, force: true });
}

console.log("Copiando archivos de build a dev...");
copyRecursive(buildDir, devDir);

console.log('Compilación de desarrollo completada en la carpeta "dev"');
