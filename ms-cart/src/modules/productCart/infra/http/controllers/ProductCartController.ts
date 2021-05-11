import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AddProductCartService from '@modules/productCart/services/AddProductCartService';
import UpdateProductCartService from '@modules/productCart/services/UpdateProductCartService';
import DeleteProductCartService from '@modules/productCart/services/DeleteProductCartService';

export default class ProductCartController {

  public async add(request: Request, response: Response): Promise<Response> {
    const { price, quantity, product_id, cart } = request.body;

    const addProductCart = container.resolve(AddProductCartService);

    const productCart = await addProductCart.execute({
      price,
      quantity,
      product_id,
      cart
    });

    return response.json(productCart);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id, cart } = request.params;
    const { quantity } = request.body;

    const updateProductCart = container.resolve(UpdateProductCartService);

    const productCart = await updateProductCart.execute({
      id,
      quantity,
      cart
    });

    return response.json(productCart);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id, cart } = request.params;

    const deleteProductCart = container.resolve(DeleteProductCartService);

    await deleteProductCart.execute({
      id,
      cart
    });

    return response.json({ msg: 'Record successfully deleted' });
  }
}