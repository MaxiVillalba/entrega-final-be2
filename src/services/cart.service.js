import { Cart } from "../models/cart.model.js";

class CartService {
  async getAll() {
    return Cart.find();
  }

  async getById(id) { // Eliminando el objeto de argumento innecesario
    return Cart.findById(id);
  }

  async create(cart) { // Eliminando el objeto de argumento innecesario
    return Cart.create(cart);
  }

  async update(id, cart) { // Eliminando el objeto de argumento innecesario
    return Cart.findByIdAndUpdate(id, cart, { new: true });
  }

  async delete(id) {
    return Cart.findByIdAndDelete(id);
  }
}

export const cartService = new CartService();
