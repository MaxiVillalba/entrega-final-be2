import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = "products";

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnails: { type: [String], required: true}, 
  code: { type: String, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  color: { type: String, required: true },
  size: { type: String, required: true },
  status: {
    type: Boolean,
    default: true
  }
});

productSchema.plugin(mongoosePaginate);

export const Product = model(productsCollection, productSchema);
