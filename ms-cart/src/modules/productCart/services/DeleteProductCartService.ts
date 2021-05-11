import { container, inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductCartRepository from '@modules/productCart/repositories/IProductCartRepository';
import UpdateCartService from '@modules/cart/services/UpdateCartService';
import ICartRepository from '@modules/cart/repositories/ICartRepository';

interface IDeleteProductCart {
    id: string;
    cart: string;
}

@injectable()
class DeleteProductCartService {
    constructor(
        @inject('ProductCartRepository')
        private productCartRepository: IProductCartRepository,

        @inject('CartRepository')
        private cartRepository: ICartRepository,
    ) { }

    public async execute({ id, cart }: IDeleteProductCart): Promise<void> {
        const productCart = await this.productCartRepository.find(String(id));
        const checkCart = await this.cartRepository.find(String(cart));

        if (!productCart) {
            throw new AppError('Product Cart not found', 400);
        }

        if (!checkCart) {
            throw new AppError("Cart not found", 400)
        }

        await this.productCartRepository.delete(String(id));

        const updateCart = container.resolve(UpdateCartService);
        await updateCart.execute(String(cart));
    }
}

export default DeleteProductCartService;