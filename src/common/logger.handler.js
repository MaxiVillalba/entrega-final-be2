// src/common/logger.handler.js
import winston from 'winston';
import fs from 'fs';
import path from 'path';

// Definir la ruta a la carpeta 'logs'
const logDir = path.join(process.cwd(), 'logs');

// Si la carpeta no existe, se crea
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Configurar el logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) =>
      `${timestamp} [${level.toUpperCase()}]: ${message}`
    )
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    }),
  ],
});

// Función auxiliar (se puede seguir usando si se desea)
export const logError = (message) => {
  logger.error(message);
};

console.log("✅ logger.handler cargado correctamente");

// Exportamos el logger como default para evitar confusiones en la importación
export default logger;
