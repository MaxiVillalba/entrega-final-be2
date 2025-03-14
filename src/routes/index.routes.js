import { Router } from "express";

import { userRoutes } from "./user.routes.js";
import { productRoutes } from "./product.routes.js";
import { cartRoutes } from "./cart.routes.js";


export const router = Router();

router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/carts", cartRoutes);


export default router;
