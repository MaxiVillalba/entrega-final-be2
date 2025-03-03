import ProductDAO from "../dao/ProductDAO.js";
import ProductDTO from "../dto/ProductDTO.js";

class ProductManager {
    async getAllProducts(params) {
        const products = await ProductDAO.getAllProducts(params);
        return products.docs.map(p => new ProductDTO(p));
    }

    async getProductByID(pid) {
        const product = await ProductDAO.getProductByID(pid);
        return new ProductDTO(product);
    }

    async createProduct(data) {
        return await ProductDAO.createProduct(data);
    }

    async updateProduct(pid, updateData) {
        return await ProductDAO.updateProduct(pid, updateData);
    }

    async deleteProduct(pid) {
        return await ProductDAO.deleteProduct(pid);
    }
}

export default new ProductManager();
