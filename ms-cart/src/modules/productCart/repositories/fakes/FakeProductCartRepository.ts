import IProductCartRepository from '@modules/productCart/repositories/IProductCartRepository';
import IProductCartDTO from '@modules/productCart/dtos/IProductCartDTO';

import ProductCart from '@modules/productCart/infra/typeorm/entities/ProductCart';
import { uuid } from 'uuidv4';

class FakeProductCartRepository implements IProductCartRepository {
  private productCart: ProductCart[] = [];

  public async find(id: string): Promise<ProductCart | undefined> {
    const productCart = this.productCart.find(productCart => productCart.id === id);

    return productCart;
  }

  public async create(productCartData: IProductCartDTO): Promise<ProductCart> {
    const productCart = new ProductCart();

    Object.assign(productCart, { id: uuid() }, productCartData);

    this.productCart.push(productCart);

    return productCart;
  }

  public async update(productCart: ProductCart): Promise<ProductCart> {
    const findIndex = this.productCart.findIndex(findProductCart => findProductCart.id === productCart.id);

    this.productCart[findIndex] = productCart;

    return productCart;
  }

  public async delete(id: string): Promise<void> {
    this.productCart.splice(Number(id), 1)
  }

}

export default FakeProductCartRepository;
