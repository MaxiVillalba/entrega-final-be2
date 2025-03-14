import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 }, // Precio no negativo
    thumbnails: { type: [String], required: true },
    code: { type: String, required: true, unique: true }, // Código único para cada producto
    stock: { type: Number, required: true, min: 0 }, // Stock no negativo
    category: { type: String, required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    status: { type: Boolean, default: true }, // Producto activo por defecto
  },
  { timestamps: true }
);

// Añadir paginación
productSchema.plugin(mongoosePaginate);

export const Product = model("Product", productSchema);
