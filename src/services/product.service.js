import ProductManager from "../managers/ProductManager.js";

class ProductService {
    async getAllProducts(params) {
        return await ProductManager.getAllProducts(params);
    }

    async getProductByID(pid) {
        return await ProductManager.getProductByID(pid);
    }

    async createProduct(data) {
        if (!data.title || !data.price || !data.stock) {
            throw new Error("Datos incompletos");
        }
        return await ProductManager.createProduct(data);
    }

    async updateProduct(pid, updateData) {
        return await ProductManager.updateProduct(pid, updateData);
    }

    async deleteProduct(pid) {
        return await ProductManager.deleteProduct(pid);
    }
}

export default new ProductService();
