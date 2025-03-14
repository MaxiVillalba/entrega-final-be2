import { cartService } from "../services/cart.service.js";

class CartController {
  async getAll(req, res, next) {
    try {
      const carts = await cartService.getAll();
      return res.status(200).json({ carts });
    } catch (error) {
      next(error); // Delegar a middleware de manejo de errores
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      if (!id || isNaN(id)) {
        return res.status(400).json({ error: "Invalid cart ID" });
      }

      const cart = await cartService.getById(Number(id));

      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }

      return res.status(200).json({ cart });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: "Cart data is required" });
      }

      const cart = await cartService.create(req.body);
      return res.status(201).json({ cart });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      if (!id || isNaN(id)) {
        return res.status(400).json({ error: "Invalid cart ID" });
      }

      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: "Update data is required" });
      }

      const cart = await cartService.update(Number(id), req.body);

      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }

      return res.status(200).json({ cart });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      if (!id || isNaN(id)) {
        return res.status(400).json({ error: "Invalid cart ID" });
      }

      const deleted = await cartService.delete(Number(id));

      if (!deleted) {
        return res.status(404).json({ error: "Cart not found" });
      }

      return res.status(200).json({ message: "Cart deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export const cartController = new CartController();
