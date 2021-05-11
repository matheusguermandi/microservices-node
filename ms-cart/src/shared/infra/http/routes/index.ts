import { Router } from 'express';

import cartRouter from '@modules/cart/infra/http/routes/cart.routes';
import productCartRouter from '@modules/productCart/infra/http/routes/productCart.routes';

const routes = Router();

routes.use('/cart', cartRouter);
routes.use('/product', productCartRouter);

export default routes;
