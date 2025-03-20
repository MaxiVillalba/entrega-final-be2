// src/services/mail.service.js
import { createTransport } from "nodemailer";
import { CONFIG } from "../config/config.js";
import { EMAIL_TYPES } from "../common/constants/email.types.js";

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

  async getMessageTemplate({ type, email, ticket }) {
    let message = `
    <body style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; flex-direction: column; font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; margin: 0; padding: 0;">
    
    <h2>Hola, ${email}!</h2>
    `;

    switch (type) {
      case EMAIL_TYPES.WELCOME:
        message += `
          <h3 style="color: darkblue">
            ¡Bienvenido a EFBE2-STORE!
          </h3>
          <br>
          Gracias por registrarte en EFBE2.
        `;
        break;

      case EMAIL_TYPES.PURCHASE_CONFIRMATION:
        message += `
          <h3 style="color: darkgreen">
            Confirmación de Compra
          </h3>
          <br>
          ¡Tu compra ha sido realizada con éxito!
          <br>
          Tu número de operación es: <strong>${ticket}</strong>
        `;
        break;

      default:
        message += `
          <h3>Gracias por utilizar nuestros servicios</h3>
        `;
        break;
    }

    message += `
      <br>

      <img
        src="cid:logo"
        alt="Logo"
        style="margin-top: 30px; width: 100px; height: 100px; object-fit: cover; border-radius: 50%;"
      />
      </body>
    `;

    return message;
  }

  async sendMail({ to, subject, type, ticket }) {
    try {
      const html = await this.getMessageTemplate({ type, email: to, ticket });

      const info = await this.transporter.sendMail({
        from: CONFIG.MAIL.FROM,
        to,
        subject,
        html,
        attachments: [
          {
            filename: "logo.webp",
            path: "./public/logo.webp",
            cid: "logo",
          },
        ],
      });

      console.log("Message sent: ", info.messageId);
    } catch (error) {
      console.error("Error sending email: ", error);
    }
  }
}

export const mailService = new MailService();
