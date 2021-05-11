import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import ProductCartController from '../controllers/ProductCartController';

const productCartRouter = Router();
const productCartController = new ProductCartController();

productCartRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      price: Joi.number().required(),
      quantity: Joi.number().required(),
      product_id: Joi.string().required(),
      cart: Joi.string().uuid().required(),
    },
  }),
  productCartController.add,
);

productCartRouter.put(
  '/:cart/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
      cart: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      quantity: Joi.number().required(),
    },
  }),
  productCartController.update,
);

productCartRouter.delete(
  '/:cart/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
      cart: Joi.string().uuid().required(),
    },
  }),
  productCartController.delete,
);

export default productCartRouter;
