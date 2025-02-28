import { Schema, model } from 'mongoose';
import { createHash } from '../utils/hash.js';

const userSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    cart: { type: Schema.Types.ObjectId, ref: 'cart' },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user"],
      default: "user",
    },
  });

  // Middleware para encriptar contraseña antes de guardar
  userSchema.pre("save", async function(next){
    if  (!this.isModified("password")) return next(); 
    try {
      this.password = await createHash(this.password);
      next(); } catch (error) { next(error);}
    });



  // Middleware de Mongoose 
  userSchema.pre("save", async function(next){
    if (this.email.includes("@") && this.email.includes(".")) {
      return next();
    } return next (new Error("Email format is invalid"))
  });

  export const userModel = model("user", userSchema);

  