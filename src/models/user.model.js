// src/models/user.model.js

import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true }, // Añadido el campo lastName
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin", "guest"],
      default: "user",
    },
    orders: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Order", // Asegúrate de que el modelo "Order" exista
        },
      ],
      default: [],
    },
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart", // Referencia a Cart
      default: null, // Si no hay carrito asignado
    },
  },
  { timestamps: true } // Añadimos soporte de timestamps para fechas
);

export const User = model("User", userSchema);
