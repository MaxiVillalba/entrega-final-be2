import { productDAO } from "../daos/product.dao.js";

class ProductService {
  async getAll() {
    return productDAO.getAll();
  }

  async getById(id) {
    return productDAO.getById(id);
  }

  async create(product) {
    return productDAO.create(product);
  }

  async update(id, product) {
    return productDAO.update(id, product);
  }

  async delete(id) {
    try {
      return await productDAO.delete(id);
    } catch (error) {
      throw new Error("Error deleting product: " + error.message);
    }
  }
}

export const productService = new ProductService();
