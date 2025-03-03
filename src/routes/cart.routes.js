import { Router } from "express";
import { CartController } from "../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter.get("/:cid", CartController.getCartById);
cartRouter.post("/", CartController.createCart);
cartRouter.post("/:cid/product/:pid", CartController.addProductToCart);
cartRouter.delete("/:cid/product/:pid", CartController.removeProductFromCart);
cartRouter.put("/:cid", CartController.updateCart);
cartRouter.put("/:cid/product/:pid", CartController.updateProductInCart);
cartRouter.delete("/:cid", CartController.clearCart);

export default cartRouter;
