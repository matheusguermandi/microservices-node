import { inject, injectable } from 'tsyringe';

import Cart from '@modules/cart/infra/typeorm/entities/Cart';
import ICartRepository from '@modules/cart/repositories/ICartRepository';

import ICartDTO from '@modules/cart/dtos/ICartDTO';
import AppError from '@shared/errors/AppError';

@injectable()
class CreateCartService {
  constructor(
    @inject('CartRepository')
    private cartRepository: ICartRepository,
  ) { }

  public async execute({
    total_price,
    total_quantity,
    user_id
  }: ICartDTO): Promise<Cart> {
    if (total_price < 0) {
      throw new AppError("Total price invalid", 400)
    }

    if (total_quantity < 0) {
      throw new AppError("Total quantity invalid", 400)
    }

    const cart = await this.cartRepository.create({
      total_price,
      total_quantity,
      user_id
    });

    return cart;
  }
}

export default CreateCartService;