import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const orderSchema = new Schema({
  ticketNumber: {
    type: String,
    default: () => uuidv4(),
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: "cart",
    required: true,
  },
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: "products", required: true },  // Referencia a productos
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
});

export const Order = model("order", orderSchema);
