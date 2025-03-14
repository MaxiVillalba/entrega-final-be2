import { Product } from "../models/product.model.js";

class ProductDAO {
  async getAll() {
    return Product.find();
  }

  async getById(id) {
    return Product.findById(id);
  }

  async create(product) {
    return Product.create(product);
  }

  async update(id, product) {
    return Product.findByIdAndUpdate(id, product, { new: true });
  }

  async delete(id) {
    return Product.findByIdAndDelete(id);
  }
}

export const productDAO = new ProductDAO();
