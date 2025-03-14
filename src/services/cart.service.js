import { cartDAO } from "../daos/cart.dao.js";

class CartService {
  async getAll() {
    return cartDAO.getAll();
  }

  async getById(id) {
    return cartDAO.getById(id);
  }

  async create(cart) {
    return cartDAO.create(cart);
  }

  async update(id, cart) {
    return cartDAO.update(id, cart);
  }

  async delete(id) {
    return cartDAO.delete(id);
  }
}

export const cartService = new CartService();
