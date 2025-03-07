import { productService } from "../services/product.service.js";

class ProductController {
  async getAll(req, res) {
    try {
      const products = await productService.getAll();
      if (!products.length) {
        return res.status(404).json({ message: "No products found" });
      }
      res.status(200).json({ products });
    } catch (error) {
      res.status(500).json({ error: "Internal server error", details: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const product = await productService.getById({ id });

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json({ product });
    } catch (error) {
      res.status(500).json({ error: "Internal server error", details: error.message });
    }
  }

  async create(req, res) {
    try {
      const { title, description, price, thumbnails, code, stock, category, color, size } = req.body;
      
      if (!title || !description || !price || !thumbnails?.length || !code || !stock || !category || !color || !size) {
        return res.status(400).json({ error: "All fields, including at least one thumbnail, are required" });
      }

      const product = await productService.create({ title, description, price, thumbnails, code, stock, category, color, size });

      res.status(201).json({ product });
    } catch (error) {
      res.status(500).json({ error: "Internal server error", details: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, description, price, thumbnails, code, stock, category, color, size } = req.body;
      
      if (!title || !description || !price || !thumbnails?.length || !code || !stock || !category || !color || !size) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const product = await productService.update(id, { title, description, price, thumbnails, code, stock, category, color, size });

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json({ product });
    } catch (error) {
      res.status(500).json({ error: "Internal server error", details: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const product = await productService.delete(id);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error", details: error.message });
    }
  }
}

export const productController = new ProductController();
