import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

import ProductController from '../controller/ProductController';

const ProductRouter = Router();

const productController = new ProductController();

ProductRouter.get('/', productController.list);

ProductRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  productController.find,
);

ProductRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
    },
  }),
  productController.create,
);

ProductRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
    },
  }),
  productController.update,
);

ProductRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  productController.delete,
);

ProductRouter.delete('/', productController.deleteall);

export default ProductRouter;
