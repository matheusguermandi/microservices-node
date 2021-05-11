import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import ensureAuthenticated from '@shared/infra/middlewares/ensureAuthenticated';
import cartRouter from '@modules/ms-cart/infra/http/routes/cart.routes';
import producRouter from '@modules/ms-product/infra/http/routes/product.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);

routes.use(ensureAuthenticated);

routes.use('/users', usersRouter);
routes.use('/carts', cartRouter);
routes.use('/products', producRouter);

export default routes;
