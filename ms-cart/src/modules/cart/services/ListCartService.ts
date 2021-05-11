import { inject, injectable } from 'tsyringe';

import Cart from '@modules/cart/infra/typeorm/entities/Cart';
import ICartRepository from '@modules/cart/repositories/ICartRepository';

@injectable()
class ListCartService {
    constructor(
        @inject('CartRepository')
        private cartRepository: ICartRepository,
    ) { }

    public async execute(): Promise<Cart[] | undefined> {
        const carts = await this.cartRepository.list();

        return carts;
    }
}

export default ListCartService;