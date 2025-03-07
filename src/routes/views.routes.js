import { Router } from "express";
import { ViewsController } from "../controllers/views.controller.js";

const viewsRouter = Router();

viewsRouter.get("/products", ViewsController.renderProductsPage);
viewsRouter.get("/realtimeproducts", ViewsController.renderRealTimeProducts);
viewsRouter.get("/cart/:cid", ViewsController.renderCartPage);

export default viewsRouter;
