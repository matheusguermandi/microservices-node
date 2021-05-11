import ICartRepository from '@modules/cart/repositories/ICartRepository';
import ICartDTO from '@modules/cart/dtos/ICartDTO';

import Cart from '@modules/cart/infra/typeorm/entities/Cart';
import { uuid } from 'uuidv4';

class FakeCartRepository implements ICartRepository {
  private cart: Cart[] = [];

  public async list(): Promise<Cart[] | undefined> {
    return this.cart;
  }

  public async find(id: string): Promise<Cart | undefined> {
    const cart = this.cart.find(cart => cart.id === id);

    return cart;
  }

  public async create(cartData: ICartDTO): Promise<Cart> {
    const cart = new Cart();

    Object.assign(cart, { id: uuid() }, cartData);

    this.cart.push(cart);

    return cart;
  }

  public async update(cart: Cart): Promise<Cart> {
    const findIndex = this.cart.findIndex(findCart => findCart.id === cart.id);
    cart.total_price = 200;
    cart.total_quantity = 2;

    this.cart[findIndex] = cart;

    return cart;
  }

  public async delete(id: string): Promise<void> {
    this.cart.splice(Number(id), 1)
  }

}

export default FakeCartRepository;
