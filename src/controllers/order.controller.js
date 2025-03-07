import { userService } from "../services/user.service.js";
import { orderService } from "../services/order.service.js";
import { cartService } from "../services/cart.service.js";

class OrderController {
  async getAll(req, res) {
    try {
      const orders = await orderService.getAll();
      res.status(200).json({ orders });
    } catch (error) {
      res.status(500).json({
        error: "Internal server error",
        details: error.message,
      });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const order = await orderService.getById({ id });

      if (!order) {
        return res.status(404).json({
          error: "Order not found",
        });
      }

      res.status(200).json({ order });
    } catch (error) {
      res.status(500).json({
        error: "Internal server error",
        details: error.message,
      });
    }
  }

  async create(req, res) {
    try {
      const { user: userId, cart: cartId } = req.body;

      // Validar si el usuario existe
      const user = await userService.getById({ id: userId });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Validar si el carrito existe
      const cart = await cartService.getById(cartId);
      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }

      // Obtener los productos del carrito y calcular el total
      const products = cart.products.map(p => ({
        product: p.product._id,
        quantity: p.quantity,
        price: p.product.price
      }));

      // Validar que los productos tienen precios válidos
      const total = products.reduce((acc, product) => acc + product.price * product.quantity, 0);

      const orderNumber = await orderService.getOrderNumber();

      const newOrder = await orderService.create({
        ticketNumber: orderNumber,
        user: userId,
        cart: cartId,
        products,
        total,
        status: req.body.status || "pending",  // Estado por defecto si no se proporciona
      });

      // Asociar la orden con el usuario
      user.orders.push(newOrder._id);
      await user.save();

      // Responder con la orden creada
      res.status(201).json({ order: newOrder });
    } catch (error) {
      res.status(500).json({
        error: "Internal server error",
        details: error.message,
      });
    }
  }

  async resolve(req, res) {
    try {
      const { id } = req.params;
      const { resolve } = req.body;

      const order = await orderService.getById({ id });

      if (!order) {
        return res.status(404).json({
          error: "Order not found",
        });
      }

      if (order.status !== "pending") {
        return res.status(400).json({
          error: "Order already resolved",
        });
      }

      if (resolve !== "cancelled" && resolve !== "completed") {
        return res.status(400).json({
          error: "Invalid resolve value",
        });
      }

      order.status = resolve;

      const updatedOrder = await orderService.update(id, order);

      res.status(200).json({ order: updatedOrder });
    } catch (error) {
      res.status(500).json({
        error: "Internal server error",
        details: error.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const order = await orderService.delete(id);

      if (!order) {
        return res.status(404).json({
          error: "Order not found",
        });
      }

      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      res.status(500).json({
        error: "Internal server error",
        details: error.message,
      });
    }
  }
}

export const orderController = new OrderController();
