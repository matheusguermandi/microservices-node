import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICartRepository from '@modules/cart/repositories/ICartRepository';

@injectable()
class DeleteCartService {
    constructor(
        @inject('CartRepository')
        private cartRepository: ICartRepository,
    ) { }

    public async execute(id: string): Promise<void> {
        const cart = await this.cartRepository.find(id);

        if (!cart) {
            throw new AppError('This cart does not exist', 400);
        }

        await this.cartRepository.delete(id);
    }
}

export default DeleteCartService;