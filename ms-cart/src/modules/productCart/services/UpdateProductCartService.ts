import { container, inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ProductCart from '@modules/productCart/infra/typeorm/entities/ProductCart';
import IProductCartRepository from '@modules/productCart/repositories/IProductCartRepository';
import UpdateCartService from '@modules/cart/services/UpdateCartService';
import ICartRepository from '@modules/cart/repositories/ICartRepository';

interface IUpdateProductCart {
  id: string;
  quantity: number;
  cart: string;
}

@injectable()
class UpdateProductCartService {
  constructor(
    @inject('ProductCartRepository')
    private productCartRepository: IProductCartRepository,

    @inject('CartRepository')
    private cartRepository: ICartRepository,
  ) { }

  public async execute({ id, quantity, cart }: IUpdateProductCart): Promise<ProductCart> {
    const productCart = await this.productCartRepository.find(String(id));
    const checkCart = await this.cartRepository.find(String(cart));

    if (!productCart) {
      throw new AppError('Product Cart not found', 404);
    }

    if (!checkCart) {
      throw new AppError("Cart not found", 400)
    }

    if (quantity < 0) {
      throw new AppError("Quantity invalid", 400)
    }

    productCart.quantity = quantity;

    const updatedProduct = await this.productCartRepository.update(productCart);

    const updateCart = container.resolve(UpdateCartService);
    await updateCart.execute(String(cart));

    return updatedProduct;
  }
}

export default UpdateProductCartService;
