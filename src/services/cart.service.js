import CartManager from "../managers/CartManager.js";
import ProductService from "./ProductService.js";

class CartService {
    async getAllCarts() {
        return await CartManager.getAllCarts();
    }

    async getCartByID(cid) {
        return await CartManager.getCartByID(cid);
    }

    async createCart() {
        return await CartManager.createCart();
    }

    async addProductToCart(cid, pid) {
        await ProductService.getProductByID(pid); // Verificar que el producto exista
        return await CartManager.addProductToCart(cid, pid);
    }

    async removeProductFromCart(cid, pid) {
        return await CartManager.removeProductFromCart(cid, pid);
    }

    async updateCartProducts(cid, products) {
        return await CartManager.updateCartProducts(cid, products);
    }

    async updateProductQuantity(cid, pid, quantity) {
        return await CartManager.updateProductQuantity(cid, pid, quantity);
    }

    async clearCart(cid) {
        return await CartManager.clearCart(cid);
    }
}

export default new CartService();
