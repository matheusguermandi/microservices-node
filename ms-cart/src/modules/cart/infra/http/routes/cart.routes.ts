import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import CartController from '../controllers/CartController';

const cartRouter = Router();
const cartController = new CartController();

cartRouter.get('/list/', cartController.list);

cartRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  cartController.find,
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
  cartController.create,
);

cartRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  cartController.delete,
);

export default cartRouter;