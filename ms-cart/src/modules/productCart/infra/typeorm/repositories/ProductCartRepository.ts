import { getRepository, Repository } from 'typeorm';

import IProductCartRepository from '@modules/productCart/repositories/IProductCartRepository';
import IProductCartDTO from '@modules/productCart/dtos/IProductCartDTO';

import ProductCart from '@modules/productCart/infra/typeorm/entities/ProductCart';

class ProductCartRepository implements IProductCartRepository {
  private ormRepository: Repository<ProductCart>;

  constructor() {
    this.ormRepository = getRepository(ProductCart);
  }

  public async find(id: string): Promise<ProductCart | undefined> {
    const productCart = await this.ormRepository.findOne(id);

    return productCart || undefined;
  }

  public async create(productCartCreate: IProductCartDTO): Promise<ProductCart> {
    const productCart = this.ormRepository.create(productCartCreate);

    await this.ormRepository.save(productCart);

    return productCart;
  }

  public async update(productCartUpdate: IProductCartDTO): Promise<ProductCart> {
    return this.ormRepository.save(productCartUpdate);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

}

export default ProductCartRepository;