import { Router } from "express";

import { userRoutes } from "./user.routes.js";
import { productRoutes } from "./product.routes.js";
import { cartRoutes } from "./cart.routes.js";
import { orderRoutes } from "./order.routes.js";

export const router = Router();

router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/carts", cartRoutes);
router.use("/orders", orderRoutes);

export default router;
