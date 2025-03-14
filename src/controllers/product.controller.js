import { productService } from "../services/product.service.js";

class ProductController {
  /**
   * Obtiene todos los productos.
   */
  async getAll(req, res, next) {
    try {
      const products = await productService.getAll();

      if (!products || products.length === 0) {
        return res.status(404).json({ message: "No products found" });
      }

      return res.status(200).json({ products });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtiene un producto por su ID.
   */
  async getById(req, res, next) {
    try {
      const { id } = req.params;

      // Validación de ID
      if (!id || isNaN(id)) {
        return res.status(400).json({ error: "Invalid product ID" });
      }

      const product = await productService.getById(Number(id));

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      return res.status(200).json({ product });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Crea un nuevo producto.
   */
  async create(req, res, next) {
    try {
      console.log("🟢 Datos recibidos en req.body:", req.body);

      const requiredFields = ["title", "description", "price", "thumbnails", "code", "stock", "category", "color", "size"];

      // Validación de campos requeridos
      for (const field of requiredFields) {
        if (!req.body[field] || (field === "thumbnails" && req.body[field].length === 0)) {
          return res.status(400).json({ error: `Field '${field}' is required` });
        }
      }

      const product = await productService.create(req.body);

      console.log("✅ Producto creado con éxito:", product);

      return res.status(201).json({ product });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Actualiza un producto por su ID.
   */
  async update(req, res, next) {
    try {
      const { id } = req.params;

      // Validación de ID
      if (!id || isNaN(id)) {
        return res.status(400).json({ error: "Invalid product ID" });
      }

      const requiredFields = ["title", "description", "price", "thumbnails", "code", "stock", "category", "color", "size"];

      // Validación de datos de actualización
      for (const field of requiredFields) {
        if (!req.body[field] || (field === "thumbnails" && req.body[field].length === 0)) {
          return res.status(400).json({ error: `Field '${field}' is required` });
        }
      }

      const product = await productService.update(Number(id), req.body);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      return res.status(200).json({ product });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Elimina un producto por su ID.
   */
  async delete(req, res, next) {
    try {
      const { id } = req.params;

      // Validación de ID
      if (!id || isNaN(id)) {
        return res.status(400).json({ error: "Invalid product ID" });
      }

      const deleted = await productService.delete(Number(id));

      if (!deleted) {
        return res.status(404).json({ error: "Product not found" });
      }

      return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

// Exportamos la instancia del controlador para su uso en rutas
export const productController = new ProductController();
