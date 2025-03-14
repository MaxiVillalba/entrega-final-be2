import { Cart } from "../models/cart.model.js";

class CartDAO {
  async getAll() {
    return Cart.find();
  }

  async getById(id) {
    return Cart.findById(id);
  }

  async create(cart) {
    return Cart.create(cart);
  }

  async update(id, cart) {
    return Cart.findByIdAndUpdate(id, cart, { new: true });
  }

  async delete(id) {
    return Cart.findByIdAndDelete(id);
  }
}

export const cartDAO = new CartDAO();
