import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListCartService from '@modules/cart/services/ListCartService';
import FindCartService from '@modules/cart/services/FindCartService';
import CreateCartService from '@modules/cart/services/CreateCartService';
import UpdateCartService from '@modules/cart/services/UpdateCartService';
import DeleteCartService from '@modules/cart/services/DeleteCartService';

export default class CartController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listCart = container.resolve(ListCartService);

    const cart = await listCart.execute();

    return response.json(cart);
  }

  public async find(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findCart = container.resolve(FindCartService);

    const cart = await findCart.execute(id);

    return response.json(cart);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { total_price, total_quantity, user_id, } = request.body;

    const createCart = container.resolve(CreateCartService);

    const cart = await createCart.execute({
      total_price, total_quantity, user_id,
    });

    return response.json(cart);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCart = container.resolve(DeleteCartService);

    await deleteCart.execute(id);

    return response.json({ msg: 'Record successfully deleted' });
  }
}