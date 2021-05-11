import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Cart from '@modules/cart/infra/typeorm/entities/Cart';
import ICartRepository from '../repositories/ICartRepository';


@injectable()
class FindCartService {
  constructor(
    @inject('CartRepository')
    private cartRepository: ICartRepository,
  ) { }

  public async execute(id: string): Promise<Cart> {
    const cart = await this.cartRepository.find(id);

    if (!cart) {
      throw new AppError('Cart Not found', 404);
    }

    return cart;
  }
}

export default FindCartService;
