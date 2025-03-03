import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";
import { uploader } from "../utils/multerUtil.js";

const productRouter = Router();

productRouter.get("/", ProductController.getAllProducts);
productRouter.get("/:pid", ProductController.getProductById);
productRouter.post("/", uploader.array("thumbnails", 3), ProductController.createProduct);
productRouter.put("/:pid", uploader.array("thumbnails", 3), ProductController.updateProduct);
productRouter.delete("/:pid", ProductController.deleteProduct);

export default productRouter;
