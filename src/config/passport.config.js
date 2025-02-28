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
        token = req.cookies.token;
    }
    console.log("Token extraído en cookieExtractor:", token);
    return token;
}

// Estrategia de registro
export function initializePassport() {
  passport.use("register", new LocalStrategy({
      usernameField: "email",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const { firstName, lastName, age } = req.body; // Eliminado password (ya se recibe como parámetro)

      if (!email || !password || !firstName || !lastName || !age) {
        return done(null, false, { message: "All fields are required" });
      }

      const hashedPassword = await createHash(password);

      try {
        const user = await userModel.create({
            email,
            password: hashedPassword,
            first_name: firstName,
            last_name: lastName,    
            age,
        });

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );

  // Estrategia de login
  passport.use("login", new LocalStrategy({
        usernameField: "email",
      },
      async (email, password, done) => {
        try {
            const user = await userModel.findOne({ email });

            if (!user) return done(null, false, { message: "User not found" });

            const isValidPassword = await verifyPassword(password, user.password);

            if (!isValidPassword) return done(null, false, { message: "Invalid password" });

            return done(null, user);
        } catch (error) {
            return done(error);
        }
      })
  );

  // Estrategia JWT
  passport.use(
    "jwt", new JWTStrategy({
        secretOrKey: JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    },
    async (payload, done) => {
        try {
            return done(null, payload);
        } catch (error) {
            return done(error);
        }
    })
  );

  // Serialización del usuario
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  // Deserialización del usuario
  passport.deserializeUser(async (id, done) => {
    try {
        const user = await userModel.findById(id);
        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
  });
}
