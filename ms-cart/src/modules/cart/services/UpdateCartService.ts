import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICartRepository from '@modules/cart/repositories/ICartRepository';
import { number } from '@hapi/joi';

@injectable()
class UpdateCartValuesService {
    constructor(
        @inject('CartRepository')
        private cartRepository: ICartRepository,
    ) { }

    public async execute(id: String): Promise<void> {
        const cart = await this.cartRepository.find(String(id));

        if (!cart) {
            throw new AppError('Cart not found', 404);
        }

        let newTotalPrice = 0.0;
        let newTotalQuantity = 0;

        cart.products.map((product) => {
            const newTotal = product.price * product.quantity;
            
            newTotalPrice = parseFloat(String(newTotalPrice)) + parseFloat(String(newTotal));
            newTotalQuantity = parseInt(String(newTotalQuantity)) + parseFloat(String(product.quantity));
        })

        cart.total_price = newTotalPrice;
        cart.total_quantity = newTotalQuantity;

        this.cartRepository.update(cart);

    }
}

export default UpdateCartValuesService;