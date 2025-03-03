import morgan from "morgan";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import express from "express";
import passport from "passport";
import cors from "cors";
import dotenv from "dotenv";

// Rutas
import { authRouter } from "./routes/auth.routes.js";

// Configuración de Passport
import { initializePassport } from "./config/passport.config.js";

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Inicializar la aplicación de Express
const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de middleware

// Habilitar CORS (para permitir solicitudes desde otros dominios, útil en desarrollo)
app.use(cors());

// Habilitar el análisis de JSON y URL-encoded en el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Usar morgan para loguear solicitudes HTTP
app.use(morgan("dev"));

// Habilitar el uso de cookies
app.use(cookieParser());

// Inicializar Passport para autenticación
initializePassport();
app.use(passport.initialize());

// Conexión con MongoDB usando Mongoose
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/auth";

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((error) => {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);  // Terminar el proceso si no se puede conectar a la base de datos
});

// Rutas
app.use("/auth", authRouter);

// Middleware para manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ status: "error", message: "Internal Server Error" });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
