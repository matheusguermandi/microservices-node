import Cart from '@modules/cart/infra/typeorm/entities/Cart';
import ICartDTO from '@modules/cart/dtos/ICartDTO';

export default interface ICartRepository {
  list(): Promise<Cart[] | undefined>;
  find(id: string): Promise<Cart | undefined>;
  create(data: ICartDTO): Promise<Cart>;
  update(data: ICartDTO): Promise<Cart>;
  delete(id: string): Promise<void>;
}
