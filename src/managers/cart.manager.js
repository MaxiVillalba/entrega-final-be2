import CartDAO from "../dao/CartDAO.js";
import CartDTO from "../dto/CartDTO.js";

class CartManager {
    async getAllCarts() {
        const carts = await CartDAO.getAllCarts();
        return carts.map(cart => new CartDTO(cart));
    }

    async getCartByID(cid) {
        const cart = await CartDAO.getCartByID(cid);
        return new CartDTO(cart);
    }

    async createCart() {
        return await CartDAO.createCart();
    }

    async addProductToCart(cid, pid) {
        return await CartDAO.addProductToCart(cid, pid);
    }

    async removeProductFromCart(cid, pid) {
        return await CartDAO.removeProductFromCart(cid, pid);
    }

    async updateCartProducts(cid, products) {
        return await CartDAO.updateCartProducts(cid, products);
    }

    async updateProductQuantity(cid, pid, quantity) {
        return await CartDAO.updateProductQuantity(cid, pid, quantity);
    }

    async clearCart(cid) {
        return await CartDAO.clearCart(cid);
    }
}

export default new CartManager();
