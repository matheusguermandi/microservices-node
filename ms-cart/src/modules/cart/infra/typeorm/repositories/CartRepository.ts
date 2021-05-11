import { getRepository, Repository } from 'typeorm';

import ICartRepository from '@modules/cart/repositories/ICartRepository';
import ICartDTO from '@modules/cart/dtos/ICartDTO';

import Cart from '@modules/cart/infra/typeorm/entities/Cart';

class CartRepository implements ICartRepository {
  private ormRepository: Repository<Cart>;

  constructor() {
    this.ormRepository = getRepository(Cart);
  }

  public async list(): Promise<Cart[] | undefined> {
    const cart = await this.ormRepository.find();

    return cart || undefined;
  }

  public async find(id: string): Promise<Cart | undefined> {
    const cart = await this.ormRepository.findOne(id);

    return cart || undefined;
  }

  public async create(cartCreate: ICartDTO): Promise<Cart> {
    const cart = this.ormRepository.create(cartCreate);

    await this.ormRepository.save(cart);

    return cart;
  }

  public async update(cartUpdate: ICartDTO): Promise<Cart> {
    return this.ormRepository.save(cartUpdate);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

}

export default CartRepository;