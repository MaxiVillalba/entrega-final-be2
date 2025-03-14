import { Schema, model } from 'mongoose';

const cartSchema = new Schema(
  {
    name: { type: String, required: false }, // No obligatorio, ya que no tiene mucha logíca que sea obligatorio el nombre.
    description: { type: String, required: true },

    products: {
      type: [
        {
          product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
          quantity: { type: Number, required: true, min: 1 },
          name: { type: String, required: true }, // Si quieres guardarlo por alguna razón
        },
      ],
      required: true,
      validate: [(value) => value.length > 0, 'A cart must have at least one product'], // Validación personalizada.
    },
  },
  { timestamps: true } // fechas de creación y actualización.
);

export const Cart = model('Cart', cartSchema);
