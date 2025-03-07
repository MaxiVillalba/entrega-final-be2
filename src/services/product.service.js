import { Product } from "../models/product.model.js";

class ProductService {
    async getAll() {
        return Product.find(); 
    }

    async getById({ id }) {
        return Product.findById(id); 
    }

    async create(product) { 
        return Product.create(product); 
    }

    async update(id, product) { 
        return Product.findByIdAndUpdate(id, product, { new: true });
    }

    async delete(id) { 
        try {
            const product = await Product.findByIdAndDelete(id);
            return product;
        } catch (error) {
            throw new Error("Error deleting product: " + error.message);
        }
    }
}

export const productService = new ProductService();
