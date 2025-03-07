import Joi from "joi";

export const orderDto = Joi.object({
  user: Joi.string().required(),
  cart: Joi.string().required(),
  status: Joi.string().valid("pending", "shipped", "delivered", "cancelled").default("pending"),
});
