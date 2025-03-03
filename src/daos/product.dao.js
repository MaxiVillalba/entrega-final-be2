import productModel from "../models/productModel.js";

class ProductDAO {
    async getAllProducts({ page = 1, limit = 10, sort }) {
        const options = { page: parseInt(page), limit: parseInt(limit) };
        if (sort) options.sort = { price: sort === "asc" ? 1 : -1 };

        const products = await productModel.paginate({}, options);
        return products;
    }

    async getProductByID(pid) {
        const product = await productModel.findById(pid);
        if (!product) throw new Error(`El producto ${pid} no existe!`);
        return product;
    }

    async createProduct(data) {
        const { title, description, code, price, stock, category, thumbnails } = data;
        if (!title || !description || !code || !price || !stock || !category) {
            throw new Error("Faltan datos obligatorios para crear el producto.");
        }
        return await productModel.create({ title, description, code, price, stock, category, thumbnails });
    }

    async updateProduct(pid, updateData) {
        const product = await productModel.findByIdAndUpdate(pid, updateData, { new: true });
        if (!product) throw new Error(`El producto ${pid} no existe!`);
        return product;
    }

    async deleteProduct(pid) {
        const result = await productModel.findByIdAndDelete(pid);
        if (!result) throw new Error(`El producto ${pid} no existe!`);
        return result;
    }
}

export default new ProductDAO();
