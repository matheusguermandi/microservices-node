import { inject, injectable, container } from 'tsyringe';

import ProductCart from '@modules/productCart/infra/typeorm/entities/ProductCart';
import IProductCartRepository from '@modules/productCart/repositories/IProductCartRepository';

import IProductCartDTO from '@modules/productCart/dtos/IProductCartDTO';
import AppError from '@shared/errors/AppError';

import UpdateCartService from '@modules/cart/services/UpdateCartService';
import ICartRepository from '@modules/cart/repositories/ICartRepository';
import UpdateProductCartService from './UpdateProductCartService';

import fetch from 'node-fetch';

@injectable()
class AddProductCartService {
  constructor(
    @inject('ProductCartRepository')
    private productCartRepository: IProductCartRepository,

    @inject('CartRepository')
    private cartRepository: ICartRepository,
  ) { }

  public async execute({
    price, quantity, product_id, cart
  }: IProductCartDTO): Promise<ProductCart> {
    const checkCart = await this.cartRepository.find(String(cart));

    const checkProductID = await fetch(`http://localhost:3335/product/${product_id}`);
    const product = await checkProductID.json();

    if (!checkCart) {
      throw new AppError("Cart not found", 400)
    }

    if(!product._id){
      throw new AppError("Product not found", 400)
    }

    if (Number(price) < 0) {
      throw new AppError("Price invalid", 400)
    }

    if (quantity < 0) {
      throw new AppError("Quantity invalid", 400)
    }

    const checkProd = checkCart.products.find((p) => {
      return p.product_id == product_id && p.price == price
    })

    // Verifica se já existe algum produto com mesmo id e preço
    // caso verdadeiro, apenas atualiza a quantidade total do produto
    if (checkProd) {
      const updateProduct = container.resolve(UpdateProductCartService);
      const nemQuantity = checkProd.quantity + quantity;

      return await updateProduct.execute({
        id: checkProd.id,
        quantity: nemQuantity,
        cart: checkCart.id
      });
    }

    const productCart = await this.productCartRepository.create({
      price,
      quantity,
      product_id,
      cart
    });

    const updateCart = container.resolve(UpdateCartService);
    await updateCart.execute(String(cart));

    return productCart;
  }
}

export default AddProductCartService;
