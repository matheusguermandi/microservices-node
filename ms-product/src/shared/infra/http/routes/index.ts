import { Router } from 'express';

import productRoute from '../../../../modules/product/infra/http/routes/product.routes';

const routes = Router();

routes.use('/product', productRoute);

export default routes;
