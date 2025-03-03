import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { userModel } from "../dao/models/user.model.js";
import { JWT_SECRET } from "../utils/jwt.js";
import { verifyPassword, createHash } from "../utils/hash.js";

// Función para extraer el token desde las cookies
function cookieExtractor(req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies.token;  // Extraer token de las cookies
    }
    console.log("Token extraído en cookieExtractor:", token);
    return token;
}

// Estrategia de registro
export function initializePassport() {
    // Estrategia de registro con LocalStrategy
    passport.use("register", new LocalStrategy({
        usernameField: "email",
        passReqToCallback: true,  // Permitir que la request se pase a la función de callback
    },
    async (req, email, password, done) => {
        const { firstName, lastName, age } = req.body;  // Obtener otros datos de la solicitud

        // Validar que todos los campos estén presentes
        if (!email || !password || !firstName || !lastName || !age) {
            return done(null, false, { message: "All fields are required" });
        }

        try {
            // Verificar si el usuario ya existe
            const existingUser = await userModel.findOne({ email });
            if (existingUser) {
                return done(null, false, { message: "User already exists" });
            }

            const hashedPassword = await createHash(password);  // Encriptar la contraseña

            // Crear el nuevo usuario
            const user = await userModel.create({
                email,
                password: hashedPassword,
                first_name: firstName,
                last_name: lastName,
                age,
            });

            return done(null, user);  // Devolver el usuario creado
        } catch (error) {
            return done(error);
        }
    }));

    // Estrategia de login con LocalStrategy
    passport.use("login", new LocalStrategy({
        usernameField: "email",
    },
    async (email, password, done) => {
        try {
            // Buscar usuario por correo electrónico
            const user = await userModel.findOne({ email });

            if (!user) return done(null, false, { message: "User not found" });

            // Verificar la contraseña
            const isValidPassword = await verifyPassword(password, user.password);

            if (!isValidPassword) return done(null, false, { message: "Invalid password" });

            return done(null, user);  // Iniciar sesión si el password es correcto
        } catch (error) {
            return done(error);
        }
    }));

    // Estrategia JWT para autenticar solicitudes
    passport.use("jwt", new JWTStrategy({
        secretOrKey: JWT_SECRET,  // Utilizar el JWT_SECRET para validar el JWT
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),  // Extraer el token desde las cookies
    },
    async (payload, done) => {
        try {
            // Verificar que el JWT contiene información válida
            return done(null, payload);
        } catch (error) {
            return done(error);
        }
    }));

    // Serialización del usuario para almacenar la ID en la sesión
    passport.serializeUser((user, done) => {
        done(null, user._id);  // Almacenar el ID del usuario en la sesión
    });

    // Deserialización del usuario para recuperar la información completa
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userModel.findById(id);  // Buscar al usuario por su ID
            return done(null, user);  // Devolver el usuario completo
        } catch (error) {
            return done(error, null);  // Manejar error en caso de no encontrar al usuario
        }
    });
}
