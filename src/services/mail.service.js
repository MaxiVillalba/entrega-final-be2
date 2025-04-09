// src/services/mail.service.js
import { createTransport } from "nodemailer";
import { CONFIG } from "../config/config.js";
import { EMAIL_TYPES } from "../common/constants/email.types.js";
import logger from "../common/logger.handler.js";

class MailService {
  constructor() {
    this.transporter = createTransport({
      host: CONFIG.MAIL.HOST,
      port: CONFIG.MAIL.PORT,
      auth: {
        user: CONFIG.MAIL.USER,
        pass: CONFIG.MAIL.PASSWORD,
      },
    });
  }

  async getMessageTemplate({ type, email, name, ticket, registrationData }) {
    // Se inicia el HTML con estilos básicos para el mensaje
    let message = `
      <body style="width: 100%; margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 8px;">
          <h2 style="color: #333;">Hola, ${name}!</h2>
    `;
  
    // Dependiendo del tipo de email se personaliza el contenido del mensaje
    switch (type) {
      case EMAIL_TYPES.WELCOME:
        message += `
          <h3 style="color: darkblue;">${name}, EFBE2-STORE Te da la bienvenida!</h3>
          <p style="font-size: 16px; color: #555;">Gracias por utilizar nuestros servicios.</p>
        `;
        break;
      case EMAIL_TYPES.PURCHASE_CONFIRMATION:
        message += `
          <h3 style="color: darkgreen;">Confirmación de Compra</h3>
          <p style="font-size: 16px; color: #555;">
            ¡Tu compra ha sido realizada con éxito!<br>
            Tu número de operación es: <strong>${ticket}</strong>
          </p>
        `;
        break;
      default:
        message += `<h3 style="color: #333;">Gracias por utilizar nuestros servicios</h3>`;
        break;
    }
  
    // Si registrationData existe, se procesan los datos para mostrarlos en el correo
    if (registrationData) {
      // Definimos un array de claves a omitir (propiedades internas de Mongoose)
      const prohibitedKeys = ['$', '_doc', '$__', '$errors', '$isNew', '__v'];
      
      message += `
        <hr style="margin: 20px 0;">
        <h4 style="color: #333;">Tus datos de registro:</h4>
        <ul style="list-style: none; padding: 0; font-size: 14px; color: #555;">
      `;
      
      // Iteramos sobre las propiedades del registro, y mostramos solo aquellas que no coincidan con las claves prohibidas
      for (const key in registrationData) {
        if (registrationData.hasOwnProperty(key)) {
          // Se omiten propiedades internas
          if (prohibitedKeys.some(proh => key.includes(proh))) continue;
          
          // Convertir a string si el valor es objeto; si no, se muestra tal cual
          const value = typeof registrationData[key] === 'object'
                            ? JSON.stringify(registrationData[key])
                            : registrationData[key];
          message += `<li><strong>${key}:</strong> ${value}</li>`;
        }
      }
      
      message += `</ul>`;
    }
  
    // Se agrega la imagen del logo al final
    message += `
          <br>
          <div style="text-align: center;">
            <img src="cid:logo" alt="Logo" style="width: 100px; height: 100px; object-fit: cover; border-radius: 50%;">
          </div>
        </div>
      </body>
    `;
    return message;
  }
  

  async sendMail({ to, subject, type, ticket, name, registrationData }) {
    try {
      // Obtener el HTML personalizado
      const html = await this.getMessageTemplate({ type, email: to, name, ticket, registrationData });

      const info = await this.transporter.sendMail({
        from: CONFIG.MAIL.FROM,
        to,
        subject,
        html,
        attachments: [
          {
            filename: 'logo.png',
            // Asegurate de que la ruta sea correcta. Verifica que el archivo exista en la carpeta indicada:
            path: './public/logo.png',
            cid: 'logo',
          },
        ],
      });

      logger.info(`Email sent to ${to}: ${info.messageId}`);
    } catch (error) {
      logger.error(`Error sending email to ${to}: ${error.message}`);
      // Opcional: podrías no lanzar el error para que el flujo de registro no se interrumpa
    }
  }
}

export const mailService = new MailService();
