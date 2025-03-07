import { Router } from "express";

import { cartDto } from "../dtos/cart.dto.js";
import { validateDto } from "../middlewares/validate.dto.middleware.js";
import { cartController } from "../controllers/cart.controller.js";

export const cartRoutes = Router();

cartRoutes.get("/", cartController.getAll);
cartRoutes.get("/:id", cartController.getById);
cartRoutes.post("/", validateDto(cartDto), cartController.create);
cartRoutes.put("/:id", cartController.update);
cartRoutes.delete("/:id", cartController.delete);