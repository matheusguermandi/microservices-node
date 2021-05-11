import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import CartController from '../controllers/CartController';

const cartRouter = Router();
const cartController = new CartController();

cartRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  cartController.findCart,
);

cartRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      total_price: Joi.number().required(),
      total_quantity: Joi.number().required(),
      user_id: Joi.string().uuid().required(),
    },
  }),
  cartController.createCart,
);

cartRouter.post(
  '/product',
  celebrate({
    [Segments.BODY]: {
      price: Joi.number().required(),
      quantity: Joi.number().required(),
      product_id: Joi.string().required(),
      cart: Joi.string().uuid().required(),
    },
  }),
  cartController.addProduct,
);

cartRouter.delete(
  '/product/:cart/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
      cart: Joi.string().uuid().required(),
    },
  }),
  cartController.deleteProduct,
);

export default cartRouter;
