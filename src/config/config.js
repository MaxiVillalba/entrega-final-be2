import { config } from "dotenv";

config();

export const CONFIG = {
  PORT: process.env.PORT || 5000,
  mongoDB: { // Cambié MONGO_URI a un objeto mongoDB
    url: process.env.MONGO_URI || "mongodb://localhost:27017/efbe2-store"
  },
  MAIL: {
    USER: process.env.NODEMAILER_USER,
    PASSWORD: process.env.NODEMAILER_PASSWORD,
    HOST: process.env.NODEMAILER_HOST,
    PORT: process.env.NODEMAILER_PORT,
    FROM: process.env.NODEMAILER_FROM,
  },
  SMS: {
    ACCOUNT_SID: process.env.TWILIO_SID,
    AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
  },
};
