import { container } from 'tsyringe';

import ICartRepository from '@modules/cart/repositories/ICartRepository';
import CartRepository from '@modules/cart/infra/typeorm/repositories/CartRepository';

import IProductCartRepository from '@modules/productCart/repositories/IProductCartRepository';
import ProductCartRepository from '@modules/productCart/infra/typeorm/repositories/ProductCartRepository';

container.registerSingleton<ICartRepository>(
  'CartRepository',
  CartRepository,
);

container.registerSingleton<IProductCartRepository>(
  'ProductCartRepository',
  ProductCartRepository,
);

