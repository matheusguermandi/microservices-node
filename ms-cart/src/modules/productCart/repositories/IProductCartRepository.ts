import ProductCart from '@modules/productCart/infra/typeorm/entities/ProductCart';
import IProductCartDTO from '@modules/productCart/dtos/IProductCartDTO';

export default interface IProductCartRepository {
  find(id: string): Promise<ProductCart | undefined>;
  create(data: IProductCartDTO): Promise<ProductCart>;
  update(data: IProductCartDTO): Promise<ProductCart>;
  delete(id: string): Promise<void>;
}
